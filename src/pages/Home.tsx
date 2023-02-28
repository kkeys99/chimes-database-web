import * as React from "react";
import theme from "../theme";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ConcertGrid from "../components/ConcertGrid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Concert } from "../typing/types";

import ConcertLogger from "../components/ConcertLogger";
import { Button } from "@mui/material";

function Home() {
  const [data, setData] = useState({ concerts: [] });

  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  console.log(data);

  let bodyComponent;
  if (data.concerts.length > 0) {
    bodyComponent = <ConcertGrid concerts={data.concerts} />;
  } else {
    bodyComponent = <></>;
  }
  return (
    <Box sx={{ ml: "280px", mr: "24px", pl: "24px", pt: "12px", pb: "12px" }}>
      {bodyComponent}
    </Box>
  );
}

export default Home;
