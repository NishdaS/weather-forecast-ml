import React from 'react';

export const Contact = () => {
    return (
        <>
            <main className="main-content">
                <div className="container">
                    {/* Breadcrumb navigation */}
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>Contact</span>
                    </div>
                </div>

                <div className="fullwidth-block">
                    <div className="container">
                        {/* Contact Details Section */}
                        <div className="col-md-5">
                            <div className="contact-details">
                                <div className="map" style={{ width: '100%', height: '450px' }}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.6293281348485!2d145.03895459999998!3d-37.8221504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642326bae5aaf%3A0x75e96bbd4988f769!2sSwinburne%20University%20of%20Technology!5e0!3m2!1sen!2slk!4v1730176689065!5m2!1sen!2slk"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Google Map"
                                    ></iframe>
                                </div>
                                <div className="contact-info">
                                    <address>
                                        <img src="images/icon-marker.png" alt="" />
                                        <p>Swinburne University of Technology <br />
                                            John St, Hawthorn VIC 3122, Australia</p>
                                    </address>
                                    <a href="tel:+941234567"><img src="images/icon-phone.png" alt="" />+61392148444</a>
                                    <a href="mailto:contact@weatheranalysis.com"><img src="images/icon-envelope.png" alt="" />http://www.swinburne.edu.au/</a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Section */}
                        <div className="col-md-6 col-md-offset-1">
                            <h2 className="section-title">Contact us</h2>
                            <p> We appreciate your interest in our weather insights. We're here to provide you with reliable forecasts and in-depth 
                                analysis to help you stay prepared and make informed decisions!</p>
                            
                            <form action="#" className="contact-form">
                                <div className="row">
                                    <div className="col-md-6"><input type="text" placeholder="Your name..." /></div>
                                    <div className="col-md-6"><input type="text" placeholder="Email Address..." /></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6"><input type="text" placeholder="Company name..." /></div>
                                    <div className="col-md-6"><input type="text" placeholder="Website..." /></div>
                                </div>
                                <textarea placeholder="Message..."></textarea>
                                <div className="text-right">
                                    <input type="submit" value="Send message" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};