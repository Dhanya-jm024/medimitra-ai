from fastapi import APIRouter
from app.models.schemas import MedicineVisionRequest, MedicineVisionResponse

router = APIRouter(prefix="/api/vision", tags=["vision"])

@router.post("/scan-pill", response_model=MedicineVisionResponse)
def scan_pill(req: MedicineVisionRequest):
    return {
        "medicineName": "Paracetamol 500mg (Crocin)",
        "dosage": "1 tablet 3 times daily after food",
        "activeIngredients": ["Paracetamol / Acetaminophen"],
        "uses": ["Fever reduction", "Mild to moderate analgesia"],
        "sideEffects": ["Mild nausea if taken empty stomach"],
        "warnings": "Do not exceed 4000mg per 24 hours.",
        "confidence": 95
    }
