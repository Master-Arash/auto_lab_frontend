import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.defaults.xsrfCookieName = "csrftoken";
api.defaults.xsrfHeaderName = "X-CSRFToken";

let isCheckingAuth = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 403 && !isCheckingAuth) {
      isCheckingAuth = true;

      try {
        await api.get("/me/");
      } catch {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } finally {
        isCheckingAuth = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
