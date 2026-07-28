from pydantic import BaseModel
from typing import List, Optional

class SymptomCheckRequest(BaseModel):
    symptoms: str
    language: Optional[str] = "en"
    user_id: Optional[str] = None

class SymptomCheckResponse(BaseModel):
    condition: str
    confidence: int
    riskLevel: str
    summary: str
    recommendedActions: List[str]
    homeRemedies: List[str]
    whenToSeeDoctor: str
    disclaimer: str

class MedicineVisionRequest(BaseModel):
    image_base64: str

class MedicineVisionResponse(BaseModel):
    medicineName: str
    dosage: str
    activeIngredients: List[str]
    uses: List[str]
    sideEffects: List[str]
    warnings: str
    confidence: int
