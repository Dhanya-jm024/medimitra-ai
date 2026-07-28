from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import symptoms, vision, medicines

app = FastAPI(
    title="MediMitra AI FastAPI Backend",
    description="Multilingual Medical AI Triage, Gemini Vision OCR, and RAG service.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(symptoms.router)
app.include_router(vision.router)
app.include_router(medicines.router)

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "service": "MediMitra AI Backend Engine",
        "version": "1.0.0",
        "hackathon": "CodeStorm 2026 #2"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
