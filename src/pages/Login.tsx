// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Box, Button, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, Typography
} from '@mui/material';

const Login: React.FC = () => {
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/mypage');
        } catch (err: any) {
            setErrorMessage(err.message || 'ログインに失敗しました');
            setErrorDialogOpen(true);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
            <Typography variant="h5" gutterBottom>
                ログイン
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="ユーザーID"
                    margin="normal"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    disabled={loading}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="パスワード"
                    margin="normal"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
                <Box mt={2} display="flex" justifyContent="center">
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'ログイン'}
                    </Button>
                </Box>
            </form>

            {/* エラーダイアログ */}
            <Dialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)}>
                <DialogTitle>ログインエラー</DialogTitle>
                <DialogContent>
                    <Typography>{errorMessage}</Typography>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Login;