const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// User Endpoints
export const userEndpoints = {
    LOGIN_API: BASE_URL + "/user/login",
    SIGNUP_API: BASE_URL + "/user/signup",
    GETUSER_API: BASE_URL+ "/user/get-user-info",
    REFRESH_TOKENS_API: BASE_URL+ "/user/refresh",
    UPDATE_INFO_API: BASE_URL+"/user/update-info"
}

// Track Endpoints
export const trackEndpoints = {
    FETCH_MUSIC_LIST_API: BASE_URL + "/track/fetch-music-list",
    SEARCH_API: BASE_URL + "/track/search",
    STREAM_MUSIC_API: BASE_URL+"/track/stream"
}

// PlayList Endpoints
export const playlistEndpoints = {
    CREATE_PLAYLIST_API: BASE_URL + "/playlist/create",
    ADD_TO_PLAYLIST_API: BASE_URL + "/playlist/add",
    REMOVE_FROM_PLAYLIST_API: BASE_URL + "/playlist/remove",
    FETCH_ALL_PLAYLISTS_API: BASE_URL + "/playlist/fetch-all",
    FETCH_PLAYLIST_BY_ID_API: BASE_URL + "/playlist/fetch",
}