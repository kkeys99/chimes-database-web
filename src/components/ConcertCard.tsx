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
import { Link as MuiLink } from "@mui/material";

interface Props {
  concert: Concert;
  logEdit: Function;
}

/*****************************************************************************
 * ConcertCard
 *
 * Description:
 *   The box that has the concert performances as well as "bells adjusted" icon,
 *   edit button, and stuff.
 *****************************************************************************/
const ConcertCard = ({ concert, logEdit }: Props) => {
  const theme = useTheme();
  
  const handleEditClick: any = () => {
    console.log("Clicked Edit Button")
    logEdit(concert._id);
    return;
  }
  
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

          {/*** Bell and Edit Icons ***********************************/}
          <Stack direction="row" spacing={2} sx={{ position: "absolute", top: 12, right: 12 }} >
            <SvgIcon
              inheritViewBox
              component={BellIcon}
              sx={{ height: "20px", width: "20px",
              }}
            />
            <SvgIcon
              inheritViewBox
              component={EditIcon}
              onClick={handleEditClick}
              sx={{ 
                height: "20px", width: "20px",
                ":hover":{
                  cursor:"pointer"
                }
              }}
            />
          </Stack>

          {/*** Concert Songs List *********************************/}
          <List dense sx={{ ml: 7, listStyleType: "disc" }}>
            {concert.performances.map(performance => {
              return (
                <ListItemText sx={{ my: 0, display: "list-item" }}>
                  <MuiLink
                    display="inline"
                    variant="body2"
                    color="secondary.main"
                    href={`/song/${performance.song._id}`}
                    underline="hover"
                  >
                    {`${performance.song.sheet[0]} - ${performance.song.title}`}
                  </MuiLink>
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
