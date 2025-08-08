import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { trackEndpoints } from "./apis";
import type {
  FetchMusicListResponse,
  SearchTrackRequest,
  SearchTrackResponse,
} from "../types";

export const fetchMusicList = async (): Promise<FetchMusicListResponse | undefined> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      trackEndpoints.FETCH_MUSIC_LIST_API
    );
    toast.success(response?.data?.message, { id: toastId });
    return response.data as FetchMusicListResponse;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data?.message || error.message, { id: toastId });
  }
};

export const searchTrack = async (
  trackTitle: SearchTrackRequest["trackTitle"]
): Promise<SearchTrackResponse | undefined> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", trackEndpoints.SEARCH_API, {
      trackTitle,
    });
    toast.success(response?.data?.message, { id: toastId });
    return response.data as SearchTrackResponse;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.response?.data?.message || error.message, { id: toastId });
  }
};
