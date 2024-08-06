import { localAxios as local } from "../util/http-commons";

export const createWorcation = async (data) => {
  try {
    const response = await local.post("/worcation/create", data);
    if (response.status === 200) {
      return { result: true, newWorcationData: response?.data };
    } else {
      if (response.data?.message) {
        throw new Error(response?.data?.message);
      } else {
        throw new Error(response.status);
      }
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updateWorcation = async (data, id) => {
  try {
    const response = await local.patch("/worcation/update/" + id, data);
    if (response.status === 200) {
      return { result: true, newWorcationData: response.data };
    } else {
      if (response.data?.message) {
        throw new Error(response?.data?.message);
      } else {
        throw new Error(response.status);
      }
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};
