import * as React from "react";
import { useState, useEffect } from "react";

import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CM from "./pages/CM";
import Home from "./pages/Home";
import ConcertLogger from "./components/ConcertLogger";

import { Button, Box, Typography } from "@mui/material";
import SongPage from "./components/SongPage";

const App = () => {
  const [logOpen, setLogOpen] = useState(false);

  const toggleOpen = () => {
    logOpen ? setLogOpen(false) : setLogOpen(true);
  };

  const posleft = logOpen ? 256 - 8 : -8;

  const buttonOffsetY = "40px";
  const buttonOffsetX = "8px";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteHeader />
      <NavBar />

      {/* Div to push everything else down because header is fixed positioning */}
      {/* There must be a way to make it cleaner but this hacky thing works for now */}
      <div style={{ height: 224 }} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CMs/:initials" element={<CM />} />
          <Route path="/song/:id" element={<SongPage />} />
        </Routes>
      </Router>

      {/* The Button to slide the Concert Log in and out*/}
      <Box
        sx={{
          position: "fixed",
          left: posleft,
          top: 126,
          zIndex: theme.zIndex.drawer + 1,
          transform: "rotate(90deg)",
          transformOrigin: `${buttonOffsetX} 34px`,
          // copied from Drawer Paper on DOM
          // For some reason, I don't think it's perfectly aligned but pretty close.
          //Maybe should change it all into a Slider component instead of Drawer in a subsequent commit?
          transition: logOpen
            ? "left 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
            : "left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        }}
      >
        <Button
          disableRipple
          onClick={toggleOpen}
          variant="contained"
          sx={{
            position: "relative",
            left: 0,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "primary.light",
            color: "primary.dark",
            textTransform: "none",
            lineHeight: "18px",
            mx: buttonOffsetX,
            borderRadius: "4px 4px 0px 0px",
            "&.MuiButton-root": {
              padding: "8px 12px", // not sure why this works but doing it in the sx prop doesn't
              ":hover": {
                backgroundColor: "primary.light",
                fontWeight: "bold",
                boxShadow:
                  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
              },
            },
          }}
        >
          Log
        </Button>
        {/* This covers the edge of the drawer */}
        <Box
          sx={{
            position: "relative",
            height: buttonOffsetY,
            width: "100%",
            zIndex: theme.zIndex.drawer + 2,
            color: "primary.light",
            backgroundColor: "primary.light",
            boxShadow: "none",
          }}
        ></Box>
      </Box>
      <ConcertLogger open={logOpen} />
    </ThemeProvider>
  );
};

export default App;
