const api = "http://192.168.100.21:3000";
const axios = require("axios");
export const getUsers = async () => {
  try {
    const res = await axios.get(api+"/users", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjczNzFkOWE0MjkzYzVmMGYxZTc1N2EiLCJuYW1lIjoiZmFyZXMgaGFybWFsaSIsInBob25lIjoiMDY2MDgxODQxMiIsImpvYiI6ImFkbWluaXN0cmF0aW9uIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1MTc2MjI2OX0.1gwCLnvMmMrOh0ru414E4iO_uq-qZ0MFRk8nZNsyRTc",
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const CreateUser = async (data) => {
  try {
    const res = await axios.post(api + "/users/add", data, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjczNzFkOWE0MjkzYzVmMGYxZTc1N2EiLCJuYW1lIjoiZmFyZXMgaGFybWFsaSIsInBob25lIjoiMDY2MDgxODQxMiIsImpvYiI6ImFkbWluaXN0cmF0aW9uIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1MTc2MjI2OX0.1gwCLnvMmMrOh0ru414E4iO_uq-qZ0MFRk8nZNsyRTc",
      },
    });
    return res.data
  } catch (e) {
    console.error("error", e);
  }
};
export const CreateDonator = async (data) => {
  try {
    const res = await axios.post(api + "/donators/add", data, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjczNzFkOWE0MjkzYzVmMGYxZTc1N2EiLCJuYW1lIjoiZmFyZXMgaGFybWFsaSIsInBob25lIjoiMDY2MDgxODQxMiIsImpvYiI6ImFkbWluaXN0cmF0aW9uIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1MTc2MjI2OX0.1gwCLnvMmMrOh0ru414E4iO_uq-qZ0MFRk8nZNsyRTc",
      },
    });
    return res.data
  } catch (e) {
    console.error("error", e);
  }
};
export const getDonators = async () => {
  try {
    const res = await axios.get(api+"/donators", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjczNzFkOWE0MjkzYzVmMGYxZTc1N2EiLCJuYW1lIjoiZmFyZXMgaGFybWFsaSIsInBob25lIjoiMDY2MDgxODQxMiIsImpvYiI6ImFkbWluaXN0cmF0aW9uIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1MTc2MjI2OX0.1gwCLnvMmMrOh0ru414E4iO_uq-qZ0MFRk8nZNsyRTc",
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};