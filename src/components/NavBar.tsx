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
import { useTheme } from "@mui/material/styles";

const CMList = () => {
  const cms = [
    "CLL",
    "CMC",
    "EMW",
    "VZ",
    "CEL",
    "JKM",
    "SKG",
    "AK",
    "LYL",
    "KMDS",
    "GLR",
    "JLCLM",
  ];

  return (
    <Toolbar disableGutters variant="dense" sx={{ justifyContent: "center" }}>
      <Stack direction="row" spacing={6}>
        {cms.map((initials) => {
          return (
            <Typography color="primary.dark" variant="h2" fontWeight="bold">
              {initials}
            </Typography>
          );
        })}
        <Typography color="primary.dark" variant="h2" fontWeight="bold">
          {"See all CMS"}
        </Typography>
      </Stack>
    </Toolbar>
  );
};

const SearchInput = () => {
  const theme = useTheme();

  return (
    <FormControl variant="filled" size="small" sx={{ mr: 10 }}>
      <InputLabel style={{ color: theme.palette.success.dark }}>
        Search
      </InputLabel>
      <FilledInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
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

const SearchBar = () => {
  const tags = [
    "Sheet",
    "Composer",
    "Arranger",
    "Genre",
    "Key",
    "Time Signature",
    "Tempo",
    "Date added",
  ];
  return (
    <Toolbar disableGutters variant="dense" sx={{ justifyContent: "center" }}>
      <SearchInput />
      <Stack direction="row" spacing={6}>
        {tags.map((tag) => {
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

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary.contrastText", py: 3 }}>
      <Stack spacing={2}>
        <CMList />
        <SearchBar />
      </Stack>
    </AppBar>
  );
};

export default NavBar;
