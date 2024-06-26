import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

import { Link as MuiLink } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";

import { Person } from "../typing/types";
import { styleVariables, navBarStyles, headerStyles } from "../constants";
import logger from "../shared/logger";

/***************************************************************
 * Component: CMList
 * - List of current CMs that are links to their respective CM Page
 * - Gets current CMs from database, thus needs no props or URL info
 *
 * Props: None
 *
 * ***************************************************************/
const CMList = () => {
  const name = "CM List";
  logger.log(name, `Render`, logger.logLevel.INFO);

  const theme = useTheme();
  const location = useLocation();
  const [currentCMs, setCurrentCMs] = useState<Person[]>([]);

  useEffect(() => {
    logger.log(
      name,
      `[useEffect] - fetching current CMs`,
      logger.logLevel.INFO
    );
    fetch(`/person/current`)
      .then(res => res.json())
      .then(data => setCurrentCMs(data));
  }, []);

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        justifyContent: "center",
        pt: navBarStyles.paddingTop,
        height: navBarStyles.heightRow1,
      }}
    >
      <Stack direction="row" spacing={navBarStyles.spaceBetweenCmList}>
        {currentCMs.map(cm => {
          return (
            // Gianluca wuz here
            // I want to use react-router-dom link but Typography doesn't have the underline prop
            <MuiLink
              component={RouterNavLink}
              to={`/cm/${cm.initials}`}
              color={
                location.pathname.split("/")[2] == cm.initials
                  ? "primary.main"
                  : "primary.dark"
              }
              variant="h2"
              fontWeight="bold"
              underline="hover"
            >
              {cm.initials}
            </MuiLink>
          );
        })}
        <Typography color="primary.dark" variant="h2" fontWeight="bold">
          {"See all CMS"}
        </Typography>
      </Stack>
    </Toolbar>
  );
};

/***************************************************************
 * Component: SearchInput
 * - The text input field of the search bar
 *
 * Props:
 *
 * ***************************************************************/
interface SearchInputProps extends NavBarProps {} // Alias for better naming

const SearchInput = (props: SearchInputProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const keyUpHandler: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key == "Enter") {
      props.makeNewSearch();
    }
  };

  return (
    <FormControl
      variant="filled"
      size="small"
      sx={{ mr: navBarStyles.spaceAfterSearch }}
    >
      <InputLabel style={{ color: theme.palette.success.dark }}>
        Search
      </InputLabel>
      <FilledInput
        value={props.searchInput}
        onKeyUp={keyUpHandler}
        onChange={props.searchInputChangeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                props.makeNewSearch();
              }}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
        sx={{
          borderRadius: 3,
          pr: 1, // Default seems to be 12px, I like it closer to the edge
        }}
      />
    </FormControl>
  );
};

/***************************************************************
 * Component: SearchBar
 * - Parent of the whole bottommost row of nav bar
 * - Contains search input box and tags buttons
 *
 * Props:
 *
 * ***************************************************************/
interface SearchBarProps extends NavBarProps {} // Alias for better naming

const SearchBar = (props: SearchBarProps) => {
  const tags = [
    "Sheet",
    "Composer",
    "Arranger",
    "Genre",
    "Key",
    "Time Signature",
    "Tempo",
    "Date Added",
  ];
  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{ justifyContent: "center", pb: navBarStyles.paddingBot }}
    >
      <SearchInput {...props} />
      {/* Tags */}
      <Stack direction="row" spacing={navBarStyles.spaceBetweenTags}>
        {tags.map(tag => {
          return (
            <Typography color="primary.dark" variant="body1">
              {tag}
            </Typography>
          );
        })}
      </Stack>
    </Toolbar>
  );
};

/***************************************************************
 * Component: NavBar
 * - The parent component of the whole Nav Bar
 * - Nav Bar meaning the gray strip underneath the red header
 * - Contains CM List (top row) and Search Bar (bottom row)
 *
 * Props:
 *
 * ***************************************************************/
interface NavBarProps {
  searchBy: string;
  searchByChangeHandler: Function; // maybe get a better type for this
  searchInput: string;
  searchInputChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  makeNewSearch: Function;
}

const NavBar = (props: NavBarProps) => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "primary.contrastText",
        height: navBarStyles.totalHeight,
        top: headerStyles.totalHeight,
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Stack spacing={navBarStyles.spaceBetweenVertical}>
        <CMList />
        <SearchBar {...props} />
      </Stack>
    </AppBar>
  );
};

export default NavBar;
