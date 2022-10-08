const api = "http://192.168.100.222:3000/activities";
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
    const res = await axios.post(api + "/createprogram", {
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
export const UpdateActivitys = async (data, token) => {
  try {
    const res = await axios.post(api + "/update", {
      headers: {
        token: token,
      },
      ...data,
    });
    return res.data;
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
export const deleteActivity = async (data, token) => {
  console.log("datadata",data)
  try {
    const res = await axios.post(api + "/delete", {
      headers: {
        token: token,
      },
      ...data,
    });
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};
export const DeleteProgramItem = async (data, token) => {
  try {
    const res = await axios.post(api + "/deleteprogram", {
      headers: {
        token: token,
      },
      ...data,
    });
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};