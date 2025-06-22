export const News = () => {
    return(
        <>
            {/* Main Content Wrapper */}
            <main className="main-content">
                <div className="container">
                    {/* Breadcrumb Navigation */}
                    <div className="breadcrumb">
                        <a href="/">Home</a>
                        <span>News</span>
                    </div>
                </div>

                {/* Full Width Section for News Articles */}
                <div className="fullwidth-block">
                    <div className="container">
                        <div className="row">
                            <div className="content col-md-8">

                                {/* News Post 1 */}
                                <div className="post">
                                    <h2 className="entry-title">Global Efforts to Combat Climate Change Ramp Up</h2>
                                    
                                    {/* Featured Image */}
                                    <div className="featured-image"><img src="images/climateN.jpg" alt="Climate Action" className="custom-image"/></div>
                                    
                                    {/* Short Description */}
                                    <p>Countries worldwide are ramping up efforts to address the challenges posed by climate change. Leading cities are 
                                        increasingly transitioning to renewable energy sources, while global frameworks such as the Paris Agreement are advocating for more aggressive and actionable climate objectives.</p>

                                    {/* Read More Button */}
                                    <a href="/climate" className="button">Read more</a>
                                </div>

                                {/* News Post 2 */}
                                <div className="post">
                                    <h2 className="entry-title">Rising Temperatures Threaten Ecosystems and Human Health</h2>
                                    
                                    {/* Featured Image */}
                                    <div className="featured-image"><img src="images/temperatureN.jpg" alt="Rising Temperatures" className="custom-image"/></div>
                                    
                                    {/* Short Description */}
                                    <p>The global rise in temperatures, driven by climate change, is increasingly threatening ecosystems and human health. Scientists are observing more frequent and intense heatwaves, prolonged droughts, and shifting precipitation patterns, which have far-reaching consequences for biodiversity, agriculture, and public health. These environmental changes are accelerating the loss of habitats, while also exacerbating heat-related illnesses and the spread of infectious diseases.</p>
 
                                    {/* Read More Button */}
                                    <a href="/temperatures" className="button">Read more</a>
                                </div>

                                {/* News Post 3 */}
                                <div className="post">
                                    <h2 className="entry-title">Innovations in Weather Forecasting: What’s Next?</h2>
                                    
                                    {/* Featured Image */}
                                    <div className="featured-image"><img src="images/innovationN.jpeg" alt="Weather Forecasting" className="custom-image"/></div>
                                    
                                    {/* Short Description */}
                                    <p>Advancements in weather forecasting technology are revolutionizing our ability to predict extreme weather events with greater accuracy. Emerging tools such as AI-driven models, machine learning algorithms, and enhanced satellite data are transforming traditional forecasting methods, enabling meteorologists to better anticipate severe weather conditions. These innovations are paving the way for more proactive disaster management, improved climate modeling, and enhanced public safety in the face of unpredictable weather patterns.</p>
    
                                    {/* Read More Button */}
                                    <a href="/innovation" className="button">Read more</a>
                                </div>
                            </div>

                            {/* Sidebar Section */}
                            <div className="sidebar col-md-3 col-md-offset-1">
                                
                                {/* Hot News Widget */}
                                <div className="widget">
                                    <h3 className="widget-title">Hot News</h3>
                                    <ul className="arrow-list">
                                    {/* List of Trending Topics */}
                                        <li><a href="#">Breakthrough in Renewable Energy: Innovations Leading the Green Revolution</a></li>
                                        <li><a href="#">Global Vaccine Rollout: Key Developments and Global Impact</a></li>
                                        <li><a href="#">Emerging Trends in AI Technology: Transforming Industries Worldwide</a></li>
                                        <li><a href="#">Economic Summit Highlights: Key Policy Changes and Global Insights</a></li>
                                        <li><a href="#">Latest Sports Updates: Major Tournaments and Upcoming Events</a></li>
                                    </ul>
                                </div>

                                {/* Categories Widget */}
                                <div className="widget">
                                    <h3 className="widget-title">Categories</h3>
                                    <ul className="arrow-list">
                                        <li><a href="#">Politics</a></li>
                                        <li><a href="#">Technology</a></li>
                                        <li><a href="#">Environment</a></li>
                                        <li><a href="#">Business</a></li>
                                        <li><a href="#">Health</a></li>
                                        <li><a href="#">Sports</a></li>
                                        <li><a href="#">Entertainment</a></li>
                                        <li><a href="#">Science</a></li>
                                    </ul>
                                </div>

                                {/* Top Rated Posts Widget */}
                                <div className="widget top-rated">
                                    <h3 className="widget-title">Top Rated Posts</h3>
                                    <ul>
                                        <li><h3 className="entry-title"><a href="#">Renewable Energy Milestone Achieved</a></h3><div className="rating"><strong>4.8</strong> (890 rates)</div></li>
                                        <li><h3 className="entry-title"><a href="#">AI Advancements Transform Healthcare</a></h3><div className="rating"><strong>4.7</strong> (750 rates)</div></li>
                                        <li><h3 className="entry-title"><a href="#">Economic Recovery in Focus</a></h3><div className="rating"><strong>4.6</strong> (680 rates)</div></li>
                                        <li><h3 className="entry-title"><a href="#">Global Summit Tackles Climate Issues</a></h3><div className="rating"><strong>4.5</strong> (620 rates)</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

        </>
    )
}