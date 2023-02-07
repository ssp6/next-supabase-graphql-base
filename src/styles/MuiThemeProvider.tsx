import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React, { FC } from 'react'
import { createEmotionCache } from './createEmotionCache'
import { materialUiTheme } from './materialUiTheme'

const clientEmotionCache = createEmotionCache()

type Props = {
  children?: React.ReactNode
  emotionCache?: EmotionCache
}
export const MuiThemeProvider: FC<Props> = ({ children, emotionCache = clientEmotionCache }) => (
  <CacheProvider value={emotionCache}>
    <ThemeProvider theme={materialUiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </CacheProvider>
)
