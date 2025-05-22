// src/layouts/Footer.tsx
import { Box, Container, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',
                backgroundColor: '#f5f5f5',
                borderTop: '1px solid #ddd',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="body2" color="textSecondary">
                    &copy; {new Date().getFullYear()} MyApp. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;