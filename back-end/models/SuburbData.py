from utility.data import LoadDataTable # Import the function to load data from a table
from pydantic import BaseModel  # Import BaseModel from Pydantic to define data models

# Define the model for each suburb
class suburb(BaseModel):
    Suburb: str         # Name of the suburb
    State: str          # State where the suburb is located
    Postcode: int       # Postal code of the suburb
    Longitude: float    # Longitude coordinate of the suburb
    Latitude: float     # Latitude coordinate of the suburb

# Suburbs class to handle suburb data
# This class allows the searching of suburb data from a given source

class SuburbData:
    # Class variable to store an instance of the class
    instance = None

    # Initialization function
    # This function loads the suburb data and sets the class instance variable
    def __init__(self, path):
        """
        Initialize the SuburbData class by loading suburb data from the given path.
        
        :param path: Path to the dataset containing suburb details
        """
        # Load the data
        data = LoadDataTable(path)

        # Set the appropriate data types for the columns
        data["Suburb"] =  data["Suburb"] .astype(str)       # Ensure Suburb is a string
        data["State"] = data["State"].astype(str)           # Ensure State is a string
        data["Postcode"] = data["Postcode"].astype(int)     # Ensure Postcode is an integer
        data["Longitude"] = data["Longitude"].astype(float) # Ensure Longitude is a float
        data["Latitude"] = data["Latitude"].astype(float)   # Ensure Latitude is a float

        # Convert the data to a list of dictionaries (records)
        self.data = data.to_dict(orient="records")
        # Set the instance variable to the current instance of the class
        SuburbData.instance = self