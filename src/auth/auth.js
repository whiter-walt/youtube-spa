import axios from "axios";

const AUTH_KEY = "AIzaSyDcJ3tbq0wEX_yi9Lgq3oaHslZ1GLkQRiE";

export const logIn = axios.create({
  baseURL:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  params: {
    key: AUTH_KEY,
  },
});
