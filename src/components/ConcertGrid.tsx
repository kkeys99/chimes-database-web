import * as React from "react";
import Grid from "@mui/material/Grid";
import ConcertCard from "./ConcertCard";
import {Concert} from "../typing/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface ConcertGridProps {
  concerts: Concert[];
}

interface ConcertGridRowProps {
  date: string;
  concert: Concert[];
}


/*****************************************************************************
 * ConcertGridRow
 * 
 * Description:
 *   A Row on the concert grid showing all the concerts of the day.
 *   Contains the Date as well as the Concert Type and ConcertCard for each concert
*****************************************************************************/
function ConcertGridRow (props: {date: string, rowConcerts: Concert[]}) {
   
  // Just a hack that I don't remember why I did. This will be removed eventually
  const concert1 = props.rowConcerts.length > 1 ? props.rowConcerts[1] : props.rowConcerts[0]

  return(
    <Box sx={{pb:'24px'}}>
      <Typography sx={{pb:"12px"}}variant="h2">
        {props.date}
      </Typography>
      <Stack direction="row" spacing="10px">
        <ConcertCard concert={props.rowConcerts[0]} />
        <ConcertCard concert={props.rowConcerts[0]} />
        <ConcertCard concert={concert1} />
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
const ConcertGrid = ({ concerts }: ConcertGridProps) => {
  
  
  return(
    <Stack>
      <ConcertGridRow date={"July 2, 2022"} rowConcerts={concerts} />
    </Stack>
  )
  
};



export default ConcertGrid;
