// This is where contexts are declared and exported
import { createContext } from "react";

// This context will store a sheet:title map for the concert logger to use
// It will be built using a database query at initial render and passed down to the concert logger
export const SongMapContext = createContext({});

// This context will store the list of current CMs
// We need this for the NavBar
// We can also use it in the concert logger
export const CurrentCmContext = createContext([]);
