import { useEffect, useState } from "react";
import { Video } from "./Video";
import { Charts } from "./Charts";
import { About } from "./About";

export const Details = () => {
    // State variables
    const [weatherData, setWeatherData] = useState([]); // Holds the fetched weather data
    const [location, setLocation] = useState(""); // Stores the user's location input
    const [isDataAvailable, setIsDataAvailable] = useState(true); // Flag to check data availability
    
    // Fetch weather data whenever the location changes
    useEffect(() => {
        if (location) fetchWeatherData(location);
    }, [location]);

    // Fetch weather data from the API for the given location
    const fetchWeatherData = async (location) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/weather/weather/history/${location}`);
            const data = await response.json();
            setWeatherData(data ? [data] : []); // Wrap data in an array to maintain consistency
            setIsDataAvailable(!!data); // Data is available

        } catch (error) {
            console.error("Error fetching weather data:", error); // Log the error in the console
            setWeatherData([]); // Reset weather data on error
            setIsDataAvailable(false); // Indicate no data is available due to error
        }
    };

    // Handle input change for the location (date format)
    const handleInputChange = (e) => setLocation(e.target.value);

    // Handle form submission to fetch weather data based on input
    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData(location);
    };

    // Generate future days based on the current or provided start date
    const getFutureDays = (startDate, daysCount) => {
        const days = [];
        const start = new Date(startDate);
        const isValidStartDate = !isNaN(start.getTime());  // Ensure the start date is valid

        for (let i = 1; i <= daysCount; i++) {
            if (isValidStartDate) {
                start.setDate(start.getDate() + 1); // Increment the date by one
                days.push({
                    day: start.toLocaleDateString('en-US', { weekday: 'long' }),
                    date: start.toISOString().split('T')[0], // Format the date as "yyyy-mm-dd"
                });
            } else {
                days.push({ day: "NaN", date: "NaN" });
            }
        }
        return days;
    };

    // Determine the start date for generating future days
    const startDate = weatherData?.[0]?.date || new Date().toISOString().split('T')[0];
    const futureDays = getFutureDays(startDate, 7); // Get 7 future days

    // Extract maximum and minimum temperatures from the fetched weather dat
    const maxTemp = weatherData?.[0]?.max_temp || 0;
    const minTemp = weatherData?.[0]?.min_temp || 0;

    // Handle date input change with proper formatting (yyyy-mm-dd)
    const handleDateInputChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (input.length > 4) input = input.slice(0, 4) + '-' + input.slice(4); // Format as yyyy-mm
        if (input.length > 7) input = input.slice(0, 7) + '-' + input.slice(7); // Format as yyyy-mm-dd
        setLocation(input.slice(0, 10)); // Ensure input is limited to "yyyy-mm-dd"
    };

    return (
        <>
            <div className="hero" style={{ backgroundImage: 'url(images/coverN.jpg)', backgroundPosition: 'center' }}>
                <div className="container">
                    <form className="find-location" onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            placeholder="Input Date (YYYY-DD-MM) to Find Weather"
                            value={location}
                            onChange={handleDateInputChange}
                        />
                        <input type="submit" value="Find" />
                    </form>
                </div>
            </div>

            {/* Display weather data if available */}
            <div className="forecast-table">
                <div className="container">
                    <div className="forecast-container">
                        {isDataAvailable && weatherData.length > 0 ? (
                            weatherData.map((day, index) => (
                                <div key={index} className="today forecast">
                                    <div className="forecast-header">
                                        <div className="day">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</div>
                                        <div className="date">{day.date}</div>
                                    </div>
                                    <div className="forecast-content">
                                        <div className="location">{day.name}</div>
                                        <div className="degree">
                                            <div className="num">{day.max_temp}<sup>o</sup>C</div>
                                            <small style={{ color: 'gray' }}>{day.min_temp}<sup>o</sup>C</small>
                                            <div className="forecast-icon">
                                                <img src="images/icons/icon-1.svg" alt="" width="90" />
                                            </div>
                                        </div>
                                        <span><img src="images/snow.png" alt="" /> {day.snow}%</span>
                                        <span><img src="images/snow_depth.png" alt="" /> {day.snow_depth}%</span>
                                        <span><img src="images/icon-umberella.png" alt="" /> {day.precipitation}%</span>
                                        <span><img src="images/icon-wind.png" alt="" /> {day.wind_speed} km/h</span>
                                        <span><img src="images/cloud.png" alt="" /> {day.cloudiness}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Message to display if no data is available
                            <div>No weather data found for the given date.</div>
                        )}

                        {/* Render the forecast for future days */}
                        {futureDays.map((futureDay, index) => (
                            <FutureWeatherDay key={index} day={futureDay} iconIndex={index + 3} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Video section */}
            <Video />
            {/* Pass the location and temperature data to the Charts component */}

            <Charts inputDate={location} />
            <About />
        </>
    );
};

// Component to display future weather day
const FutureWeatherDay = ({ day, iconIndex }) => {
    // Generate random temperatures for future days (if not provided)
    const getRandomTemp = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const maxTemp = getRandomTemp(20, 30); // Random max temp between 20-30°C
    const minTemp = getRandomTemp(10, 19); // Random min temp between 10-19°C
    const dayName = day?.day || "NaN";

    return (
        <div className="forecast">
            <div className="forecast-header">
                <div className="day">{dayName}</div>
            </div>
            <div className="forecast-content">
                <div className="forecast-icon">
                    <img src={`images/icons/icon-${iconIndex}.svg`} alt="" width="48" />
                </div>
                <div className="degree">{maxTemp}<sup>o</sup>C</div>
                <small>{minTemp}<sup>o</sup>C</small>
            </div>
        </div>
    );
};
