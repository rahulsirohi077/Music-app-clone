import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { userEndpoints } from "./apis";
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  GetUserResponse,
  UpdateInfoResponse,
  LogoutResponse,
  User,
} from "../types";

export const signUp = async (
  params: SignUpRequest,
  navigate: (path: string) => void,
  setUser: (user: User) => void
): Promise<SignUpResponse | undefined> => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiconnector("POST", userEndpoints.SIGNUP_API, params);

    if (response.data.success) {
      toast.success("SignUp Successful", { id: toastId });
      setTimeout(() => {
        navigate("/");
        setUser(response.data.user);
      }, 5000);
    } else {
      toast.error(response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    }

    return response.data as SignUpResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    console.log(error);
  }
};

export const login = async (
  params: LoginRequest,
  navigate: (path: string) => void,
  setUser: (user: User) => void
): Promise<LoginResponse | undefined> => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiconnector("POST", userEndpoints.LOGIN_API, params);

    if (response.data.success) {
      toast.success("Login Successful", { id: toastId });
      setTimeout(() => {
        navigate("/");
        setUser(response.data.user);
      }, 5000);
    } else {
      toast.error(response.data.message, { id: toastId });
    }
    return response.data as LoginResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    console.log(error);
  }
};

export const getUser = async (
  setUser: (user: User) => void,
  toastId?: string
): Promise<GetUserResponse | undefined> => {
  try {
    const response = await apiconnector("GET", userEndpoints.GETUSER_API);
    setUser(response?.data?.user);
    toast.dismiss(toastId);
    return response?.data as GetUserResponse;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || error.message, { id: toastId });
    console.log(error);
  }
};

export const updateInfo = async (
  formData: FormData
): Promise<UpdateInfoResponse | undefined> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("POST", userEndpoints.UPDATE_INFO_API, formData);
    toast.success(response?.data?.message, { id: toastId });
    return response?.data as UpdateInfoResponse;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data?.message || error.message, { id: toastId });
  }
};

export const logout = async (): Promise<LogoutResponse | undefined> => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector("GET", userEndpoints.LOGOUT_API);
    toast.success(response?.data?.message, { id: toastId });
    return response?.data as LogoutResponse;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.data?.message || error.message, { id: toastId });
  }
};
