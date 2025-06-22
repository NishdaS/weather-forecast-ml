from model import model # Import the base model class from the model module
from sklearn.cluster import KMeans # Import KMeans clustering algorithm
from sklearn.preprocessing import StandardScaler  # Import StandardScaler for feature scaling
import pandas as pd # Import pandas for data manipulation
import os # Import os for handling file paths

# This is the class for the clustering model
class Cluster(model):
    def __init__(self, path):
        # Load the data from the CSV file
        self.data = pd.read_csv(os.path.dirname(os.path.abspath(__file__)) + "/" + path)
        # Define the features (columns) that will be used for clustering
        features = ['Longitude', 'Latitude', 'Humidity', 'WindSpeed', 'Precipitation', 'Pressure']

        # Scale the features using StandardScaler to standardize the data
        self.scaler = StandardScaler()
        scaled = self.scaler.fit_transform(self.data[features])

        # Create and train the KMeans model with 10 clusters and a fixed random state for reproducibility
        self.model = KMeans(n_clusters=10, random_state=42)
        # Perform clustering using the scaled data
        clusters = self.model.fit_predict(scaled)
        # Extract the unique cluster labels (cluster IDs)
        clusters = list(set(clusters))

        # Get the count of properties in each cluster (how many data points belong to each cluster)
        cluster_counts = pd.Series(clusters).value_counts()

        # Store clusters as a list of dictionaries, where each dictionary has the cluster ID and its count
        self.clusters = [{'cluster': c, 'count': count} for c, count in zip(clusters,cluster_counts)]

        # Define the names of the clusters based on the weather patterns they represent
        self.clusters = sorted(self.clusters, key=lambda x: x['count'])

        # Define the names of clusters
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
        
        # Assign the names to the clusters based on their order in the sorted list
        for obj, value in zip(self.clusters, names):
            obj['name'] = value

    # Method to predict the cluster for a given input
    def predict(self, input):
        # Scale the input data using the same scaler used for training the model
        prediction = self.model.predict(self.scaler.transform(input))
        for cluster in self.clusters:
            # Find the corresponding cluster name for the predicted cluster
            if cluster.get('cluster') == prediction:
                return (cluster.get('name'))
         