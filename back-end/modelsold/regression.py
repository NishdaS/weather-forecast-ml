from model import model # Import the abstract 'model' class to inherit from it
import pandas as pd # Import pandas for data manipulation
import os # Import os to handle file paths
from sklearn.linear_model import LinearRegression # Import Linear Regression model from scikit-learn
from sklearn.preprocessing import StandardScaler

# Class for the regression model
class regression(model):
    # Initialization method to load the data and train the model
    def __init__(self, path):
        # Read the data from a CSV file at the specified path
        self.data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
        # Define the features (columns) that will be used
        features = ['Longitude', 'Latitude', 'Humidity', 'WindSpeed', 'Precipitation', 'Pressure']

        # Initialize StandardScaler to scale the features
        self.scaler = StandardScaler()
        # Apply scaling to the features: this standardizes them (mean=0, variance=1)
        scaled = self.scaler.fit_transform(self.data[features])

        # Create and train the Linear Regression model using the scaled features and the target variable (Temperature)
        self.model = LinearRegression()
        self.model.fit(scaled, self.data["Temperature"])

    # Method to predict the temperature based on input features
    def predict(self, input):
        # Scale the input data using the same scaler and make the prediction
        prediction = self.model.predict(self.scaler.transform(input))
        # Return the prediction (convert the result to a string)
        return str(prediction)

