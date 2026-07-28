# Technical Architecture — MediMitra AI

## Overview
MediMitra AI is an integrated multimodal, voice-first healthcare companion designed for high accessibility in rural and low-resource environments.

```
                    ┌─────────────────────────────────────────┐
                    │          Next.js 14 Web PWA             │
                    │ (Voice STT/TTS + i18n + Tailwind + PWA) │
                    └────────────────────┬────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
     ┌───────────▼───────────┐                       ┌───────────▼───────────┐
     │ Next.js Server Routes │                       │  FastAPI Python AI    │
     │  (API Chat, Vision)   │                       │    Microservice       │
     └───────────┬───────────┘                       └───────────┬───────────┘
                 │                                               │
     ┌───────────▼───────────┐                       ┌───────────▼───────────┐
     │ Google Gemini 2.0 AI  │                       │ Medical RAG Knowledge │
     │  (Text + Vision AI)   │                       │   Local JSON DB       │
     └───────────────────────┘                       └───────────────────────┘
```

## Core Subsystems
1. **Voice STT & Speech Synthesis**: Browser-native Web Speech API with fallback for Indian English, Hindi, Kannada, Tamil, and Telugu.
2. **Gemini 2.0 Multimodal Triage**: Direct structured JSON schema prompt engineering for accurate preliminary medical triage.
3. **Pill & Prescription OCR Vision**: Gemini Vision combined with openFDA database for drug interaction & warning lookup.
4. **GPS Emergency Dispatch**: HTML5 Geolocation API coupled with emergency phone & SMS triggers.
5. **Offline PWA Architecture**: Next-PWA service worker with local state caching for zero-connectivity environments.
