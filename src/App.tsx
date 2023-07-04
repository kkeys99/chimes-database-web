import * as React from "react";
import Top from "./Top";
import { useState, useEffect, useMemo } from "react";

import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* 
          * The "Top" Component is wrapped in Router so that it can use
          * state variables that have react-router-dom hooks
         */}
        <Top />
      </Router>
    </ThemeProvider>
  );
};

export default App;
