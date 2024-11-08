import { DBSongList2FESongList } from "./utils";

/***
 * This just creates a dictionary of structure {[sheet]: title[]}
 * It is not dynamic, not expected to change during the run of the app
 * IOW it is not a state, and no state depends on it
 * The only time it should change is if the DB itself does and we do a refresh
 * So, it's probably best kept as an export and not a Context
 * 
 * HOWEVER, I haven't been able to get this to work because
 * 1 - Typing issues when using async/await (returns Promise)
 * 2 - If we don't use async/await, we try to use the data before it's available
 *     since this requires fetch.
 ***/
function createSheetTitleMap(){ 
    //logger.log(name, "Building Sheet:Title Map", logger.logLevel.DEBUG);
    let songSheetTitleMap = {}
    fetch(`song/search?title=%`)
        .then(res => res.json())
        .then(data => {
            // Convert to Song
            const resAsSong = DBSongList2FESongList(data);
            // empty dict to build map
            let tempMap: {[sheet: string] : string[]} = {}
            resAsSong.forEach((song, index) => {
                if (song.sheet[0] in tempMap) {
                tempMap[song.sheet[0]].push(song.title);
                }
                else {
                tempMap[song.sheet[0]] = [song.title];
                }
            })
            songSheetTitleMap = tempMap;
        })
    return songSheetTitleMap;
}

// NOTE: this is unused for now, but will keep the code around for if we ever want to go this route
const songSheetTitleMap: {[sheet: string]: string[]} = createSheetTitleMap();
export default songSheetTitleMap;

