const api = "http://192.168.100.21:3000";
const axios = require("axios");
export const getTransactions = async () => {
  try {
    const res = await axios.get(api + "/transactions", {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk4ZDM2NDY5NjgyMDlmOTYyNTYwYjgiLCJpZCI6IjEiLCJuYW1lIjoi2YHYp9ix2LMg2K3YsdmF2KfZhNmKIiwicGhvbmUiOiIwNjYwODE4NDEyIiwiam9iIjoi2YLYs9mFINin2YTYp9iv2KfYsdipIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1NDE4MzEyNn0.jyO0Z85ngqNqnUAXqCLfYptd4w0y_TlTnGXoO-npH7M",
      },
    });
    return res;
  } catch (e) {
    console.error("error", e);
  }
};
export const CreateTransaction = async (data) => {
  try {
    const res = await axios.post(api + "/transactions/add", data, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk4ZDM2NDY5NjgyMDlmOTYyNTYwYjgiLCJpZCI6IjEiLCJuYW1lIjoi2YHYp9ix2LMg2K3YsdmF2KfZhNmKIiwicGhvbmUiOiIwNjYwODE4NDEyIiwiam9iIjoi2YLYs9mFINin2YTYp9iv2KfYsdipIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1NDE4MzEyNn0.jyO0Z85ngqNqnUAXqCLfYptd4w0y_TlTnGXoO-npH7M",
      },
    });
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};
export const UpdateTransaction = async (data) => {
  try {
    const res = await axios.post(api + "/transactions/update", data, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjk4ZDM2NDY5NjgyMDlmOTYyNTYwYjgiLCJpZCI6IjEiLCJuYW1lIjoi2YHYp9ix2LMg2K3YsdmF2KfZhNmKIiwicGhvbmUiOiIwNjYwODE4NDEyIiwiam9iIjoi2YLYs9mFINin2YTYp9iv2KfYsdipIiwidXNlcm5hbWUiOiJmYXJlczA4MTk5OCIsInBhc3N3b3JkIjoiZmFyZXMwODE5OTgiLCJfX3YiOjAsImlhdCI6MTY1NDE4MzEyNn0.jyO0Z85ngqNqnUAXqCLfYptd4w0y_TlTnGXoO-npH7M",
      },
    });
    return res.data;
  } catch (e) {
    console.error("error", e);
  }
};
