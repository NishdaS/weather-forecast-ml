# Import necessary modules from FastAPI
from fastapi import APIRouter, HTTPException

# Import the models for regression input, output, and the regression instance
from models.regression import regressionPrediction, regressionInput, regression

# Create a new APIRouter instance to handle routing for the regression prediction endpoint
router = APIRouter()

# Define the /predict endpoint using POST method for regression predictions
@router.post("/predict", response_model=regressionPrediction)
async def predict(input: regressionInput):
    try:
        # Check if the regression model instance is initialized; if not, raise an HTTP 404 error
        if regression.instance is None:
            raise HTTPException(status_code=404, detail="Cluster instance does not exist")
        # Call the predict method on the regression instance to get the prediction
        return regression.instance.predict(input)
    except Exception as e: 
       # If any error occurs during the prediction process, raise an HTTP 500 error with the exception message
       raise HTTPException(status_code=500, detail=str(e))
