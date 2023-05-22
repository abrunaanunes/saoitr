import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Typography } from '@mui/material';
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import customTheme from '../themeConfig'
import Image from '../assets/background.jpg';

const styles = {
  background: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative'
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#000',
    opacity: '0.8'
  },
  page: {
    position: 'relative'
  },
  banner: {
    height: '75%',
    width: '50%',
    backgroundColor: '#161b22',
    color: '#fff',
    fontSize: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    zIndex: '9999',
    padding: '0 2rem'
  }
}

export default function Home() {
  
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={styles.page}>
        <Menu></Menu>
        <main>
        <Box sx={styles.background}>
          <Box sx={styles.overlay}></Box>
        </Box> 
        </main>
        <Footer></Footer>
      </Box>
    </ThemeProvider>
  )
}