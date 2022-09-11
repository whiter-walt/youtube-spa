import axios from "axios";

const API_KEY = "AIzaSyDyoDhkZApu_t7VGsaUpBM1kPanfpozvqo";

export const youTube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/search",
  params: {
    part: "snippet",
    key: API_KEY,
  },
});
