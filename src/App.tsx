import * as React from "react";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CM from "./pages/CM";
import Home from "./pages/Home";
import SongPage from "./components/SongPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteHeader />
      <NavBar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CMs/:initials" element={<CM />} />
          <Route path="/song/:id" element={<SongPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
