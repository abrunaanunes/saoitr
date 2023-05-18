import { AppBar, Toolbar, Typography, Box, Button, Link } from '@mui/material';

function Menu() {
    const navItems = [
        {title:'Login', href: '/login'}, 
        {title: 'Cadastre-se', href: '/'}
    ];
    return (
        <AppBar position="relative">
            <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                flexGrow: 1
                }}
            >
                LOGO
            </Typography>
            <Box>
                {navItems.map((item) => (
                <Button href={item.href} sx={{ color: '#fff' }} component={Link}>
                    {item.title}
                </Button>
                ))}
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Menu