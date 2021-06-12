import axios from "axios";
export default axios.create({
  baseURL: "https://linkstagram-api.ga",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
