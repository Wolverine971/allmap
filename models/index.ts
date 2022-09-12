export interface IFilterPanel extends IGeoPanel {
  type?: string;
  title?: string;
  icon?: any;
  children?: any[];
  childrenLength?: number;
}
export interface IGeoPanel {
  code?: string;
  name?: string;
  associatedGeos?: any[];
}

export const topLvlGeos: IFilterPanel[] = [
  {
    code: "1",
    name: "Nation",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "2",
    name: "Region",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "3",
    name: "Division",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "4",
    name: "State",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "5",
    name: "County",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "6",
    name: "Tract",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "7",
    name: "Block Group",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "8",
    name: "Block",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9",
    name: "Zip Code Tabulation Area (Five-Digit)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "10",
    name: "Elementary School District",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "11",
    name: "Secondary School District",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "12",
    name: "Unified School District",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "13",
    name: "Congressional District",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "15",
    name: "State Legislative District (Upper Chamber)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "16",
    name: "State Legislative District (Lower Chamber)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "17",
    name: "Public Use Microdata Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "18",
    name: "Place",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "19",
    name: "Voting District",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "20",
    name: "Traffic Analysis Zone",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "21",
    name: "County Subdivision",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "22",
    name: "Sub-Minor Civil Division",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "23",
    name: "Alaska Native Regional Corporation",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "24",
    name: "American Indian Area/Alaska Native Area/Hawaiian Home Land",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "25",
    name: "Metropolitan Statistical Area/Micropolitan Statistical Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "26",
    name: "Combined Statistical Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "27",
    name: "New England City and Town Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "28",
    name: "Urban Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "29",
    name: "Metropolitan Division",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "30",
    name: "Consolidated City",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "31",
    name: "American Indian Tribal Subdivision",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "32",
    name: "Tribal Census Tract",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "33",
    name: "Tribal Block Group",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "34",
    name: "American Indian Area (Off-Reservation Trust Land Only)/Hawaiian Home Land",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "35",
    name: "American Indian Area/Alaska Native Area (Reservation or Statistical Entity Only)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "36",
    name: "Combined New England City and Town Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "37",
    name: "Economic Census Place",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "38",
    name: "Estate",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "39",
    name: "New England City and Town Division",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "40",
    name: "Commercial Region(Planning Region)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "41",
    name: "Estimates Universe Place",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "42",
    name: "Principal City",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "43",
    name: "5-Digit Zip Code",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "44",
    name: "Equal Employment Opportunity County Set",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "45",
    name: "Place Remainder",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "46",
    name: "American Indian Tribal Subdivision/Remainder",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "48",
    name: "Estimates Universe Place Balance",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "49",
    name: "Estimates Universe County Subdivision",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9001",
    name: "MSA/CMSA",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9002",
    name: "NECMA",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9003",
    name: "PMSA",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9004",
    name: "ZCTA3",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9005",
    name: "SuperPUMA",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9006",
    name: "American Housing Survey Area",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9007",
    name: "Commodity Flow Survey Area/Remainder",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9008",
    name: "Area Outside of Metro/Micro Statistical Areas (or part)",
    associatedGeos: [],
    type: "path",
  },
  {
    code: "9009",
    name: "Urban/Rural",
    associatedGeos: [],
    type: "path",
  },
];
