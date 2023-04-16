import * as React from "react";
import { useState, useEffect, useMemo } from "react";

import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CM from "./pages/CM";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ConcertLogger from "./components/ConcertLogger";

import { Button, Box, Typography } from "@mui/material";
import SongPage from "./pages/SongPage";

const App = () => {
  /*** Concert Logger ************************************/
  // State variables
  const [logOpen, setLogOpen] = useState(false);
  const [logEditMode, setLogEditMode] = useState(false);
  const [logEditID, setLogEditID] = useState<number | null>(null);

  // Callback functions
  const logButtonClickHandler: React.MouseEventHandler = () => {
    // Toggle the open state
    logOpen ? setLogOpen(false) : setLogOpen(true);
    // Fully clear edit mode
    setLogEditMode(false);
    setLogEditID(null);
  };

  const handleLogEdit = (id: number) => {
    setLogEditID(id);
    setLogEditMode(true);
    setLogOpen(true);
  };

  const cancelEdit = () => {
    setLogEditID(null);
    setLogEditMode(false);
  };

  /*** Log Tab Button ************************************/
  // Style and position variables
  const buttonHeight = 34;
  const buttonMargin = 4;
  const posleft = logOpen ? 256 - buttonMargin : -buttonMargin;
  const buttonOffsetY = "40px";
  const buttonOffsetX = "8px";

  /*** Search *******************************************/
  const [searchBy, setSearchBy] = useState("all");
  const [searchData, setSearchData] = useState(""); // Controlled search bar input
  const [newSearch, setNewSearch] = useState(false); // What to actually send to the backend
  const [actualSearch, setActualSearch] = useState("");

  const changeSearchInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchData(e.target.value);
  }

  const makeNewSearch: React.MouseEventHandler = (e) => {
    setNewSearch(true);
    setActualSearch(searchData);
  }

  const searchDone = () => {
    setNewSearch(false);
  }

  const navBarProps = {
    searchBy: searchBy,
    searchByChangeHandler: () => {return},
    searchInput: searchData,
    searchInputChangeHandler: changeSearchInput,
    makeNewSearch: makeNewSearch,
  }

  /*** Memoized Props ***********************************/
  // This will improve performance by not having the direct children
  // Re-render every time the search bar is edited. Search bar state is
  // controlled from here, that's why. Maybe there's a better architecture
  // or design pattern for this but I don't know right now.
  // Child components are memoized so they don't re render if props don't change

  // Memoize because I've observed const functions make memoized components re-render
  // If this is really the only prop, consider useCallback() for logEdit
  const homePageProps = useMemo(() => (
    {
      logEdit: handleLogEdit
    }
  ), []); // Empty sensitivity because this function shouldn't change.

  const searchResultsProps = useMemo(() => (
    {
      searchBy: searchBy,
      searchData: actualSearch,
      newSearch: newSearch,
      searchDone: searchDone,
    }
  ), [searchBy, actualSearch, newSearch]); //searchDone off sensitivity fixes things
  
  /*** Return Component***********************************/
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box minWidth={1200}> {/* A Containter box to make body scroll sideways */}
        <Router >
          <SiteHeader />
          <NavBar {...navBarProps} />

          {/* Div to push everything else down because header is fixed positioning */}
          {/* There must be a way to make it cleaner but this hacky thing works for now */}
          <div style={{ height: 224, }} />
          
          <Routes>
            <Route path="/" 
              element={<Home {...homePageProps} />} 
            />
            <Route path="/CMs/:initials"
              element={<CM logEdit={handleLogEdit} />}
            />
            <Route path="/song/:id" 
              element={<SongPage />} 
            />
            <Route path="/search" 
              element={<SearchResults {...searchResultsProps} />}
            />
          </Routes>
        </Router>

        {/* The Button to slide the Concert Log in and out*/}
        <Box
          sx={{
            overflow: "hidden", // This makes button box-shadow not appear outside of box
            position: "fixed",
            left: posleft,
            top: 122,
            zIndex: theme.zIndex.drawer + 1,
            transform: "rotate(90deg)",
            transformOrigin: `${buttonMargin}px ${buttonMargin + buttonHeight}px`,
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
            onClick={logButtonClickHandler}
            variant="contained"
            sx={{
              boxShadow: 2,
              height: buttonHeight,
              position: "relative",
              left: 0,
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: "primary.light",
              color: "primary.dark",
              textTransform: "none",
              lineHeight: "18px",
              mx: `${buttonMargin}px`,
              mt: `${buttonMargin}px`,
              borderRadius: "4px 4px 0px 0px",
              "&.MuiButton-root": {
                padding: "8px 12px", // not sure why this works but doing it in the sx prop doesn't
                ":hover": {
                  backgroundColor: "primary.light",
                  fontWeight: "bold",
                  boxShadow: 2,
                  //  "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                },
              },
            }}
          >
            Log
          </Button>
        </Box>
        <ConcertLogger
          open={logOpen}
          isEditMode={logEditMode}
          editID={logEditID}
          setEditMode={setLogEditMode}
          cancelEdit={cancelEdit}
        />
      </Box> {/* Container */}
    </ThemeProvider>
  );
};

export default App;
