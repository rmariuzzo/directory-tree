import React from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalTheme } from './theme/GlobalTheme'
import { theme } from './theme/theme'
import { TreeGeneratorPage } from './pages/TreeGeneratorPage'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalTheme />
        <TreeGeneratorPage />
      </ThemeProvider>
    </>
  )
}

export default App
