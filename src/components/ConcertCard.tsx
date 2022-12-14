import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as BellIcon } from "../assets/bell.svg";
import { ReactComponent as EditIcon } from "../assets/edit.svg";
import { Note, Song, Performance, Concert } from "../typing/types";

interface Props {
  concert: Concert;
}

/*****************************************************************************
 * IconStack
 *
 * Description:
 *   The Edit and Bells Adjusted Icons that go on the top right corner of the
 *   ConcertCard
 *****************************************************************************/
const IconStack = (props: { style: React.CSSProperties }) => {
  return (
    <Stack direction="row" spacing={2} style={props.style}>
      <SvgIcon
        inheritViewBox
        component={BellIcon}
        sx={{ height: "20px", width: "20px" }}
      />
      <SvgIcon
        inheritViewBox
        component={EditIcon}
        sx={{ height: "20px", width: "20px" }}
      />
    </Stack>
  );
};

/*****************************************************************************
 * ConcertCard
 *
 * Description:
 *   The box that has the concert performances as well as "bells adjusted" icon,
 *   edit button, and stuff.
 *****************************************************************************/
const ConcertCard = ({ concert }: Props) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography sx={{ pb: "12px" }}>{concert.type}</Typography>
      <Card sx={{ bgcolor: "primary.contrastText" }}>
        <CardContent sx={{ position: "relative", p: 5 }}>
          <Typography maxWidth={300} variant="body2" fontWeight="light">
            <Typography display="inline" variant="body2">
              Private:
            </Typography>{" "}
            look at my awesome note hehehe i need to make sure this doesn't
            overlap anything that would be no bueno
          </Typography>
          <IconStack style={{ position: "absolute", top: 12, right: 12 }} />
          <List dense sx={{ ml: 7, listStyleType: "disc" }}>
            {concert.performances.map(performance => {
              return (
                <ListItemText sx={{ my: 0, display: "list-item" }}>
                  <Typography
                    display="inline"
                    variant="body2"
                    color="secondary.main"
                  >
                    {`${performance.song.sheet} - ${performance.song.title}`}
                  </Typography>
                  <Typography display="inline" variant="body2">
                    {` (${performance.performers.join(", ")})`}
                  </Typography>
                </ListItemText>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConcertCard;
