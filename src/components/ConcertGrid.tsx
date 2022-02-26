import * as React from "react";
import Grid from "@mui/material/Grid";
import ConcertCard, { Concert } from "./ConcertCard";

interface Props {
  concerts: Concert[];
}

const ConcertGrid = ({ concerts }: Props) => {
  return (
    <Grid container columnSpacing={3} justifyContent="center" sx={{ p: 4 }}>
      <Grid item>
        <ConcertCard concert={concerts[0]} />
      </Grid>
      <Grid item>
        <ConcertCard concert={concerts[0]} />
      </Grid>
      <Grid item>
        <ConcertCard concert={concerts[0]} />
      </Grid>
    </Grid>
  );
};

export default ConcertGrid;
