export const About = () => {

    return (

        <>
            {/* Main container for the About section */}
            <div className="fullwidth-block">
                <div className="container">
                    <div className="row">

                        {/* About Us Section: Information about the company */}
                        <div className="col-md-4">
                            {/* Section Title */}
                            <h2 className="section-title">About Us</h2>
                            <p>
                                Welcome! We are a team of weather enthusiasts and data experts committed to providing accurate and insightful weather predictions. 
                                With a deep passion for technology and meteorology, we aim to deliver reliable forecasts that help you make informed decisions every day.
                                Our mission is to harness the power of data and advanced machine learning algorithms to analyze weather patterns and provide 
                                predictions with precision. 
                            </p>
                            <p>
                                Whether you're a business looking to optimize operations, a farmer planning crop schedules, 
                                or simply curious about tomorrow’s forecast, we strive to deliver the information you need to stay ahead of the weather..
                            </p>
                            <p>
                                Thank you for choosing as your trusted source for weather insights. We are excited to partner with you and help you navigate 
                                the unpredictable world of weather with confidence and accuracy.
                            </p>
                        </div>

                        {/* Middle Column (Optional for Additional Content) */}
                        <div className="col-md-4">
                            {/* Our Vision Section: Highlights the company's future goals */}
                            <h2 className="section-title">Our Vision</h2>
                            {/* Vision statement describing the company's long-term goals */}
                            <p>
                                We envision a world where accurate and timely weather insights empower individuals, businesses, and governments 
                                to make smarter decisions that improve safety, optimize resources, and support sustainable growth. 
                                By harnessing the power of predictive weather analytics, we aim to create a future where everyone can anticipate 
                                and adapt to changing weather patterns, mitigating risks and seizing opportunities for progress.
                            </p>
                        </div>

                        {/* Weather Images Section: Displays a grid of weather-related images */}
                        <div className="col-md-4">
                            {/* Section Title */}
                            <h2 className="section-title">Weather Images</h2>
                            {/* Image grid showcasing weather photos */}
                            <div className="photo-grid">
                                {/* Links to images related to weather conditions */}
                                <a href="#"><img src="images/01.jpg" alt="Photo 1" /></a>
                                <a href="#"><img src="images/02.jpg" alt="Photo 2" /></a>
                                <a href="#"><img src="images/03.jpeg" alt="Photo 3" /></a>
                                <a href="#"><img src="images/04.jpeg" alt="Photo 4" /></a>
                                <a href="#"><img src="images/05.jpg" alt="Photo 5" /></a>
                                <a href="#"><img src="images/06.jpg" alt="Photo 6" /></a>
                                <a href="#"><img src="images/07.jpg" alt="Photo 7" /></a>
                                <a href="#"><img src="images/08.jpg" alt="Photo 8" /></a>
                                <a href="#"><img src="images/09.jpg" alt="Photo 9" /></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
