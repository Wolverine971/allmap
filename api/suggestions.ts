import api from "axios";

const server = "https://data.census.gov";

export const censusTypeahead = async (text: any) => {
  return api
    .post("/api/typeahead", {
      request: {
        text,
      },
    })
    .then(formatResponse);
};

export const getGeoTypeAhead = async (text: any) => {
  return api
    .post(server + "/api/typeahead", {
      request: {
        text: text,
        type: "geo",
        geoIds: [],
        topics: [],
        naicsCodes: [],
        program: "",
        dataset: "",
        vintage: "",
        summaryLevels: [],
        selectedSummaryLevel: "",
        from: 0,
        size: 100,
      },
    })
    .then(formatResponse);
};

export const getGeoTypeAheadSummaryLevelWithin = async (
  selectedSummaryLevel: any,
  summaryLevels: any,
  withins: any,
  from: any,
  size: any
) => {
  return api
    .post(server + "/api/typeahead", {
      request: {
        type: "geo",
        text: "",
        geoIds: [],
        topics: [],
        naicsCodes: [],
        program: "",
        dataset: "",
        vintage: "",
        from: from,
        size: size,
        selectedSummaryLevel: selectedSummaryLevel,
        summaryLevels: summaryLevels,
        withins: withins,
      },
    })
    .then(formatResponse);
};

export const bingLocation = (text: string) => {
  return api
    .get(
      "http://dev.virtualearth.net/REST/v1/Autosuggest?query=" +
        text +
        "&maxResults=10&key=" +
        process.env.BING_KEY
    ) // process.env.BING_KEY

    .then(formatResponse);
};

export const geoCodeSearch = (address: string) => {
  // specify &region=es&
  /// ///////////////////////////////////////////////////here//////////////////////////////////
  fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "/" +
      process.env.GOOGLE_KEY
  )
    /// /////////////////////////////////////////////do the thangs/////////////////////////////
    // 'https://api.publicapis.org/entries')
    // can return viewport size
    // "viewport" : {
    //    "northeast" : {
    //       "lat" : 50.8601041,
    //       "lng" : 0.5957329
    //    },
    //    "southwest" : {
    //       "lat" : 50.8559061,
    //       "lng" : 0.5906163
    //    }
    // }
    .then((res) => res.json())
    .then((res) => {
      const { count, entries } = res;
      return { count, entries };
    });
};

/**
 * some responses come back using an response object, this function peels that away
 * @param rsp is the raw data response
 * @returns {*} the response data
 */
export const formatResponse = (rsp: { data?: any; }) => {
  // {data: {response: any}} <- could be
  if (!rsp) {
    throw new Error("No Response");
  }

  if (!Object.keys(rsp)) {
    throw new Error("The data is not yet available.");
  }

  if (rsp.data === "Unauthorized Request") {
    throw new Error("Unauthorized Request");
  }

  return (rsp.data && rsp.data.response) || rsp.data || rsp;
};
