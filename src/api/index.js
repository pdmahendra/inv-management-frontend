export const SERVER_BASE_URL = `${
  import.meta.env.VITE_BACKEND_SERVER_URL ||
  "https://fact-1-production.up.railway.app"
}`;

export const API = {
  users: {
    //   register: `${SERVER_BASE_URL}/users/signup`,
    login: `${SERVER_BASE_URL}/auth/login`,
  },
};
