// User type based on backend IUser model
export interface User {
  _id: string;
  username: string;
  email: string;
  playlists: string[]; // Array of playlist IDs
  refreshToken?: string;
}

// Context type for user context
export interface UserContextType {
  user: User | boolean;
  setUser: React.Dispatch<React.SetStateAction<User | boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// ProtectRoute props
export interface ProtectRouteProps {
  children?: React.ReactNode;
  user: User | boolean;
  redirect?: string;
}

// Playlist type based on backend IPlaylist model
export interface Playlist {
  _id: string;
  name: string;
  userId: string;
  tracks: string[] | Track[];
  trackCount?:number;
}

// Track type based on backend ITrack model
export interface Track {
  _id: string;
  title: string;
  artist: string;
  duration: number;
  audioUrl: string;
  thumbnailUrl: string;
}

export interface LoginFormData {
  userNameOrEmail: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SettingsFormData {
  file: FileList;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface MusicPlayerSliderProps {
  value: number;
  max: number;
  onChange: (event: Event, value: number | number[]) => void;
}

// For fetchMusicList response
export interface FetchMusicListResponse {
  success: boolean;
  message: string;
  musicList: Track[];
}

// For searchTrack request and response
export interface SearchTrackRequest {
  trackTitle: string;
}
export interface SearchTrackResponse {
  success: boolean;
  message: string;
  tracks: Track[];
}

// Create playlist
export interface CreatePlaylistRequest {
  playListName: string;
}
export interface CreatePlaylistResponse {
  success: boolean;
  message: string;
  playlist: Playlist;
}

// Add to playlist
export interface AddToPlaylistRequest {
  playListId?: string | null;
  playListName: string;
  trackId: string;
}
export interface AddToPlaylistResponse {
  success: boolean;
  message: string;
  playlist: Playlist;
}

// Remove from playlist
export interface RemoveFromPlaylistRequest {
  playListId: string;
  trackId: string;
}
export interface RemoveFromPlaylistResponse {
  success: boolean;
  message: string;
  playlist: Playlist;
}

// Fetch all playlists
export interface FetchAllPlaylistsResponse {
  success: boolean;
  playlists: Playlist[];
}

// Fetch playlist by ID
export interface FetchPlaylistByIdRequest {
  playListId: string;
}
export interface FetchPlaylistByIdResponse {
  success: boolean;
  playlist: Playlist;
}

// Sign up
export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignUpResponse {
  success: boolean;
  message: string;
  user: User;
}

// Login
export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
}

// Get user
export interface GetUserResponse {
  success: boolean;
  user: User;
}

export interface UpdateInfoResponse {
  success: boolean;
  message: string;
  user: User;
}

// Logout
export interface LogoutResponse {
  success: boolean;
  message: string;
}

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";