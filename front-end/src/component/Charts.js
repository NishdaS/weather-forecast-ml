
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js"; // If uing plotly

export const Charts = ({ inputDate }) => {
    const [weatherData, setWeatherData] = useState([]); // State to store weather data (actual temperatures)
    const [forecastData, setForecastData] = useState([]); // State to store forecast data (actual vs predicted temps)
    const comparisonDate = "2024-10-02"; // Fixed comparison date for future use

    // Fetch weather data and forecast data when the component mounts or inputDate changes
    useEffect(() => {
        // Fetch weather data from the API
        const fetchWeatherData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/weather"); // API URL
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("Weather Data fetched successfully:", data); // Debugging log
                setWeatherData(data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        // Fetch forecast data and generate random data for prediction comparison
        const fetchForecastData = async () => {
            // Validate the inputDate format
            const validInputDate = new Date(inputDate);
            if (isNaN(validInputDate.getTime())) {
                console.error("Invalid selected date:", inputDate);
                return; // Exit early if inputDate is invalid
            }

            // Generate a random temperature between a specified range for forecast
            const getRandomTemp = () => {
                const minTemp = 50; // Minimum temperature
                const maxTemp = 70; // Maximum temperature
                return (Math.random() * (maxTemp - minTemp) + minTemp).toFixed(2); // Random temperature in the specified range
            };

            // Generate forecast data for the next 7 days based on inputDate
            const forecast = [];
            for (let i = 0; i < 7; i++) { // Generate 7 days of forecast
                const currentDate = new Date(validInputDate);
                currentDate.setDate(validInputDate.getDate() + i); // Increment the date
                forecast.push({
                    DATE: currentDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
                    actual: parseFloat(getRandomTemp()), // Generate a random actual temperature
                    predictions: parseFloat(getRandomTemp()), // Generate a random prediction temperature
                });
            }
            setForecastData(forecast);  // Store forecast data in the state
        };

        // Fetch both weather and forecast data when inputDate changes
        fetchWeatherData();
        fetchForecastData();
    }, [inputDate]); // Trigger data fetch when selectedDate changes

    // Prepare Plotly data with conditional styling based on inputDate
    const preparePlotlyData = (data, name, color, tempType) => ({
        x: data.map(d => d.DATE || d.date), // Use DATE from forecastData or date from weatherData
        y: data.map(d => d[tempType]), // Use the specific temperature type (e.g., min_temp, max_temp)
        type: "scatter",
        mode: "lines+markers", // Line chart with markers for data points
        name: name,
        name: name,
        marker: {
            color: color, // Color for the line/points
            size: data.map(d => d.DATE === inputDate ? 10 : 6), // Larger size for input date
            symbol: data.map(d => d.DATE === inputDate ? "star" : "circle"), // Star shape for input date
        },
        line: { color: color }, // Line color
    });

    // Prepare Plotly data for weatherData
    const minTempData = preparePlotlyData(weatherData, "Min Temp", "#61dafb", "min_temp");
    const maxTempData = preparePlotlyData(weatherData, "Max Temp", "#ff6347", "max_temp");

    // Prepare Plotly data for forecastData comparison charts
    const actualData = preparePlotlyData(forecastData, "Actual", "#ff4500", "actual");
    const predictionData = preparePlotlyData(forecastData, "Predictions", "#1e90ff", "predictions");

    return (
        <div className="fullwidth-block" style={{ backgroundColor: "#262936" }}>
            <div className="container">
                <h2 className="section-title">Weather Data</h2>
                <div className="row">
                    <div className="col-md-12">
                        <div className="news">
                            
                            {/* Display Maximum Temperature Chart */}
                            <h3>Maximum Temperature Trends</h3>
                            <Plot
                                data={[maxTempData]} // Display all max temperatures, highlighting input date
                                layout={{
                                    title: "Maximum Temperature Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Temperature (°C)" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />

                            {/* Display Minimum Temperature Chart */}
                            <h3>Minimum Temperature Trends</h3>
                            <Plot
                                data={[minTempData]} // Display all min temperatures, highlighting input date
                                layout={{
                                    title: "Minimum Temperature Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Temperature (°C)" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />

                            {/* Display Actual vs Prediction Chart */}
                            <h3>Actual vs Prediction Comparison</h3>
                            <Plot
                                data={[actualData, predictionData]} // Display actual vs predictions data
                                layout={{
                                    title: "Actual vs Predictions Over Time",
                                    xaxis: { title: "Date" },
                                    yaxis: { title: "Values" },
                                    paper_bgcolor: "#262936",
                                    plot_bgcolor: "#262936",
                                    font: { color: "white" },
                                }}
                                style={{ width: "100%", height: "300px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
