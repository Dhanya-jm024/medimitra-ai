import json
import os

KNOWLEDGE_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "medical_knowledge.json")

def search_medical_rag(query: str):
    try:
        with open(KNOWLEDGE_FILE, "r") as f:
            data = json.load(f)
        query_lower = query.lower()
        for item in data:
            if item["keyword"] in query_lower:
                return item
    except Exception as e:
        print("RAG search error:", e)
    return None
