export const Photoes = () => {
    // Array of photo objects, each containing the image URL, title, description, and rating
    const photos = [
        { img: "images/01.jpg", title: "Cloudy Skies", description: "A thick layer of clouds envelops the sky, reducing visibility and creating a muted atmosphere. The overcast weather suggests a lack of sunlight, leading to cooler temperatures.", rating: 60 },
        { img: "images/02.jpg", title: "Cloudy Afternoon", description: "A blanket of heavy clouds covers the sky during the afternoon, dimming the sunlight. The air feels cooler, and the weather remains calm with no signs of immediate precipitation.", rating: 60 },
        { img: "images/03.jpeg", title: "Gloomy Clouds", description: "The sky is filled with dark, ominous clouds, indicating a high likelihood of rain. The gloomy atmosphere suggests unsettled weather conditions, with a slight chance of storms developing later.", rating: 60 },
        { img: "images/04.jpeg", title: "Overcast Weather", description: "An uninterrupted layer of clouds covers the sky, blocking out the sun entirely. This consistent overcast weather often leads to lower temperatures and can persist for hours or even days.", rating: 60 },
        { img: "images/05.jpg", title: "Thunderstorm Alert", description: "The sky is illuminated by intense lightning, accompanied by the rumbling sound of thunder. A severe thunderstorm is in progress, with strong winds and the potential for heavy rain and hail.", rating: 60 },
        { img: "images/06.jpg", title: "Rainy Day", description: "Steady rainfall has created wet conditions, with puddles forming on the ground. The constant rainfall brings a fresh and cool atmosphere, often making the environment feel more tranquil and serene.", rating: 60 },
        { img: "images/07.jpg", title: "Sunny and Clear", description: "The sky is completely clear with no clouds in sight, allowing the sun to shine brightly and warm the earth. This clear weather is ideal for outdoor activities and provides pleasant conditions throughout the day.", rating: 60 },
        { img: "images/08.jpg", title: "Bright Sunny Day", description: "A beautiful day marked by uninterrupted sunlight and a vibrant blue sky. The warm temperatures are ideal for spending time outdoors, and the lack of clouds suggests stable weather for the rest of the day.", rating: 60 },
        { img: "images/09.jpg", title: "Snowfall", description: "Delicate snowflakes gently fall from the sky, accumulating on the ground in a soft white blanket. The snowfall creates a serene, peaceful atmosphere, while the cold temperatures result in a wintery scene, ideal for snow sports or cozy indoor activities.", rating: 60 }
    ];    

    return (
        <>
            {/* Main Content Section */}
            <main className="main-content">
                <div className="container">
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Photos</span> {/* Current page indicator */}
                    </div>
                </div>

                {/* Full Width Section to Display Photos */}
                <div className="fullwidth-block">
                    <div className="container">
                        <div className="row">

                            {/* Mapping through photos array to create photo items */}
                            {photos.map((photo, index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="photo">
                                        {/* Photo Preview (Background Image Set Dynamically) */}
                                        <div className="photo-preview photo-detail" style={{ backgroundImage: `url(${photo.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                        <div className="photo-details">
                                            {/* Photo Title Link */}
                                            <h3 className="photo-title"><a href="#">{photo.title}</a></h3>
                                            {/* Photo Description */}
                                            <p>{photo.description}</p>
                                            {/* Rating Section */}
                                            <div className="star-rating" title={`Rated ${photo.rating / 20} out of 5`}>
                                                {/* Display Star Rating as Percentage Width */}
                                                <span style={{ width: `${photo.rating}%` }}>
                                                    <strong className="rating">{photo.rating / 20}</strong> out of 5
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
