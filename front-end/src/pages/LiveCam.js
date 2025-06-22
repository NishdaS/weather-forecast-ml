// Import the required libraries and components
export const LiveCam = () => {
    // Generates a random date within the past 30 days
    const getRandomDate = () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - Math.floor(Math.random() * 30)); // Randomly subtract up to 30 days

        const hours = Math.floor(Math.random() * 12) + 1; // Random hour from 1 to 12
        const minutes = Math.floor(Math.random() * 60); // Random minute from 0 to 59
        const amPm = Math.random() > 0.5 ? ' AM' : ' PM'; // Random AM/PM

        // Format the date and time
        return `${pastDate.getDate()} ${pastDate.toLocaleString('default', { month: 'short' })}, ${hours}:${minutes.toString().padStart(2, '0')}${amPm}`;
    };
    return(
        <>
            <main className="main-content">
                <div className="container">
                    {/* Breadcrumb navigation */}
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Live cameras</span>
                    </div>
                </div>

                <div className="fullwidth-block">
                    <div className="container">
                        {/* Filter options for Country, Show per page, and Quality */}
                        <div className="filter">
                            <div className="country filter-control">
                                <label htmlFor="">Country</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">Australia</option>
									</select>
								</span>
                            </div>
                            <div className="count filter-control">
                                <label htmlFor="">Show per page</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">1</option>
										<option value="">2</option>
										<option value="">3</option>
										<option value="">4</option>
										<option value="">5</option>
										<option value="">6</option>
										<option value="">7</option>
										<option value="">8</option>
										<option value="">9</option>
										<option value="">10</option>
									</select>
								</span>
                            </div>
                            <div className="quality filter-control">
                                <label htmlFor="">Only high HD quality</label>
                                <span className="select control">
									<select name="" id="">
										<option value="">Yes</option>
										<option value="">No</option>
									</select>
								</span>
                            </div>
                        </div>

                        {/* Camera feeds displayed in rows and columns */}
                        <div className="row">
                            {/* Camera feed for Moodleigh */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v08.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Moodleigh</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for East Point */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v07.mp4" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">East Point</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for Parap */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v06.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Parap</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for Channel Island */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v01.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Channel Island</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>
                        </div>

                        {/* Additional row for more camera feeds */}
                        <div className="row">
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v04.mp4" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Daly</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for Hotham */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v03.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Hotham</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for Mapuru */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v05.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Mapuru</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>

                            {/* Camera feed for Mount Bundey */}
                            <div className="col-md-3 col-sm-6">
                                <div className="live-camera">
                                    <figure className="live-camera-cover">
                                        <video controls width="100%">
                                            <source src="images/vedio/v02.mov" type="video/mp4" />
                                            Your browser does not support the video tag. 
                                            Please update your browser or try a different one to view 
                                            this video.
                                        </video>
                                    </figure>
                                    <h3 className="location">Mount Bundey</h3>
                                    <small className="date">{getRandomDate()}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </>
    )
}