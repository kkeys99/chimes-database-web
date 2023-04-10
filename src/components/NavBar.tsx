import * as React from "react";
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
import { cms } from "../constants";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { Link as MuiLink } from "@mui/material";

const CMList = () => {
  return (
    <Toolbar disableGutters variant="dense" sx={{ justifyContent: "center" }}>
      <Stack direction="row" spacing={6}>
        {cms.map(initials => {
          return (
            //
            <MuiLink
              href={`/CMs/${initials}`}
              color="primary.dark"
              variant="h2"
              fontWeight="bold"
              underline="hover"
            >
              {initials}
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



const SearchInput = (props: SearchBarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <FormControl 
      variant="filled" size="small" sx={{ mr: 10 }} 
    >
      <InputLabel style={{ color: theme.palette.success.dark }}>
        Search
      </InputLabel>
      <FilledInput
        value={props.searchInput}
        onChange={props.searchInputChangeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => {
              props.makeNewSearch();
              navigate('/search');
            }} >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        disableUnderline
        sx={{ borderRadius: 3, pr: 1 }}
      />
    </FormControl>
  );
};

interface SearchBarProps extends NavBarProps {}; // Alias for better naming

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
    <Toolbar disableGutters variant="dense" sx={{ justifyContent: "center" }}>
      <SearchInput {...props}/>
      <Stack direction="row" spacing={6}>
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
        py: 3,
        mt: 24,
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Stack spacing={2}>
        <CMList />
        <SearchBar {...props} />
      </Stack>
    </AppBar>
  );
};

export default NavBar;
