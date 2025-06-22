from utility.data import LoadDataTable # Import the function to load data from a table
import pandas as pd # Import pandas for data manipulation
from pydantic import BaseModel # Import BaseModel from Pydantic to define data models
from sklearn.linear_model import LinearRegression # Import the Linear Regression model
from sklearn.preprocessing import StandardScaler  # Import StandardScaler for feature scaling

#regression model
class regressionPrediction(BaseModel):
    Prediction: float # The predicted value

class regressionInput(BaseModel):
    Longitude: float # The longitude value
    Latitude: float  # The latitude value
    Humidity: int # The humidity value
    WindSpeed: int # The wind speed value
    Precipitation: int # The precipitation value
    Pressure: int # The atmospheric pressure value

# Define the regression model class
class regression():
    instance = None # Class variable to store a single instance of the model

    def __init__(self, path):
        """
        Initialize the regression model by loading the data and training the model.
        
        :param path: Path to the dataset
        """
        # Load the data from the specified path
        self.data = LoadDataTable(path)
        # Define the feature columns that we will use for prediction
        features = ['Longitude', 'Latitude', 'Humidity', 'WindSpeed', 'Precipitation', 'Pressure']

        # Scale the features to normalize the data
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # Create a linear regression model and train it on the scaled features and the "Temperature" target
        self.model = LinearRegression()
        self.model.fit(scaled, self.data["Temperature"])
        # Save the instance of the model for later use
        regression.instance = self

    def predict(self, input):
        """
        Predict the temperature for the given input data using the trained model.
        
        :param input: The input data containing the weather-related features
        :return: The predicted temperature value
        """
        # Scale the input data based on the scaler used during model training
        prediction = self.model.predict(self.scaler.transform( pd.DataFrame([input.dict()])))
        # Return the predicted value in a regressionPrediction object
        return regressionPrediction(Prediction = float(prediction[0]))