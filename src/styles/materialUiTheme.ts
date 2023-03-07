import { createTheme, Shadows } from '@mui/material'
import { Roboto } from '@next/font/google'

const openSans = Roboto({ subsets: ['latin'], weight: ['300', '400', '700'] })

export const materialUiTheme = createTheme({
  // Makes material UI flat
  shadows: new Array(25).fill('none') as Shadows,
  palette: {
    primary: {
      main: '#E06D03',
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
