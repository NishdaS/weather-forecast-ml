# models/weather_data.py
import pandas as pd # Import pandas for data manipulation
from pydantic import BaseModel # Import BaseModel from Pydantic to define data models
import os # Import os to handle file paths
from datetime import date # Import date for date type handling

# Define the Weather model based on the CSV columns
class Weather(BaseModel):
    """
    This model represents the weather data for a specific location and date.
    """
    name: str # Name of the location
    date: str # Date of the weather data entry
    temperature_max: float # Maximum temperature for the day
    temperature_min: float # Minimum temperature for the day
    precipitation: float # Precipitation level for the day
    snow: float  # Added field for snow
    snow_depth: float  # Added field for snow depth

# WeatherData class to handle loading, searching, and accessing the weather data
class WeatherData:
    """
    This class loads weather data from a CSV file, provides methods to search data
    by location, and implements a Singleton pattern for managing a single instance.
    """
    instance = None # Class variable to hold the single instance of the class

    def __init__(self, path: str):
        """
        Initializes the WeatherData class by loading weather data from the specified CSV path.

        :param path: Path to the CSV file containing the weather data.
        """
        try:
            # Load the CSV file into a DataFrame
            data = pd.read_csv(path)

            # Standardize data columns for easier access and ensure the correct data types
            data["location"] = data["NAME"].astype(str)  # 'NAME' is the location name column
            data["date"] = data["DATE"].astype(str)      # Convert 'DATE' to string format
            data["temperature_max"] = data["TMAX"].astype(float)  # Convert max temp to float
            data["precipitation"] = data["PRCP"].astype(float)  # Convert precipitation to float
            data["snow"] = data["SNOW"].fillna(0).astype(float)  # Handle missing snow data
            data["snow_depth"] = data["SNWD"].fillna(0).astype(float)  # Handle missing snow depth 
            data["wind_speed"] = data["AWND"].astype(float)  # Convert wind speed to float
            data["cloudiness"] = data["ACMH"].astype(float)  # Convert cloudiness to float

            # Store data in a list of dictionaries
            self.data = data.to_dict(orient="records")
            print(data.head())

            # Set the instance variable to the current instance of WeatherData
            WeatherData.instance = self
        except FileNotFoundError:
            # Handle file not found error
            print("CSV file not found. Please check the file path.")
        except pd.errors.ParserError:
            # Handle parsing errors
            print("Error parsing CSV file. Please check the file format.")
        except Exception as e:
            # Handle other unexpected errors
            print(f"Unexpected error loading data: {e}")

    @classmethod
    def get_instance(cls, path: str = None):
        """
        Singleton method to get or create the WeatherData instance.
        
        :param path: Path to the CSV file (optional). If the instance already exists, it won't be recreated.
        :return: The singleton instance of WeatherData.
        """
        if cls.instance is None and path is not None:
            cls.instance = cls(path) # Create an instance if none exists
        return cls.instance

    def find_by_location(self, location_name: str):
        """
        Find weather data for a specific location by its name (NAME column).
        
        :param location_name: The name of the location (e.g., city or station).
        :return: A list of Weather instances for the given location, or an empty list if not found.
        """
        try:
            # Search for weather data entries that match the location name
            results = [Weather(**entry) for entry in self.data if entry["location"] == location_name]
            if not results:
                print(f"No data found for location: {location_name}")
            return results
        except Exception as e:
            print(f"Error searching for location '{location_name}': {e}")
            return []

# Initialize WeatherData instance with the path to weather.csv
csv_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data/weather.csv")
weather_data = WeatherData.get_instance(csv_file_path)

# Define another Pydantic model to represent a simplified version of weather data
class WeatherData2(BaseModel):
    """
    A simplified model for representing weather data, focusing on basic temperature information.
    """
    date: date # The date of the weather record
    temperature_max: float # Maximum temperature for the day
    temperature_min: float # Minimum temperature for the day