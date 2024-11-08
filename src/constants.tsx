/*
 * Storage Keys
 *
 * These are meant to help reduce typos in sessionStorage and localStorage calls
 * because those take in strings, and if you type in the raw string every time there
 * is no checking for it.
 */

export const sessionStorageKeys = {
  concertLog: {
    logForm: "concertLog.logForm",
    editMode: "concertLog.editMode",
    editID: "concertLog.editID",
    isOpen: "concertLog.isOpen",
  },
};

/*
 * Style Variables
 *
 * These are styling variables, like heights and stuff, so that we don't
 * have to maintain decoupled "magic numbers"
 */

export const styleVariables = {
  header: {
    height: 96,
  },
  navBar: {
    height: 128,
  },
  concertLog: {
    sheetWidth: 54,
    titleWidth: 96,
    totalWidth: 320,
  },
};

export class headerStyles {
  static paddingX = 5; // 20px
  static paddingY = 6; // 24px
  static contentHeight = 12; // 48px
  static spaceBetweenItems = 5;

  // Height doesn't have to be in the /4 format
  static totalHeight = (2 * this.paddingY + this.contentHeight) * 4;
}

export class navBarStyles {
  // Padding and spacing in pixels / 4
  static paddingTop = 6;
  static paddingBot = 3;
  static paddingX = 8;
  static spaceBetweenVertical = 6;
  static spaceBetweenCmList = 6;
  static spaceBetweenTags = 6; // Though spacing guide says 16px, I like 24 better
  static spaceAfterSearch = 10;

  // Height is in pixels
  static heightRow1 = 24;
  static heightRow2 = 48; // Not sure why but has to be this way

  static totalHeight =
    4 * (this.paddingTop + this.paddingBot + this.spaceBetweenVertical) +
    (this.heightRow1 + this.heightRow2);
}

export class concertLogStyles {
  // Padding - MUI units
  static paddingX = 3
  static paddingY = 5

  // Individual components - Pixels
  static spacing = 8;         
  static iconsWidth = 12;  // Unused - for calc only
  static sheetWidth = 52
  ;
  static titleWidth = 200; //96;
  static cmWidth = 76;

  // Calculated total width
  static totalWidth = 
    2*(4*this.paddingX) + 
    this.iconsWidth + this.spacing + 
    this.sheetWidth + this.spacing +
    this.titleWidth + this.spacing +
    this.cmWidth + this.spacing +
    this.iconsWidth + this.spacing +
    this.iconsWidth;
}

/*
 * Other (probably not needed)
 */

export const cms = [
  "SJG",
  "CLL",
  "CMC",
  "EMW",
  "VZ",
  "CEL",
  "JKM",
  "AK",
  "LYL",
  "KMDS",
  "GLR",
  "JLCLM",
];

export const cmStats = {
  chimesmasters: [
    {
      name: "SJG",
      songs: [
        {
          song: "La La Land",
          stats: {
            performed: 2,
            requested: 1,
            date: ["12/22/21", "8/2/21", "3/15/21"],
          },
        },
        {
          song: "Under The Sea",
          stats: {
            performed: 3,
            requested: 2,
            date: [],
          },
        },
      ],
    },
    {
      name: "CLL",
      songs: [
        {
          song: "La La Land",
          stats: {
            performed: 5,
            requested: 1,
            date: ["12/22/22", "12/23/22"],
          },
        },
      ],
    },
    {
      name: "CMC",
      songs: [],
    },
    {
      name: "EMW",
      songs: [
        {
          song: "La La Land",
          stats: {
            performed: 2,
            requested: 3,
            date: ["11/11/22", "1/23/22"],
          },
        },
      ],
    },
    {
      name: "VZ",
      songs: [],
    },
    {
      name: "CEL",
      songs: [],
    },
    {
      name: "JKM",
      songs: [],
    },
    {
      name: "AK",
      songs: [],
    },
    {
      name: "LYL",
      songs: [],
    },
    {
      name: "KMDS",
      songs: [],
    },
    {
      name: "GLR",
      songs: [],
    },
    {
      name: "JLCLM",
      songs: [],
    },
  ],
};
