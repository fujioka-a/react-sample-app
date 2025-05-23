import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      {/* 背景画像を敷く層 */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: 'url(https://picsum.photos/1600/900)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ★ 白の半透明マスク層（透過レイヤー） */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)', // Safari対策
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Navbar />

          <Box component="main" sx={{ flex: 1, p: 2, pt: '64px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>

          <Footer />
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;