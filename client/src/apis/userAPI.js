import { apiconnector } from "./apiconnector";
import { userEndpoints } from "./apis";
import { Navigate } from "react-router-dom";


const signUp = async ({ username, email, password, confirmPassword }) => {
    
    try {
        // console.log("inside Signup in frontend ",{username,email,password,confirmPassword})
        const response = await apiconnector("POST",userEndpoints.SIGNUP_API,{
            username,
            email,
            password,
            confirmPassword
        })


        return response.data;
    } catch (error) {
        console.log(error)
    }

}

export { signUp };