import * as React from "react";
import { useTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { ReactComponent as BellIcon } from "../assets/bell.svg";
import CornellLogo from "../assets/cornell_logo.svg";

import { Link as MuiLink } from "@mui/material";

const SiteHeader = () => {
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      color={"primary"}
      elevation={0}
      sx={{ px: 5, py: 6, zIndex: theme.zIndex.drawer + 1 }} // Keeps this visible over concert log
    >
      <Toolbar disableGutters variant="dense">
        <Box component="img" src={CornellLogo} sx={{ mr: 6 }} />
        <Typography
          component={MuiLink}
          href="/"
          color="#ffffff"
          underline="none"
          variant="h1"
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          Chimes
        </Typography>
        <Typography variant="h2" sx={{ mx: 2.5 }}>
          Dashboard
        </Typography>
        <SvgIcon inheritViewBox component={BellIcon} sx={{ mx: 2.5 }} />
        <Avatar
          sx={{
            border: 1,
            color: "primary.dark",
            bgcolor: "primary.contrastText",
            ml: 2.5,
          }}
        >
          KJC
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default SiteHeader;
