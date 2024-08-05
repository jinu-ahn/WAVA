import { localAxios as local } from "../util/http-commons";

export const createWorcation = async (data) => {
  try {
    const response = await local.post("/worcation/create");
    if (response.status === 201) {
      return true;
    } else {
      if (response.data?.message) {
        throw new Error(response?.data?.message);
      } else {
        throw new Error(response.status);
      }
    }
  } catch (e) {
    return e;
  }
};
