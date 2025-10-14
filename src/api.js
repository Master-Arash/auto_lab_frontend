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

let isCheckingAuth = false; // prevent multiple /me/ checks at once

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;

        // If 401 (unauthorized) and not already checking
        if (response && response.status === 403 && !isCheckingAuth) {
            isCheckingAuth = true;

            try {
                // 👇 Try to verify session with /me/
                await api.get("/me/");
                // If /me/ succeeds, user is actually still logged in → no redirect
            } catch (meError) {
                // If /me/ also fails → user is not logged in
                if (window.location.pathname !== "/login") {
                    window.location.href = "/login";
                }
            } finally {
                isCheckingAuth = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
