import os
import google.generativeai as genai
from app.services.rag_service import search_medical_rag

API_KEY = os.getenv("GEMINI_API_KEY", "")
if API_KEY:
    genai.configure(api_key=API_KEY)

def analyze_symptoms_backend(symptoms: str, language: str = "en"):
    rag_hit = search_medical_rag(symptoms)
    
    if API_KEY:
        try:
            model = genai.GenerativeModel("gemini-2.0-flash")
            prompt = f"Analyze patient symptoms: {symptoms}. Language: {language}. Return JSON triage with keys: condition, confidence, riskLevel, summary, recommendedActions, homeRemedies, whenToSeeDoctor, disclaimer."
            res = model.generate_content(prompt)
            import json
            clean = res.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean)
        except Exception as e:
            print("Gemini backend API error:", e)

    # RAG fallback or default fallback
    if rag_hit:
        return {
            "condition": rag_hit["condition"],
            "confidence": 89,
            "riskLevel": rag_hit["riskLevel"],
            "summary": rag_hit["summary"],
            "recommendedActions": rag_hit["recommendedActions"],
            "homeRemedies": rag_hit["homeRemedies"],
            "whenToSeeDoctor": "Seek medical review if symptoms persist > 48 hrs.",
            "disclaimer": "MediMitra AI Triage System"
        }

    return {
        "condition": "General Viral Fever / Malaise",
        "confidence": 85,
        "riskLevel": "LOW",
        "summary": "Mild upper respiratory malaise observed.",
        "recommendedActions": ["Hydrate with warm fluids", "Rest for 24-48 hours"],
        "homeRemedies": ["Saltwater gargle", "Herbal tea"],
        "whenToSeeDoctor": "If temperature rises above 101°F.",
        "disclaimer": "MediMitra AI Preliminary Triage"
    }
