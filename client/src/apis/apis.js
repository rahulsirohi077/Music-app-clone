const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// User Endpoints
export const userEndpoints = {
    LOGIN_API: BASE_URL + "/user/login",
    SIGNUP_API: BASE_URL + "/user/signup",
    GETUSER_API: BASE_URL+ "/user/get-user-info"
}