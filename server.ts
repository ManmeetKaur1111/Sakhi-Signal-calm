import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SakhiSignal Calm Care API',
    hasGemini: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

// Clinical note and symptom analysis endpoint
app.post('/api/gemini/analyze-symptoms', async (req: Request, res: Response) => {
  try {
    const { storyDetails, chiefComplaint, severity, onset, impactOnLife, cycleRelation, questions } = req.body;

    const ai = getGeminiClient();
    if (ai) {
      try {
        const prompt = `You are an expert clinical medical consultant specializing in trauma-informed women's healthcare and patient advocacy.
Given this patient's self-reported experience, create a structured Clinical Doctor's Note using SBAR (Situation, Background, Assessment, Recommendation) framework.

Patient Data:
- Chief Complaint: ${chiefComplaint || 'Lower pelvic and abdominal pain'}
- Story: ${storyDetails || 'Unspecified symptoms'}
- Pain Severity: ${severity}/10
- Timeline: ${onset || 'Recent weeks'}
- Cycle Correlation: ${cycleRelation || 'Not specified'}
- Functional Impact on Daily Life: Sleep: ${impactOnLife?.sleep || 'impaired'}, Work: ${impactOnLife?.work || 'impaired'}

Format your response strictly as valid JSON with the following keys:
{
  "clinicalHPI": "Detailed formal medical History of Present Illness translating colloquial descriptions into accurate clinical terminology",
  "situation": "Concise 1-2 sentence clinical summary of current presentation",
  "background": "Relevant history, onset timeline, cyclical pattern, and prior treatments",
  "assessment": "Clinical observation of severity, functional impairment, and potential differential categories for exploration",
  "recommendation": "Objective workup suggestions, imaging, lab panels, and safety thresholds",
  "suggestedQuestions": ["Array of 4 empowering, high-yield questions for the patient to ask their physician"],
  "differentialConsiderations": ["Array of 3-4 medical etiologies for the doctor to evaluate"]
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, aiGenerated: true, data: parsed });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed or timed out, utilizing clinical template engine:', geminiError);
      }
    }

    // High-quality clinical fallback generator
    const fallbackResponse = {
      clinicalHPI: `Patient presents with ${severity >= 7 ? 'severe' : 'moderate to significant'} ${chiefComplaint || 'pelvic pain'}, active for ${onset || 'several weeks'}. Description is characterized as sharp cramping with visceral burning sensations radiating across the sacral and pelvic floor regions. Functional sleep architecture is disrupted (${impactOnLife?.sleep || 'waking frequently'}), with notable interference in daily occupational capacity. Menstrual tracking indicates ${cycleRelation || 'cyclical symptom exacerbation'}.`,
      situation: `A female patient reporting unmanaged ${severity}/10 pelvic distress with functional impairment across work, mobility, and nocturnal sleep.`,
      background: `Persistent symptoms over ${onset || 'several weeks'}, inadequate response to standard over-the-counter NSAIDs. Correlation with hormonal fluctuations noted.`,
      assessment: `Clinical presentation warrants formal diagnostic exploration for secondary dysmenorrhea, suspected endometriosis/adenomyosis, or pelvic floor hypertonicity with central sensitization.`,
      recommendation: `Targeted pelvic Doppler ultrasound / high-resolution pelvic MRI; comprehensive hormonal & inflammatory laboratory evaluation; multimodal pain pathway discussion.`,
      suggestedQuestions: [
        'Could these cyclical symptoms indicate endometriosis or pelvic congestion syndrome?',
        'What targeted imaging (e.g. specialized transvaginal pelvic ultrasound or pelvic MRI) would be most diagnostic?',
        'What non-opioid multimodal strategies can help manage the inflammatory and neuropathic pain components?',
        'What specific warning signs should indicate immediate emergency escalation?',
      ],
      differentialConsiderations: [
        'Endometriosis / Adenomyosis',
        'Pelvic Congestion Syndrome (PCS)',
        'Pelvic Floor Myofascial Pain Syndrome',
        'Interstitial Cystitis / Painful Bladder Syndrome',
      ],
    };

    return res.json({ success: true, aiGenerated: false, data: fallbackResponse });
  } catch (error: any) {
    console.error('Error analyzing symptoms:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Explain to Someone I Trust conversation script generator
app.post('/api/gemini/generate-script', async (req: Request, res: Response) => {
  try {
    const { recipient, tone, storySummary, keyNeeds } = req.body;

    const ai = getGeminiClient();
    if (ai) {
      try {
        const prompt = `You are a compassionate healthcare communication counselor helping a woman explain her sensitive medical symptoms to her ${recipient || 'loved one'}.
Tone requested: ${tone || 'gentle and open'}
Symptom context: ${storySummary || 'Chronic pelvic pain and exhaustion'}
Key needs: ${keyNeeds?.join(', ') || 'Emotional support, assistance with errands, listening without judgment'}

Respond with valid JSON:
{
  "conversationStarter": "A gentle, non-threatening sentence to open the conversation comfortably",
  "scriptBody": "A 2-3 paragraph spoken script in natural, warm, personal language",
  "actionRequests": ["Array of 3 practical, concrete ways this person can help"],
  "boundaries": ["Array of 2-3 things that are unhelpful or invalidating to avoid"],
  "textMessageVersion": "A short, loving 3-4 sentence message ready to copy and send via WhatsApp/SMS"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, aiGenerated: true, data: parsed });
        }
      } catch (geminiError) {
        console.warn('Gemini script generation fallback:', geminiError);
      }
    }

    // Rich empathetic fallback script
    const recipientName = recipient === 'partner' ? 'my partner' : recipient === 'parent' ? 'my family' : 'someone I care about';
    const fallbackScript = {
      conversationStarter: `Hey, when you have a quiet moment today, could we sit down together for 10 minutes? There is something about my health I really need to share with you.`,
      scriptBody: `I want to talk to you because you mean a lot to me, and carrying this quietly by myself has been really hard. For the past few weeks, I’ve been dealing with persistent physical pain and deep fatigue. It’s not just normal tiredness—it’s been affecting my sleep, my work, and my peace of mind.

I am preparing to see a healthcare professional so we can get proper answers. I don’t expect you to have medical solutions or fix everything, but having your patience, understanding, and knowing you believe what I am feeling makes all the difference in the world.`,
      actionRequests: [
        'Just listen and give me a hug without feeling like you have to immediately solve it.',
        'Help me remember to take breaks and rest when a flare-up starts.',
        'If you are free, accompany me to my clinic visit for moral support and an extra set of ears.',
      ],
      boundaries: [
        'Please avoid saying "maybe it’s just stress" or "everyone has cramps"—I am listening to my body.',
        'Please let me speak at my own pace without rushing to change the topic.',
      ],
      textMessageVersion: `Hey, I wanted to send you a quick note. I’ve been struggling with severe pain and fatigue lately that’s been tough to handle on my own. I’m scheduling a doctor’s check-up, and I’d really appreciate having your emotional support right now. Let's chat when you have a quiet moment. ❤️`,
    };

    return res.json({ success: true, aiGenerated: false, data: fallbackScript });
  } catch (error: any) {
    console.error('Error generating script:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Vite middleware in dev or static dist serving in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SakhiSignal Calm Care Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
