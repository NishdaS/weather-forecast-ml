from fastapi import FastAPI
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
import numpy as np

# Initialize the FastAPI application
app = FastAPI()

# Function to load and preprocess the weather data
def load_weather_data():
    # Load weather data from a CSV file
    weather = pd.read_csv('your_weather_data.csv')  

    # Select relevant columns for weather prediction
    core_weather = weather[['PRCP', 'SNOW', 'SNWD', 'TMAX', 'TMIN', 'ACMH', 'AWND']].copy()
    core_weather.columns = ['precipitation', 'snow', 'snow depth', 'max temp', 'min temp', 'cloudiness', 'wind_speed']

    # Data preprocessing - Drop columns that are not required for the prediction model
    core_weather.drop(columns=['snow', 'snow depth'], inplace=True)

    # Fill missing values using forward fill method for general data, and fill specific columns with 0
    core_weather.fillna(method='ffill', inplace=True)
    cols_to_fill_zero = ['cloudiness', 'wind_speed']
    core_weather[cols_to_fill_zero] = core_weather[cols_to_fill_zero].fillna(0)

    # Create the target column (next day's max temperature) by shifting the 'max temp' column
    core_weather['target'] = core_weather.shift(-1)['max temp']
    core_weather.dropna(inplace=True) # Drop rows with NaN values after shifting

    # Further processing... List of predictors (features) used for training the regression model
    predictors = ['precipitation', 'cloudiness', 'wind_speed', 'max temp', 'min temp']

    # Train Ridge Regression model
    reg = Ridge(alpha=0.1) # Ridge regression with a regularization parameter
    # Split the data into training and testing datasets (using dates)
    train = core_weather.loc[:'2020-12-31'] # Training data up to December 31, 2020
    test = core_weather.loc['2021-01-01':] # Testing data starting from January 1, 2021

    # Fit the regression model to the training data
    reg.fit(train[predictors], train['target'])
    # Predict the target (next day's max temp) on the test data
    predictions = reg.predict(test[predictors])
    # Calculate the error (mean absolute error)
    error = mean_absolute_error(test['target'], predictions)

    # Combine actual and predicted values into a DataFrame for comparison
    combined = pd.concat([test['target'], pd.Series(predictions, index=test.index)], axis=1)
    combined.columns = ['actual', 'predictions']

    return combined, error

# Define the weather endpoint to retrieve the weather data and predictions
@app.get("/weather")
def get_weather_data():
    # Call the load_weather_data function to get the prediction results and error
    combined, error = load_weather_data()
    # Convert the DataFrame to a list of records (JSON format)
    data = combined.to_dict(orient='records')
    # Return the data along with the error in the response
    return JSONResponse(content={"data": data, "error": error})

# Run the FastAPI application if this file is executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
