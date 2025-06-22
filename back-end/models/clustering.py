from utility.data import LoadDataTable # Import a custom function to load data
import pandas as pd # Import the pandas library for data manipulation
from pydantic import BaseModel # Import Pydantic BaseModel for data validation
from sklearn.cluster import KMeans # Import KMeans clustering from sklearn
from sklearn.preprocessing import StandardScaler  # Import StandardScaler for feature scaling
from fastapi import HTTPException  # Import HTTPException from FastAPI for error handling

# Define the model for the clustering prediction response
class clusteringPrediction(BaseModel):
    Prediction: str # The predicted cluster name (as a string)

# Define the input model for clustering prediction (data that will be passed into the model)
class clusteringInput(BaseModel):
    Longitude: float # The longitude value
    Latitude: float  # The latitude value
    Humidity: int # The humidity value
    WindSpeed: int # The wind speed value
    Precipitation: int # The precipitation value
    Pressure: int # The atmospheric pressure value

# Cluster class: Handles the clustering process using KMeans
class Cluster():

    # Ensures that only one instance of the Cluster class is created (Singleton pattern)
    instance = None

    def __init__(self, path):
        # Load the data from a given path using the LoadDataTable function
        self.data = LoadDataTable(path)
        # Define the features (columns) that will be used for clustering
        features = ['Longitude', 'Latitude', 'Humidity', 'WindSpeed', 'Precipitation', 'Pressure']

        # Initialize the StandardScaler to scale the feature values
        self.scaler = StandardScaler()
        # Scale the features
        scaled = self.scaler.fit_transform(self.data[features])

        # Create and train a KMeans clustering model with 10 clusters
        self.model = KMeans(n_clusters=10, random_state=42)

        # Fit the KMeans model and predict the clusters for the scaled data
        clusters = self.model.fit_predict(scaled)
        # Convert the cluster labels into a unique set of clusters
        clusters = list(set(clusters))

        # Get the count of data points in each cluster
        cluster_counts = pd.Series(clusters).value_counts()

        # Create a list of dictionaries for each cluster with its corresponding count
        self.clusters = [{'cluster': c, 'count': count} for c, count in zip(clusters,cluster_counts)]

        # sort the clusters by counts
        self.clusters = sorted(self.clusters, key=lambda x: x['count'])

        # Define the names for each cluster (from most general to most specific)
        names = [
            "Clear Sky",         # Most general cluster: Most common, clear weather
            "Mild Conditions",   # Abundant mild weather conditions (pleasant)
            "Moderate Weather",  # Common moderate weather (could be cloudy, light rain)
            "Unstable Conditions", # Uncommon unstable weather (possible thunderstorms)
            "Heavy Rain",        # Rare cluster representing heavy rain or storms
            "Severe Weather",    # Very rare weather (severe weather events like hurricanes)
            "Windy Conditions",  # Limited windy conditions (high wind speeds)
            "Frost",             # Scarce frost or very cold weather
            "Extreme Heat",      # Unique extreme heat conditions
            "1 in a Million Event" # Most specific cluster: Very rare, extraordinary weather events (e.g., extreme snowstorm, extreme heatwave)
        ]

        # Assign the corresponding names to each cluster
        for obj, value in zip(self.clusters, names):
            obj['name'] = value

        # Save the instance of this class (Singleton pattern)
        Cluster.instance = self

    # Method to predict the cluster for a given input
    def predict(self, input):
        # Predict the cluster label for the given input using the trained model
        prediction = self.model.predict(self.scaler.transform(pd.DataFrame([input.dict()])))
        
        # Search for the cluster in the self.clusters list based on the predicted label
        for cluster in self.clusters:
            # find the name for the give cluster
            if cluster.get('cluster') == prediction:
                # Return the name of the predicted cluster as a response
                return clusteringPrediction(Prediction = (cluster.get('name')))
            
        # If no cluster could be found for the prediction, raise an HTTPException
        raise HTTPException(status_code=500, detail="Could not find cluster for prediction")