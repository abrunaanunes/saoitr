import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import customTheme from '../themeConfig'


export default function Home() {
  
  return (
    <ThemeProvider theme={customTheme}>
      <Menu></Menu>
      <main>
        
      </main>
      <Footer></Footer>
    </ThemeProvider>
  )
}