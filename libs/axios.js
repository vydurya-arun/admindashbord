import axios from "axios";

// Public axios (for login/register)
export const axiosPublic = axios.create({
  baseURL: 'http://localhost:4010/api/',
  withCredentials: true, // very important for sending cookies
});

// Private axios (for protected routes)
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:4010/api/',
  withCredentials: true,
});
