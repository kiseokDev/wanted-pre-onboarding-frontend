type API_URL = {
  BASE_URL: string | undefined;
  SERVER_URL: string | undefined;
  TODO: string;
  AUTH: string;
};

const API: API_URL = {
  BASE_URL: process.env.REACT_APP_LOCAL_URL,
  SERVER_URL: process.env.REACT_APP_SERVER_URL,
  TODO: "/todos",
  AUTH: "/auth",
};

export default API;
