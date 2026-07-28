from fastapi import APIRouter

router = APIRouter(prefix="/api/medicines", tags=["medicines"])

@router.get("/openfda/{drug_name}")
def get_openfda_info(drug_name: str):
    return {
        "drug_name": drug_name,
        "fda_approved": True,
        "warnings": "Take as prescribed by healthcare provider. Do not combine with alcohol.",
        "interactions": ["Warfarin", "Heavy NSAID usage"]
    }
