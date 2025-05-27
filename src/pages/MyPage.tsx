// src/pages/MyPage.tsx
import React from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Box, Button, Typography
} from '@mui/material';

const MyPage: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) {
        return (
            <Box mt={4} textAlign="center">
                <Typography>ログイン情報が見つかりません。</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                マイページ
            </Typography>
            <Typography variant="body1" gutterBottom>
                ユーザーID: {user.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
                ログイン日時: {new Date(user.loginAt).toLocaleString()}
            </Typography>
            <Box mt={4}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                    ログアウト
                </Button>
            </Box>
        </Box>
    );
};

export default MyPage;