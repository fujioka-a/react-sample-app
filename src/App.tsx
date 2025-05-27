import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import TaskControl from './pages/TaskControl';

import { AuthProvider, useAuth } from './auth/AuthContext';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { JSX } from 'react';

const backgroundCity = '/dubai_skyline_1600x900.png';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 背景画像を敷く層 */}
        <Box
          sx={{
            // backgroundImage: 'url(https://picsum.photos/1600/900)',
            backgroundImage: `url(${backgroundCity})`,
            minHeight: '100vh',
            minWidth: '100vw',
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

            {/* ★ メインコンテンツ領域（レスポンシブ対応のパディング設定） */}
            <Box
              component="main"
              sx={{
                flex: 1,
                // 画面サイズに応じてパディングを変更（xs:1, sm:2, md:3）
                p: { xs: 1, sm: 2, md: 3 },
                pt: '64px', // ナビバー分の上部余白
              }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><TaskControl /></ProtectedRoute>} />
              </Routes>
            </Box>

            <Footer />
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;