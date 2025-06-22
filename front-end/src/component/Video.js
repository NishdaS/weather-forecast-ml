export const Video = () => {
    // Array of video data, each with source, location, and date information
    const videos = [
        { src: "images/vedio/v01.mov", location: "Brinkin", date: "08 Oct, 09:30 AM" },
        { src: "images/vedio/v02.mov", location: "Lee point", date: "12 Oct, 10:00 AM" },
        { src: "images/vedio/v03.mov", location: "Moil", date: "08 Nov, 11:00 AM" },
        { src: "images/vedio/v04.mp4", location: "Karrara", date: "10 Nov, 08:00 AM" }
    ];

    return (
        <>
            <div className="fullwidth-block">
                <div className="container">
                    {/* Section Title */}
                    <h2 className="section-title">Live cameras</h2>
                    <div className="row">
                        {/* Map over videos array to render each video element */}
                        {videos.map((video, index) => (
                            <div className="col-md-3 col-sm-6" key={index}>
                                <div className="live-camera">
                                    {/* Video Cover */}
                                    <figure className="live-camera-cover">
                                        {/* Video element with controls for playback */}
                                        <video controls width="100%">
                                            <source src={video.src} type="video/mp4" />
                                            {/* Fallback text if the video tag isn't supported */}
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.

                                        </video>
                                    </figure>
                                    {/* Location and Date Information */}
                                    <h3 className="location">{video.location}</h3>
                                    <small className="date">{video.date}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
