import React, { useState } from 'react' 
import { Avatar, Button, CssBaseline, TextField, Alert, Link, Grid, Box, Typography, Container } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import customTheme from '../themeConfig'
import api from '../services/Api'
import md5 from 'md5'

export default function Register() {
  const [error, setError] = useState()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const formData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password').length > 0 ? md5(data.get('password')) : null
    }
    api.post('users', formData).then((res) => {
      setError(null)
      alert('Cadastrado com sucesso')
    }).catch((err) => {
      console.log('Erro no cadastro: ', err)
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
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              { error ?  <Grid item xs={12}><Alert severity="error">{error}</Alert></Grid>  : null }
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#157227", borderRadius: 2, mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Já possui uma conta? Faço o login
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