import API from "../api/api";

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);
export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);
export const me = () => API.get("/auth/me");
