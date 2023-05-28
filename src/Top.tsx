import * as React from "react";
import { useState, useEffect, useMemo } from "react";

import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

import CM from "./pages/CM";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ConcertLogger from "./components/ConcertLogger";

import { Button, Box, Typography } from "@mui/material";
import SongPage from "./pages/SongPage";
import Dashboard from "./pages/Dashboard";

// This component contains state that is handled across different pages
// This naming is what you get when an RTL engineer learns frontend lol
const Top = () => {

  const location = useLocation();
  const currentPage = location.pathname.split("/")[1];

  // Component Control
  const disableConcertLogger = (currentPage === "dashboard");
  const disableNavbar = (currentPage === "dashboard");

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
  // State variables
  const [searchBy, setSearchBy] = useState("title");
  const [searchData, setSearchData] = useState(""); // Controlled search bar input
  const [newSearch, setNewSearch] = useState<boolean>(false); // Flag that we should do a new search

  const navigate = useNavigate();

  // Callback functions
  const changeSearchInput: React.ChangeEventHandler<HTMLInputElement> = e => {
    setSearchData(e.target.value);
  };

  const makeNewSearch: React.MouseEventHandler = e => {
    setNewSearch(true);
    const urlQueryStr = `?searchBy=${searchBy}&q=${searchData}`; // there must be a better library-way to do this
    navigate(`/search${urlQueryStr}`);
  };

  const searchDone = () => {
    setNewSearch(false);
  };

  // Props that go to the nav bar. It's pretty quick so don't need to memoize for now
  const navBarProps = {
    searchBy: searchBy,
    searchByChangeHandler: () => {
      return;
    },
    searchInput: searchData,
    searchInputChangeHandler: changeSearchInput,
    makeNewSearch: makeNewSearch,
  };

  /*** Memoized Props ***********************************/
  // This will improve performance by not having the direct children
  // Re-render every time the search bar is edited. Search bar state is
  // controlled from here, that's why. Maybe there's a better architecture
  // or design pattern for this but I don't know right now.
  // Child components are memoized so they don't re render if props don't change

  // Memoize because I've observed const functions make memoized components re-render
  // This is due to referential inequality
  // If this is really the only prop, consider useCallback() for logEdit
  const homePageProps = useMemo(
    () => ({
      logEdit: handleLogEdit,
    }),
    []
  ); // Empty sensitivity to prevent referential inequality because this is a function and practically won't change.

  const searchResultsProps = useMemo(
    () => ({
      newSearch: newSearch,
      searchDone: searchDone,
    }),
    [newSearch]
  ); // searchDone must be off sensitivity because of referential inequality
  // alternatively, consider the useCallback() hook

  /*** Return Component***********************************/
  return (
    <Box minWidth={1200}>
      {" "}
      {/* A Container box to make body scroll sideways */}
      <SiteHeader />
      { !disableNavbar &&
      <NavBar {...navBarProps} />
      }
      {/* Div to push everything else down because header is fixed positioning */}
      {/* There must be a way to make it cleaner but this hacky thing works for now */}
      <div style={{ height: (!disableNavbar) ? 224 : 96 }} />
      <Routes>
        <Route path="/" element={<Home {...homePageProps} />} />
        <Route path="/CMs/:initials" element={<CM logEdit={handleLogEdit} />} />
        <Route path="/song/:id" element={<SongPage />} />
        <Route
          path="/search"
          element={<SearchResults {...searchResultsProps} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* The Button to slide the Concert Log in and out*/
      (!disableConcertLogger) &&
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
      }
      { !disableConcertLogger &&
      <ConcertLogger
        open={logOpen}
        isEditMode={logEditMode}
        editID={logEditID}
        setEditMode={setLogEditMode}
        cancelEdit={cancelEdit}
      />
      }
    </Box> // Container
  );
};

export default Top;
