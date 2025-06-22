# Import necessary modules from FastAPI
from fastapi import APIRouter, HTTPException

# Import models for prediction input/output and clustering instance
from models.clustering import clusteringPrediction, clusteringInput, Cluster

# Create a new APIRouter instance to handle routing for the predict endpoint
router = APIRouter()

# Define the /predict endpoint using POST method
@router.post("/predict", response_model=clusteringPrediction)
async def predict(input: clusteringInput):
    try:
        if Cluster.instance is None:
             # Check if the Cluster instance is initialized; if not, raise an HTTP 404 error
            raise HTTPException(status_code=404, detail="Cluster instance does not exist")
        # Call the predict method on the Cluster instance to get the prediction
        return Cluster.instance.predict(input)
    except Exception as e:
        # If any error occurs during the prediction, return an HTTP 500 error with the exception message
        raise HTTPException(status_code=500, detail=str(e))
