const api = "http://192.168.100.21:3000/activities";
const axios = require("axios");

export const CreateActivity = async (data, token) => {
  try {
    const res = await axios.post(api + "/add", data, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};

export const getActivities = async (token) => {
  try {
    const res = await axios.get(api, {
      headers: {
        token: token,
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const getProgram = async (data, token) => {
  try {
    const res = await axios.get(api + "/getprogram", {
      headers: {
        token: token,
        ...data,
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const CreateProgramItem = async (data, token) => {
  try {
    const res = await axios.post(api + "/addprogram", {
      headers: {
        token: token,
      },
      ...data,
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const CreateEducationMember = async (data, token) => {
  try {
    const res = await axios.post(api + "/addeducationmember", {
      headers: {
        token: token,
      },
      ...data,
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const GetEducationGroupes = async (data, token) => {
  try {
    const res = await axios.get(api + "/geteducation", {
      headers: {
        token: token,
        ...data,
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
