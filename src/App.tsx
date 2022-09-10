import * as React from "react";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import SiteHeader from "./components/SiteHeader";
import ConcertGrid from "./components/ConcertGrid";
import SongPage from "./components/SongPage";

const myGirl = {
  sheet: "T19",
  name: "My Girl",
  isRequest: false,
  performers: ["CLL"],
};

const sentimentalMood = {
  sheet: "Unprop",
  name: "In A Sentimental Mood / Duke Ellington",
  isRequest: false,
  performers: ["CLL"],
};

const cantTakeMyEyes = {
  sheet: "V9",
  name: "Can't Take My Eyes Off of You",
  isRequest: false,
  performers: ["CLL"],
};

const cheapThrills = {
  sheet: "DT315",
  name: "Cheap Thrills",
  isRequest: false,
  performers: ["CLL", "JKM"],
};

const mistyMountains = {
  sheet: "Prop",
  name: "Misty Mountains / Howard Shore",
  isRequest: false,
  performers: ["CLL"],
};

const cityOfStars = {
  sheet: "Unprop",
  name: 'City of Stars (from "La La Land") / Justin Hurwitz',
  isRequest: false,
  performers: ["CLL"],
};

const inTheMood = {
  sheet: "M24",
  name: "In the Mood",
  isRequest: false,
  performers: ["CLL"],
};

const whenYouWish = {
  sheet: "H3",
  name: 'When You Wish Upon a Star (from "Pinocchio")',
  isRequest: false,
  performers: ["CLL"],
};

const moonlight = {
  sheet: "B206",
  name: "Moonlight Sonata - Adagio, Op. 27, No. 2",
  isRequest: false,
  performers: ["CLL"],
};

const firstConcert = {
  type: "morning",
  date: new Date(),
  bellsAdjusted: true,
  performances: [
    myGirl,
    sentimentalMood,
    cantTakeMyEyes,
    cheapThrills,
    mistyMountains,
    cityOfStars,
    inTheMood,
    whenYouWish,
    moonlight,
  ],
  notes: [],
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteHeader />
      <NavBar />
      <SongPage />
    </ThemeProvider>
  );
};

export default App;
