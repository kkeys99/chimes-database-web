/*
Some utility functions that can be reused
*/

export function date2string(date: string) {
    const monthDict: any = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December",
    }

    const mdy_split = date.split("/");
    const month = mdy_split[0];
    const day = mdy_split[1];
    const year = mdy_split[2];

    return monthDict[month].concat(" ", day, ", ", year);

}