import { createTheme } from '@mui/material/styles'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#161b22"
        },
        secondary: {
            main: "#0d1117"
        },
        background: {
            default: "#010409"
        },
        text: {
            primary: "#ffffff"
        }
    }
})

export default customTheme