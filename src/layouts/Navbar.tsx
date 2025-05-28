import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // AuthContextからログイン状態を取得

function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { user } = useAuth();

    // ベースのnavItems
    const navItems = [
        { label: 'ホーム', path: '/' },
        { label: 'お問い合わせ', path: '/contact' },
        { label: '会社概要', path: '/about' },
    ];

    // ログイン状態であれば追加、そうでなければログインボタンを追加
    if (user) {
        navItems.push({ label: 'マイページ', path: '/mypage' });
        navItems.push({ label: 'タスク管理', path: '/tasks' });
    } else {
        navItems.push({ label: 'ログイン', path: '/login' });
    }

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {/* ハンバーガー（小画面のみ表示） */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' }, mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* 左のタイトル */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        ホームページ名
                    </Typography>

                    {/* PC表示用メニュー（中画面以上） */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                component={Link}
                                to={item.path}
                                key={item.label}
                                sx={{ color: '#fff' }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer：モバイル用スライドメニュー */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { width: 240 },
                }}
            >
                <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ my: 2 }}>
                        MyApp
                    </Typography>
                    <List>
                        {navItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton component={Link} to={item.path}>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;