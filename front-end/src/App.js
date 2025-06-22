import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing Router components
import { Navbar } from './component/Navbar'; // Navbar component for navigation
import { Details } from './component/Details';  // Details page component
import { Video } from './component/Video'; // Video page component
import { Charts } from './component/Charts'; // Charts page component
import { About } from './component/About'; // About page component
import { Footer } from './component/Footer'; // Footer component for the page footer
import {News} from "./pages/News"; // News page component
import {Climate, NewsOne} from "./pages/Climate"; // Climate and NewsOne page components
import {Temperatures} from "./pages/Temperatures"; // Temperatures page component
import {Innovation} from "./pages/Innovation"; // Innovation page component
import {LiveCam} from "./pages/LiveCam"; // LiveCam page component
import {Photoes} from "./pages/Photoes"; // Photos page component
import {Contact} from "./pages/Contact"; // Contact page component

function App() {
    return (
        <div className="App">
            {/* Router component to manage all routing */}
            <Router>
                <Navbar />

                {/* Define Routes */}
                <Routes>
                    {/* Each Route corresponds to a different path and component */}
                    <Route path="/" element={<Details />} /> {/* Default route */}
                    <Route path="/charts" element={<Charts />} /> {/* Charts page */}
                    <Route path="/about" element={<About />} /> {/* About page */}
                    <Route path="/video" element={<Video />} /> {/* Video page */}
                    <Route path="/news" element={<News />} /> {/* News page */}
                    <Route path="/climate" element={<Climate />} /> {/* Climate page */}
                    <Route path="/temperatures" element={<Temperatures />} /> {/* Temperatures page */}
                    <Route path="/innovation" element={<Innovation />} /> {/* Innovation page */}
                    <Route path="/liveCam" element={<LiveCam />} /> {/* LiveCam page */}
                    <Route path="/photos" element={<Photoes />} /> {/* Photos page */}
                    <Route path="/contact" element={<Contact />} /> {/* Contact page */}
                </Routes>

                {/* Footer component to be displayed across all routes */}
                <Footer />
            </Router>
        </div>
    );
}

export default App;
