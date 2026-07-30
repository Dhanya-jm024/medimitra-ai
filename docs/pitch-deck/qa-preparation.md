# ❓ MediMitra AI — Top 20 Judges Q&A Defense Guide

### 1. "Isn't giving AI medical advice dangerous?"
- **Answer**: MediMitra AI is strictly a preliminary triage assistant, not a diagnostic authority. If symptoms indicate acute emergency signs (chest pain, stroke, severe bleeding), our classifier immediately triggers a 'CRITICAL' risk alert, bypasses home remedies, and locks the screen onto Emergency SOS with 1-tap 108 ambulance calling and nearest trauma center routing.

### 2. "How do you prevent AI hallucinations?"
- **Answer**: We constrain Google Gemini 2.0 Flash by enforcing a strict JSON schema contract (`extractJsonObject`) with structured keys for condition, confidence score, risk level, recommended actions, and when to see a doctor. If the API model response deviates or returns unstructured text, our fallback system validates the data structure before rendering.

### 3. "How does your app work offline in rural dead zones?"
- **Answer**: We use a Progressive Web App (PWA) Service Worker architecture. Static assets, Indic translation dictionaries, and core triage decision trees are cached locally on the device (`indexedDB` & Service Worker Cache). When connectivity drops, the app seamlessly falls back to offline rule-based triage without throwing network errors.

### 4. "How do you scale or monetize this?"
- **Answer**: We follow a B2G (Business-to-Government) model. State health departments (like Ayushman Bharat ABDM) can license MediMitra AI to equip Accredited Social Health Activists (ASHA workers) across rural Primary Health Centers (PHCs). Cost per user is less than ₹1 per 100 triage queries.

### 5. "How does your live GPS hospital tracking work without Google Maps API credits?"
- **Answer**: We use continuous high-precision HTML5 Geolocation (`navigator.geolocation.watchPosition`) combined with OpenStreetMap Overpass API (`https://overpass-api.de/api/interpreter`). When a user opens Emergency SOS, we query real-world hospital nodes within a 15 km bounding box of their exact coordinates and calculate distance in real-time using the spherical Haversine formula.
