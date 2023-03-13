import * as React from "react";
import Grid from "@mui/material/Grid";
import ConcertCard from "./ConcertCard";
import { Concert } from "../typing/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface ConcertGridProps {
  concerts: Concert[];
  logEdit: Function;
}

interface ConcertGridRowProps {
  date: string;
  rowConcerts: Concert[];
  logEdit: Function;
}

/*****************************************************************************
 * ConcertGridRow
 *
 * Description:
 *   A Row on the concert grid showing all the concerts of the day.
 *   Contains the Date as well as the Concert Type and ConcertCard for each concert
 *****************************************************************************/
function ConcertGridRow({ date, rowConcerts, logEdit }: ConcertGridRowProps) {
  // Just a hack that I don't remember why I did. This will be removed eventually
  const concert1 =
    rowConcerts.length > 1 ? rowConcerts[1] : rowConcerts[0];

  return (
    <Box sx={{ pb: "24px" }}>
      <Typography sx={{ pb: "12px" }} variant="h2">
        {date}
      </Typography>
      <Stack direction="row" spacing="10px">
        <ConcertCard concert={rowConcerts[0]} logEdit={logEdit} />
        <ConcertCard concert={rowConcerts[0]} logEdit={logEdit}/>
        <ConcertCard concert={concert1} logEdit={logEdit}/>
      </Stack>
    </Box>
  );
}

/*****************************************************************************
 * ConcertGrid
 *
 * Description:
 *   Contains the whole concert grid for that page. Well, it will eventually.
 *   For now, it just has one row.
 *****************************************************************************/
const ConcertGrid = ({ concerts, logEdit }: ConcertGridProps) => {
  return (
    <Stack>
      <ConcertGridRow date={"July 2, 2022"} rowConcerts={concerts} logEdit={logEdit} />
    </Stack>
  );
};

export default ConcertGrid;
