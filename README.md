# Syra AI: Autonomous Interview & Talent Platform

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

An end-to-end, high-performance platform designed to automate technical and behavioral interviews using advanced AI. Inspired by autonomous talent networks like Mercor, this system connects specialized professionals with recruiters through a seamless, real-time AI interviewing pipeline.

---

## 📖 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [The AI Pipeline (The "Harder Bits")](#-the-ai-pipeline-the-harder-bits)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

---

## 🚀 Overview

The platform consists of three primary user-facing interfaces, backed by a complex AI engine and a robust data ingestion layer:

1. **Talent Website:** A public-facing portal where candidates can explore specialized domain roles (e.g., AI, Biotech, Law) and view transparent, standardized compensation rates.
2. **Live Interviewing Platform:** A real-time environment where candidates upload resumes, get instantly parsed, and undergo a dynamic video interview with an interactive AI avatar.
3. **Recruiter Dashboard:** A secure, categorized hub for hiring managers to review recorded interviews and read AI-generated candidate evaluations and summaries.

---

## 🏗️ System Architecture

### Web Interfaces

* **Talent Portal:** Dynamic role discovery and application gateway.
- **Recruiter Portal:** Dashboard for evaluating candidate pipeline and interview metrics.
- **Interview Client:** WebRTC-enabled frontend handling bidirectional, low-latency audio/video streaming.

### 🛡️ Data & Ingestion (Proxy Layer)

To build comprehensive candidate profiles, the platform interfaces with external networks.
- **External Profile Fetching:** Enriches candidate data by intelligently scraping or requesting public profile data (e.g., LinkedIn, X.com).
- **Rate Limit Management:** To mitigate strict API limits and IP bans, all outbound enrichment requests are routed through a distributed **Proxy Layer** utilizing residential rotating proxies.

---

## 🧠 The AI Pipeline (The "Harder Bits")

The core engineering challenge of this project is maintaining a **sub-second latency loop** (~800-1000ms) to ensure the AI conversation feels as natural as human interaction.

1. **Resume Parsing:** NLP/Document Intelligence extracts core skills and experiences from PDFs/Word docs to dynamically prompt the LLM for tailored interview questioning.
2. **WebRTC Integration:** Facilitates ultra-low-latency peer-to-peer or server-relayed media connections.
3. **SST (Speech-to-Text):** Fast, streaming transcription of candidate audio into text.
4. **SLM (Small Language Model):** An optimized LLM (e.g., Llama-3-8B) deployed for rapid inference, contextual understanding, and response generation.
5. **TTS (Text-to-Speech):** Converts the SLM output back into high-fidelity, human-like audio.
6. **Real-Time Video Generation:** Syncs the TTS audio output with a visual avatar, mapping lip-syncing and micro-expressions dynamically.

---

## 🛠️ Tech Stack

**Frontend**
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB) React / Next.js
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white) Tailwind CSS
- WebRTC API

**Backend & Infrastructure**
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white) Node.js (Express) 
- ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=flat&logo=postgresql&logoColor=white) PostgreSQL & Vector DB (for embeddings)
- WebRTC SFU (LiveKit / Mediasoup)
- **Proxy Management:** Proxyman / ScrapingBee

**AI / ML Pipeline**
- **SST:** Deepgram / Whisper Streaming
- **SLM Serving:** vLLM / Ollama
- **TTS:** ElevenLabs / PlayHT

---

## 💻 Getting Started

### Prerequisites

* Node.js (v18+)
- PostgreSQL running locally or via Docker
- API Keys for AI services (SST, TTS, LLM)

### Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/biswarup-naha/Syra-AI.git](https://github.com/biswarup-naha/Syra-AI.git)
   cd ai-interview-platform
