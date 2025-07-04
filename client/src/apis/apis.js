const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// User Endpoints
export const userEndpoints = {
    LOGIN_API: BASE_URL + "/user/login",
    SIGNUP_API: BASE_URL + "/user/signup",
    GETUSER_API: BASE_URL+ "/user/get-user-info",
    REFRESH_TOKENS_API: BASE_URL+ "/user/refresh",
    UPDATE_INFO_API: BASE_URL+"/user/update-info"
}