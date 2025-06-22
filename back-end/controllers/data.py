from fastapi import APIRouter, HTTPException

# Import the function to load the data table
from utility.data import LoadDataTable

# Import os module for working with file paths
import os

# Create a new APIRouter instance to handle routing for the suburb data endpoint
router = APIRouter()

# Load the data table from the specified CSV file located in the 'data' directory
data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../data/data.csv")
data = LoadDataTable(data_path)

# Define the /suburb/{suburb} endpoint using GET method
@router.get("/suburb/{suburb}")
async def get_suburb(suburb: str):
     # Search the data for the specified suburb (case-insensitive)
    result = data[data["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")
    # If no data is found for the suburb, raise a 404 HTTPException with a custom error message
    if not result:
        # If no data is found for the suburb, raise a 404 HTTPException with a custom error message
        raise HTTPException(status_code=404, detail=f"Suburb '{suburb}' not found.")
    return result # Return the result as a list of records (dict format)
