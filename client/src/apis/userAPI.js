import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { userEndpoints } from "./apis";

const signUp = async (
  { username, email, password, confirmPassword },
  navigate,
  setUser
) => {
  const toastId = toast.loading("Loading...");

  try {
    // console.log("inside Signup in frontend ",{username,email,password,confirmPassword})
    const response = await apiconnector("POST", userEndpoints.SIGNUP_API, {
      username,
      email,
      password,
      confirmPassword,
    });

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

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    console.log(error);
  }
};

const login = async ({ userNameOrEmail, password }, navigate, setUser) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiconnector("POST", userEndpoints.LOGIN_API, {
      userNameOrEmail,
      password,
    });

    if (response.data.success) {
      toast.success("Login Successful", { id: toastId });
      setTimeout(() => {
        navigate("/");
        setUser(response.data.user);
      }, 5000);
    } else {
      toast.error(response.data.message, { id: toastId });
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message, {
      id: toastId,
    });
    console.log(error);
  }
};

const getUser = async (setUser,toastId) => {
  try {
    const response = await apiconnector("GET", userEndpoints.GETUSER_API);
    setUser(response?.data?.user);
    toast.dismiss(toastId);
  } catch (error) {
    toast.error(error?.response?.data?.message || error.message,{id:toastId});
    console.log(error);
  }
};

const updateInfo = async(formData) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST",userEndpoints.UPDATE_INFO_API,formData);
    console.log(response);
    toast.success(response?.data?.message,{id:toastId});
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || error.message,{id:toastId});
  }
}

export { signUp, login, getUser, updateInfo };
