# 📖 MediMitra AI — API Documentation Reference

Base Production URL: `https://dhanya-medimitra.vercel.app/api`

---

## 1. Multilingual Symptom Triage (`POST /api/chat`)

Analyzes vocalized or written symptoms in 10+ Indic languages using Gemini 2.0 Flash.

### Request Headers
`Content-Type: application/json`

### Request Body Example
```json
{
  "symptoms": "मुझे पिछले दो दिनों से तेज बुखार और सिरदर्द है",
  "language": "hi"
}
```

### Response Example (`200 OK`)
```json
{
  "condition": "मौसमी वायरल बुखार (Seasonal Influenza)",
  "confidence": 94,
  "riskLevel": "MODERATE",
  "summary": "आपके लक्षण मौसमी वायरल संक्रमण की ओर इशारा करते हैं।",
  "recommendedActions": [
    "प्रतिदिन कम से कम 2.5 - 3 लीटर गुनगुना पानी पिएं",
    "हर 4 घंटे में शरीर के तापमान की जांच करें"
  ],
  "homeRemedies": [
    "अदरक और हल्दी की चाय",
    "गुनगुने पानी से गरारे करें"
  ],
  "whenToSeeDoctor": "यदि बुखार 48 घंटे से अधिक रहे तो डॉक्टर से संपर्क करें।",
  "disclaimer": "मेडीमित्र AI प्रारंभिक प्राथमिक जांच सहायता प्रदान करता है।"
}
```

---

## 2. Multimodal Medicine Vision OCR (`POST /api/analyze-image`)

Extracts pharmaceutical data from camera images and queries openFDA.

### Request Body Example
```json
{
  "imageBase64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "mimeType": "image/jpeg"
}
```

### Response Example (`200 OK`)
```json
{
  "medicineName": "Paracetamol 500mg",
  "dosage": "1 tablet every 6 hours after meals",
  "activeIngredients": ["Acetaminophen / Paracetamol"],
  "uses": ["Relief of mild to moderate fever", "Pain management"],
  "sideEffects": ["Nausea in rare cases"],
  "warnings": "Do not exceed 4000mg daily.",
  "confidence": 95
}
```
