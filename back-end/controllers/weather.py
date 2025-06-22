from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
import pandas as pd
from pathlib import Path
from typing import List
from datetime import datetime, timedelta
import random
from functools import lru_cache

# Create the APIRouter instance to define routes for weather-related endpoints
router = APIRouter()

# Data model for Weather using Pydantic
class Weather(BaseModel):
    name: str = Field(default="Unknown") # Name of the location (default is 'Unknown')
    date: str = Field(default="Unknown") # Date of the weather record
    precipitation: float = Field(default=0.0) # Precipitation amount
    max_temp: float = Field(default=0.0) # Maximum temperature of the day
    min_temp: float = Field(default=0.0) # Minimum temperature of the day
    snow: float = Field(default=0.0) # Snowfall amount
    snow_depth: float = Field(default=0.0) # Snow depth
    cloudiness: float = Field(default=0.0) # Cloudiness percentage
    wind_speed: float = Field(default=0.0) # Wind speed

# Caching weather data in memory to improve performance using LRU cache
@lru_cache(maxsize=1)
def load_weather_data():
    """
    Load weather data from a CSV file and cache the result in memory for efficiency.
    Returns a list of weather data as dictionaries.
    """
    csv_file_path = Path("data/weather.csv")
    try:
        # Read the CSV file using pandas
        df = pd.read_csv(csv_file_path)
        # Rename columns for easier mapping to the Weather model
        df = df.rename(columns={
            "NAME": "name", "DATE": "date", "PRCP": "precipitation",
            "TMAX": "max_temp", "TMIN": "min_temp", "SNOW": "snow",
            "SNWD": "snow_depth", "AWND": "wind_speed", "ACMH": "cloudiness"
        })
        # Fill missing values with 0 (to handle missing data)
        df.fillna(0, inplace=True)
        # Convert DataFrame to list of dictionaries (for easier handling in API responses)
        return df.to_dict(orient="records")
    except FileNotFoundError:
        # If the CSV file is not found, raise a 404 error
        raise HTTPException(status_code=404, detail="Weather data file 'weather.csv' not found. Please ensure the file exists at the expected location: 'data/weather.csv'.")
    except Exception as e:
        # Handle any other exceptions and raise a 500 error
        raise HTTPException(status_code=500, detail=f"Error reading CSV file: {e}")

# Fetching weather data from cache
async def fetch_weather_data(date: str = None):
    """
    Fetch weather data either for a specific date or all data if no date is provided.
    """
    weather_data = load_weather_data() # Load data from cache
    if date:
        # Filter records matching the given date
        return [record for record in weather_data if record['date'] == date]
    return weather_data # Return all weather data if no date is provided

# Endpoint for fetching weather history by date
@router.get("/weather/history/{date}", response_model=Weather)
async def get_weather_by_date(date: str):
    """
    Get weather data for a specific date. If no data is found, look for data
    within 30 days of the provided date.
    """
    historical_data = await fetch_weather_data(date)
    # Fetch weather data for the given date
    if historical_data:
        # If data for the exact date is found, return it
        return Weather(**historical_data[0])
    # If no data is found for the exact date, fetch all recent weather data
    recent_data = await fetch_weather_data()
    if not recent_data:
        # If no data exists, return a 404 error
        raise HTTPException(status_code=404, detail="Weather data not found")

    # Get data within 30 days of the target date
    target_date = datetime.strptime(date, '%Y-%m-%d')  # Convert the target date string to a datetime object
    # Filter records that are within 30 days of the target date
    within_30_days = [
        record for record in recent_data
        if (target_date - datetime.strptime(record['date'], '%Y-%m-%d')).days <= 30
    ]

    if not within_30_days:
        # If no data within 30 days, return a 404 error
        raise HTTPException(status_code=404, detail=f"No data within 30 days of {date}")

    # Calculate averages for max temp, min temp, and precipitation from the recent data
    avg_max_temp = sum(r['max_temp'] for r in within_30_days) / len(within_30_days)
    avg_min_temp = sum(r['min_temp'] for r in within_30_days) / len(within_30_days)
    avg_precipitation = sum(r['precipitation'] for r in within_30_days) / len(within_30_days)

    # Determine snow data based on historical records
    if any(record['snow'] > 0 for record in within_30_days):
        snow = random.uniform(1, 5) # Simulate snow (between 1 and 5 cm)
        snow_depth = random.uniform(0, 15) # Simulate snow depth (between 0 and 15 cm)
    else:
        snow = 0
        snow_depth = 0

    # Return synthesized weather data with added randomness
    return Weather(
        date=date,
        max_temp=avg_max_temp + random.uniform(-5, 5), # Random variation on temperature
        min_temp=avg_min_temp + random.uniform(-5, 5),
        precipitation=avg_precipitation + random.uniform(-1, 1),
        snow=snow,
        snow_depth=snow_depth,
        wind_speed=random.uniform(0, 15), # Random wind speed
        cloudiness=random.uniform(0, 100) # Random cloudiness percentage
    )

# Endpoint for fetching all weather data with optional limit
@router.get("/weather", response_model=List[Weather])
async def get_weather_data(limit: int = 100):
    """
    Get weather data for all records, limited by an optional 'limit' parameter.
    """
    # Fetch all weather data
    weather_data = await fetch_weather_data()
    if not weather_data:
        # If no data is found, return a 404 error
        raise HTTPException(status_code=404, detail="Weather data not found")

    # Return only the limited number of results
    return weather_data[:limit]