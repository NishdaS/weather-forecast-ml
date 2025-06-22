from fastapi import FastAPI # Import FastAPI class to create the web application
from fastapi.middleware.cors import CORSMiddleware # Import CORS middleware to allow cross-origin requests
from controllers import suburbs, clustering, regression, data, weather # Import controllers for handling different routes
from models.weatherData import WeatherData # Import the WeatherData model to interact with weather data
from models import SuburbData # Import the SuburbData model to interact with suburb data
import os # Import os module to work with file paths and directories

# Initialize the FastAPI application
app = FastAPI()

# Configure CORS Middleware to allow cross-origin requests from any source
# This is useful for enabling interaction between the frontend (hosted on a different domain) and this backend API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Allows all origins (can be restricted to specific origins in production)
    allow_credentials=True,# Allows cookies and credentials to be included in requests
    allow_methods=["*"],   # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],   # Allows all headers to be sent in requests
)

# Load instances of data and models from their respective CSV files
# These instances will be used to process requests and make predictions or data retrievals
weather_data = WeatherData(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/weather.csv"))
suburb_data = SuburbData.SuburbData(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/suburbs.csv"))
regression_model = regression.regression(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/data.csv"))
cluster_model = clustering.Cluster(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/data.csv"))

# Include routers for different endpoints. These routers handle the functionality for each feature.
# By using the `include_router()` method, we modularize the code by grouping related endpoints into separate files.
app.include_router(weather.router, prefix="/weather", tags=["data", "weather"]) # Weather-related endpoints
app.include_router(suburbs.router, prefix="/suburbs", tags=["data", "suburbs"])  # Suburb-related endpoints
app.include_router(clustering.router, prefix="/clustering", tags=["model", "clustering"]) # Clustering model endpoints
app.include_router(regression.router, prefix="/regression", tags=["model", "regression"]) # Regression model endpoints
app.include_router(data.router, prefix="/data", tags=["data"]) # General data endpoints
app.include_router(weather.router, prefix="/api") # Weather-related API endpoints 

# Main entry point for running the FastAPI app
# When running the script directly, this block will start the Uvicorn server on the specified host and port
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
