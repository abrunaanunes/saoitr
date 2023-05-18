import * as React from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { ThemeProvider } from '@mui/material/styles'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import customTheme from '../themeConfig'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Home() {
  
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Menu></Menu>
      <main>
        
      </main>
      <Footer></Footer>
    </ThemeProvider>
  )
}