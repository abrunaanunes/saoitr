import React, { useState } from 'react' 
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Alert } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import customTheme from '../themeConfig'
import api from '../services/Api'

export default function Login() {
  const [error, setError] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    api.post('/login', formData).then((res) => {
      console.log(res)
    }).catch((err) => {
      setError(err.response.data.message)
    })
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Menu></Menu>
      <Container component="main" maxWidth="xs"
        sx={{
          backgroundColor: "#161b22",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 4,
          borderRadius: 2,
          marginTop: 6,
          border: 1,
          borderColor: '#494949'
        }}
        >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            { error ?  <Alert severity="error">{error}</Alert>  : null }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar a senha"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#157227", borderRadius: 2, mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não possui cadastro?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer></Footer>
      </Container>
    </ThemeProvider>
  )
}