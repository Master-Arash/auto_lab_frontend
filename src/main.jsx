import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useThemeStore from "./stores/themeStore";
import { initI18n } from "./i18n";
import "./assets/fonts/iransansx/iransansx.css";

export default function Main() {
  const darkMode = useThemeStore((state) => state.darkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2e7d32" },
        },
        typography: {
          fontFamily: `"IRANSansX", "Roboto", "Helvetica", "Arial", sans-serif`,
          fontSize: 15,
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
        // direction: "rtl",
      }),
    [darkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

async function startApp() {
  await initI18n();

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>,
  );
}

startApp();
