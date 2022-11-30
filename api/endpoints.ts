import axios from "axios";

export const endpoints = {
  // questions
  graphql: "/api/question/typeAhead",
  pingGraphql: async (query: any, variables?: any) => {
    try {
      const body = {
        variables,
        query,
      };
      return axios.post("http://localhost:3005/graphql", body).then((r) => {
        return r.data;
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
