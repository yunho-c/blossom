from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from pydantic import BaseModel
import uvicorn
from typing import List, Dict, Any

# local
from analysis import calculate_cross_similarity
from utils import sample_data

# Create FastAPI app instance
app = FastAPI(
    title="Blossom Backend",
    description="A REST API for text similarity analysis, etc.",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Response models
class ItemResponse(BaseModel):
    items: List[str]


class SimilarityRequest(BaseModel):
    items: List[str]

    class Config:
        schema_extra = {"example": {"items": sample_data("example")}}


class SimilarityResponse(BaseModel):
    items: List[str]
    similarity_matrix: List[List[float]]


@app.get("/sample_data", response_model=ItemResponse)
async def get_sample_data(name: str):
    """
    Returns a JSON structure containing:
    - A list of strings
    """
    items = sample_data(name)

    return {
        "items": items,
    }


@app.post("/similarity", response_model=SimilarityResponse)
async def get_similarity(request: SimilarityRequest):
    """
    Calculate cross-similarity between a list of text items.

    This endpoint uses a text embedding model to calculate cosine similarity
    between all pairs of text items in the provided list.

    Returns:
    - The original list of items
    - A 2D similarity matrix where each cell [i,j] represents the similarity
      between item i and item j (values range from 0 to 1, where 1 means identical)
    """
    # Calculate similarity matrix
    similarity_matrix = calculate_cross_similarity(request.items)

    # Convert numpy array to list for JSON serialization
    similarity_list = similarity_matrix.tolist()

    return {"items": request.items, "similarity_matrix": similarity_list}


# Additional endpoint to demonstrate API is working
@app.get("/health")
async def health_check():
    """
    Simple health check endpoint
    """
    return {"status": "healthy"}


# Run the server if this file is executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=7890, reload=True)
