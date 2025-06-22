import pandas as pd # Import pandas for data manipulation
import os # Import os to handle file paths

# WeatherData class to handle loading and searching weather data
class WeatherData:
    # Class variable which will store an instance of the class
    instance = None

    # Initialization function
    # This loads the data and sets the class instance variable
    def __init__(self, path):
        # Load the CSV data from the specified path
        data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)

        # Standardize and clean data columns 
        # Rename and clean up columns
        data["location"] = data["NAME"].astype(str)
        data["date"] = data["DATE"].astype(str)
        data["temperature_max"] = pd.to_numeric(data["TMAX"], errors="coerce")
        data["temperature_min"] = pd.to_numeric(data["TMIN"], errors="coerce")
        data["precipitation"] = pd.to_numeric(data["PRCP"], errors="coerce")

        # Remove duplicates from the data
        data.drop_duplicates(inplace=True)

        # Store the cleaned data in the class instance
        self.data = data

        # Assign the current instance to the class variable, making it globally accessible
        WeatherData.instance = self

    # Search function
    # This takes a search parameter (location name) and returns matching records
    def search(self, search):
        # Create a mask to check if the search term exists in the 'location' column (case-insensitive)
        mask = self.data['location'].str.lower().str.contains(search.lower())
        # Return the rows of the data where the mask is True (i.e., the location matches the search term)
        return self.data[mask]

    # Get function
    # This retrieves a specific record by its index (ID)
    def get(self, id):
        try:
            # Try to return the row at the specified index
            return self.data.iloc[int(id)]
        except IndexError:
            return None  # If the ID is out of range (invalid), return None
           
