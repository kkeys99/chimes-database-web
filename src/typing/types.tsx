//---------------------------------------
// Table Results
//---------------------------------------

// CM Page Playing Results
export interface SongSearchResultLite {
    available: string,
    you: number,
    sheet: string,
    song: string
};

export interface SongSearchResult {
    available: string,
    played: number,
    you: number,
    sheet: string,
    song: string,
    composer: string,
    arranger: string,
    genre: string,
    requests: number,
    keysig: string,
    timesig: string,
    tempo: string,
    added: string
};