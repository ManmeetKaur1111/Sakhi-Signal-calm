# SakhiSignal Calm Care

> **A Trauma-Informed Digital Healthcare & Safety Companion for Women**  
> *Translating sensitive symptoms into structured clinical clarity and empathetic communication.*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/AI-Google%20GenAI-orange.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-green.svg)](LICENSE)

---

## 🌸 Project Overview

In women's healthcare, conditions such as endometriosis, adenomyosis, polycystic ovary syndrome (PCOS), chronic pelvic pain, and postpartum distress are frequently minimized, dismissed, or misdiagnosed—often taking 7 to 10 years for a formal diagnosis. During hurried 7-minute clinical appointments, patients often experience high anxiety and cognitive overload, making it difficult to communicate their symptom history effectively. Simultaneously, explaining sensitive symptoms to partners or family members can feel daunting.

**SakhiSignal Calm Care** (derived from *Sakhi*, meaning trusted female companion in Sanskrit/Hindi) is an empathetic, confidential web application built to bridge the gap between patient experience and clinical care. It transforms raw, freeform patient narratives into structured medical **SBAR** (Situation, Background, Assessment, Recommendation) briefs for doctors, screens for urgent red flags, and crafts non-violent communication scripts for loved ones.

---

## ✨ Key Features

### 1. 🎙️ "Share My Story" Narrative Journaling
- Freeform voice dictation (Web Speech API) and guided text input without requiring medical jargon.
- 1–10 Discomfort & Distress Scale paired with intuitive descriptive adjectives.
- Visual body region mapping and multidimensional functional impact documentation (Sleep disruption, Occupational limitations, Emotional well-being, and Mobility).

### 2. 🧩 Adaptive Care Triage Questionnaire
- Step-by-step questionnaire that dynamically responds to symptom categories and menstrual cycle correlation (Luteal, Ovulation, or Non-cyclical).
- Clear clinical tags indicating visceral or neuropathic considerations.
- Trauma-informed pacing: Skip any question without penalty or guilt.

### 3. 🛡️ Confidential Safety & Red-Flag Screening
- Screens for acute surgical and physical emergencies (thunderclap unilateral pain, heavy bleeding, high fever with pelvic tenderness, syncope).
- Domestic safety and relational coercion check with safe exit protocols.
- Instant risk gauge (Low / Moderate / Urgent) with direct 1-tap call & SMS to 24/7 helplines:
  - **National Women’s Helpline**: 181 / 1091
  - **Emergency Services**: 112 / 911
  - **Suicide & Crisis Lifeline**: 988

### 4. 📋 Physician-Ready Clinical Doctor's Note (SBAR Protocol)
- Generates a clinical document ready to print or hand to a physician.
- Medicalized **History of Present Illness (HPI)** translating layperson descriptions into standard clinical nomenclature.
- List of screened red flags and potential differential considerations (Endometriosis, Adenomyosis, Pelvic Congestion Syndrome).
- High-yield, empowering questions formulated for the patient to ask their doctor.
- Powered by **Gemini 2.5 Flash** (`@google/genai`) for real-time AI medical synthesis with reliable clinical template fallbacks.
- One-click print stylesheet (`window.print()`), clipboard copy, and text file export.

### 5. 💬 "Explain to Someone I Trust" Script Generator
- Tailored conversational scripts for Partners, Mothers/Parents, Friends, Managers, and Counselors.
- Selectable tone: *Gentle & Vulnerable*, *Clear & Direct*, *Reassuring*, or *High Urgency*.
- Spoken in-person conversation opener, core talking points, and specific action requests (*"What I need from you"*).
- Boundaries checklist (*"What to avoid saying"*).
- 1-Click WhatsApp / SMS ready message template.

### 6. 🗺️ Prioritized 3-Step Action Roadmap & Appointment Scheduler
- Step 1: Immediate somatic relief and autonomic nervous system calming.
- Step 2: Clinic appointment booking and note preparation.
- Step 3: What to monitor and emergency warning thresholds.
- Interactive doctor appointment scheduler with browser persistence.

### 7. 👁️ Quick Privacy Camouflage Exit (Esc)
- One-tap or keyboard `Esc` button instantly replaces the screen with a benign, wholesome recipe and tea brewing page ("The Daily Hearth") to protect personal privacy if someone approaches.

### 8. 🧘 Somatic 4-7-8 Breathing Pacer
- Guided visual breathing pacer (4s Inhale, 7s Hold, 8s Exhale) designed to downregulate acute nervous system distress and relax hypertonic pelvic floor musculature.

---

## 🛠️ Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Lucide React Icons
- **Backend / API**: Express 4.x, Node.js, `tsx`
- **AI / LLM Engine**: `@google/genai` (Gemini Flash API)
- **Styling**: Tailwind CSS v4 with custom Google typography (`Plus Jakarta Sans` & `Fraunces`)
- **Build System**: Vite 6.x & esbuild CommonJS bundling

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sakhisignal-calm-care.git
   cd sakhisignal-calm-care
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_actual_gemini_api_key"
   APP_URL="http://localhost:3000"
   ```
   *(Note: The application operates with smart clinical fallback templates even if an API key is not supplied).*

4. Run locally in development mode:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## 🔒 Privacy & Trauma-Informed Principles

- **Client-Side First**: Patient narratives are saved in local browser storage; no medical history is sold or shared.
- **Zero Invalidation**: System never dismisses symptom severity as "just stress".
- **Instant Exit**: Press `Esc` anytime to switch to camouflage screen.

---

## ⚖️ Medical Disclaimer

SakhiSignal Calm Care is a patient advocacy, symptom articulation, and appointment preparation tool. It is **not** a diagnostic device and does not substitute for professional medical advice, physical examination, or emergency clinical care. In case of acute surgical red flags, severe hemorrhage, or immediate danger, contact emergency medical services (**112**, **911**, or **181**) immediately.
