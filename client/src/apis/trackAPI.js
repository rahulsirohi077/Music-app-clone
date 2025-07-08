import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { trackEndpoints } from "./apis";

const fetchMusicList = async () => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      trackEndpoints.FETCH_MUSIC_LIST_API
    );
    console.log("response = ", response);
    toast.success(response?.data?.message, { id: toastId });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || error.message, { id: toastId });
  }
};

const searchTrack = async (trackTitle) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", trackEndpoints.SEARCH_API, {
      trackTitle,
    });
    console.log("response = ", response);
    toast.success(response?.data?.message, { id: toastId });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || error.message, { id: toastId });
  }
};

export { fetchMusicList, searchTrack };
