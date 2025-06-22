import pandas as pd # Import pandas for data manipulation
import os # Import os to handle file paths

# Suburbs class
# This class is used to load suburb data and allows searching of
class Suburbs:
    # Class variable which will store an instance of the class
    instance = ""

    # Initialization function
    # This loads the data and sets the class instance variable
    def __init__(self, path):
        # Load the data from the CSV file located at the specified path
        data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
       
        # Remove duplicate rows from the data
        data.drop_duplicates()

        # Store the data in the instance
        self.data = data

        # Assign the class instance variable to the current instance
        Suburbs.instance = self

    # Search function
    # This takes in a search parameter and returns all suburbs matching the search term
    def search(self, search):
        # Create a mask to check if the search term exists in the 'Suburb' column (case-insensitive)
        mask =  self.data['Suburb'].str.lower().str.contains(search)
       
        # Add additional condition to check if the search term exists in the 'State' column (case-insensitive)
        mask |= self.data['State'].str.lower().str.contains(search)
        
        # Additional condition to check if the search term exists in the 'Postcode' column
        # Convert the Postcode to string and check for the presence of the search term
        mask |= self.data['Postcode'].astype(str).str.contains(search)
        
        # Return the rows of the data where the mask is True
        return self.data[mask]
    
    # Return the row corresponding to the given index (id)
    def get(self, id):
        # Convert the 'id' to an integer and retrieve the row at that index
        return self.data.iloc[int(id)]