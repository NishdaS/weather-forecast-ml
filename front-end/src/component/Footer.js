export const Footer = () => {

    return (
        <>
            <footer className="site-footer">
                <div className="container">
                    <div className="row">
                        
                        {/* Subscribe Form Section */}
                        <div className="col-md-8">
                            <form action="#" className="subscribe-form">
                                {/* Input field for email subscription */}
                                <input type="text" placeholder="Enter your email to subscribe..." />
                                {/* Submit button for subscription */}
                                <input type="submit" value="Subscribe" />
                            </form>
                        </div>

                        {/* Social Media Links Section */}
                        <div className="col-md-3 col-md-offset-1">
                            <div className="social-links">
                                {/* Facebook social link */}
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                {/* Twitter social link */}
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                {/* Google Plus social link */}
                                <a href="#"><i className="fa fa-google-plus"></i></a>
                                {/* Pinterest social link */}
                                <a href="#"><i className="fa fa-pinterest"></i></a>
                            </div>
                        </div>
                    </div>

                    <p className="colophon">Copyright 2024 Group 78 - The Lions. All rights reserved</p>
                </div>
            </footer>
        </>
    )
}
