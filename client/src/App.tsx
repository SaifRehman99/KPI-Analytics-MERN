import { useMemo } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "@/theme"

function App() {

  const theme = useMemo(() => createTheme(themeSettings), [])

  return (


    <div className="App">
      <ThemeProvider theme={theme}>
        {/* reseting the css into def material styles */}
        <CssBaseline />
        hi
      </ThemeProvider>

    </div>
  )
}

export default App
