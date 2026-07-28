from fastapi import APIRouter, HTTPException
from app.models.schemas import SymptomCheckRequest, SymptomCheckResponse
from app.services.gemini_service import analyze_symptoms_backend

router = APIRouter(prefix="/api/symptoms", tags=["symptoms"])

@router.post("/check", response_model=SymptomCheckResponse)
def check_symptoms(req: SymptomCheckRequest):
    try:
        res = analyze_symptoms_backend(req.symptoms, req.language or "en")
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
