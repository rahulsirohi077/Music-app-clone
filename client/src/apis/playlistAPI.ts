import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { playlistEndpoints } from "./apis";
import type {
  CreatePlaylistRequest,
  CreatePlaylistResponse,
  AddToPlaylistRequest,
  AddToPlaylistResponse,
  RemoveFromPlaylistRequest,
  RemoveFromPlaylistResponse,
  FetchAllPlaylistsResponse,
  FetchPlaylistByIdRequest,
  FetchPlaylistByIdResponse,
} from "../types";

// Create a new playlist
export const createPlayList = async (
  playListName: CreatePlaylistRequest["playListName"]
): Promise<CreatePlaylistResponse | null> => {
  const toastId = toast.loading("Creating playlist...");
  try {
    const response = await apiconnector(
      "POST",
      playlistEndpoints.CREATE_PLAYLIST_API,
      { playListName }
    );
    toast.success(response?.data?.message, { id: toastId });
    return response.data as CreatePlaylistResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    return null;
  }
};

// Add a track to a playlist
export const addToPlaylist = async (
  params: AddToPlaylistRequest
): Promise<AddToPlaylistResponse | null> => {
  const toastId = toast.loading("Adding track to playlist...");
  try {
    const response = await apiconnector(
      "POST",
      playlistEndpoints.ADD_TO_PLAYLIST_API,
      params
    );
    toast.success(response?.data?.message, { id: toastId });
    return response.data as AddToPlaylistResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    return null;
  }
};

// Remove a track from a playlist
export const removeFromPlayList = async (
  params: RemoveFromPlaylistRequest
): Promise<RemoveFromPlaylistResponse | null> => {
  const toastId = toast.loading("Removing track from playlist...");
  try {
    const response = await apiconnector(
      "POST",
      playlistEndpoints.REMOVE_FROM_PLAYLIST_API,
      params
    );
    toast.success(response?.data?.message, { id: toastId });
    return response.data as RemoveFromPlaylistResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    return null;
  }
};

// Fetch all playlists for the user
export const fetchAllPlaylists = async (): Promise<FetchAllPlaylistsResponse | null> => {
  const toastId = toast.loading("Fetching playlists...");
  try {
    const response = await apiconnector(
      "GET",
      playlistEndpoints.FETCH_ALL_PLAYLISTS_API
    );
    toast.success("Playlists loaded", { id: toastId });
    return response.data as FetchAllPlaylistsResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    return null;
  }
};

// Fetch a particular playlist by playListId
export const fetchPlaylistById = async (
  playListId: FetchPlaylistByIdRequest["playListId"]
): Promise<FetchPlaylistByIdResponse | null> => {
  const toastId = toast.loading("Fetching playlist...");
  try {
    const response = await apiconnector(
      "POST",
      playlistEndpoints.FETCH_PLAYLIST_BY_ID_API,
      { playListId }
    );
    toast.success("Playlist loaded", { id: toastId });
    return response.data as FetchPlaylistByIdResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    return null;
  }
};
