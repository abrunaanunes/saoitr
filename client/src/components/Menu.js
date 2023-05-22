import { AppBar, Toolbar, Typography, Box, Button, Link } from '@mui/material';
import useAuth from "../hooks/useAuth"
import api from '../services/Api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Menu() {
    const { authenticated, user, logout, token } = useAuth()

    const navItems = !authenticated ? [
        {title:'Login', href: '/login'}, 
        {title: 'Cadastre-se', href: '/register'},
        {title: 'Ocorrências', href: '/'},
    ] : [
        {title: 'Ocorrências', href: '/'},
        {title:'Minhas ocorrências', href: '/'}, 
    ];

    const handleLogout = (event) => {
        const formData = {  id: user.id }
        const headers = { Authorization: `Bearer ${token}` }
        api.post('/logout', formData, { headers }).then((res) => {
          logout()
          window.location.href = '/'
        }).catch((err) => {
          console.log('Erro no logout: ', err)
          toast("Ocorreu um erro ao realizar o logout")
        })
      }

    return (
        <AppBar position="absolute">
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
                { navItems.map((item) => ( <Button href={item.href} sx={{ color: '#fff' }} component={Link}> {item.title} </Button>)) }
                { authenticated ? <Button onClick={handleLogout} sx={{ color: '#fff' }}>Logout</Button> : null }
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Menu