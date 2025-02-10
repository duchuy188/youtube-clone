import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import Trending from './pages/Trending';
import News from './pages/News';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/:videoId" element={<VideoDetail />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/news" element={<News />} />

      </Routes>
    </Router>
  );
}

export default App;