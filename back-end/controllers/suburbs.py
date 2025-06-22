# Import necessary modules from FastAPI
from fastapi import APIRouter, HTTPException

# Import the suburb and SuburbData models
from models.SuburbData import suburb,SuburbData

# Create a new APIRouter instance to handle routing for suburb-related data
router = APIRouter()

# Define the / endpoint for retrieving a list of suburbs
@router.get("/", response_model=list[suburb])
async def getSuburbs():
    # Check if the SuburbData instance has been properly initialized
    if SuburbData.instance == None:
        # If the instance is not initialized, raise an HTTP 404 error with a custom message
        raise HTTPException(status_code=404, detail="suburbs instance does not exist")
    # Return the data from the SuburbData instance
    return SuburbData.instance.data

