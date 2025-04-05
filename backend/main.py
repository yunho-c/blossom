from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Any
import uvicorn

# Create FastAPI app instance
app = FastAPI(
    title="Grid Data API",
    description="A simple REST API that returns a list of strings and a 2D grid data",
    version="1.0.0"
)

# Define response model
class GridResponse(BaseModel):
    string_list: List[str]
    grid_data: List[List[Any]]

@app.get("/", response_model=GridResponse)
async def get_data():
    """
    Returns a JSON structure containing:
    - A list of strings
    - A 2D grid of data
    """
    # Sample data
    string_list = ["apple", "banana", "cherry", "date", "elderberry"]

    # Sample 2D grid (5x5 matrix with numbers)
    grid_data = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25]
    ]

    return {
        "string_list": string_list,
        "grid_data": grid_data
    }

# Additional endpoint to demonstrate API is working
@app.get("/health")
async def health_check():
    """
    Simple health check endpoint
    """
    return {"status": "healthy"}

# Run the server if this file is executed directly
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
