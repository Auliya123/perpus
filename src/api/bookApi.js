import axios from "axios";

const instance = axios.create({
  baseURL: "https://bits-library.herokuapp.com/api",
});

export default instance;
