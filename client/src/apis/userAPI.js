import toast from "react-hot-toast";
import { apiconnector } from "./apiconnector";
import { userEndpoints } from "./apis";


const signUp = async ({ username, email, password, confirmPassword }) => {
    const toastId = toast.loading("Loading...")
    try {
        console.log("inside Signup in frontend ",{username,email,password,confirmPassword})
        const response = await apiconnector("POST",userEndpoints.SIGNUP_API,{
            username,
            email,
            password,
            confirmPassword
        })

        console.log("SIGN UP response ",response);
        toast.success("signUp")
    } catch (error) {
        console.log(error)
        toast.error(error.message, {
            id: toastId
        })
    }
}

export { signUp };