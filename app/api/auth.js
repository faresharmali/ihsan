const api = "http://192.168.100.21:3000/auth/login";
const axios = require("axios");
export const LogUser = async (data) => {
  try {
    const res = await axios.post(api, data);
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};
