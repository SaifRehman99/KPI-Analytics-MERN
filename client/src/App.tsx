import { useMemo } from "react"
import { CssBaseline, ThemeProvider, Box } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "@/theme"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "@/scenes/navbar"

function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* reseting the css into def material styles */}
          <CssBaseline />

          <Box width="100%" height="100" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<div>dashboard page</div>} />
            </Routes>

          </Box>

        </ThemeProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
