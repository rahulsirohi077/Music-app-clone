import axios from "axios"

const axiosInstance = axios.create({
    withCredentials: true,
});

export const apiconnector = (method,url,bodyData,headers,params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData:null,
        headers: headers ? headers:null,
        params: params? params:null,
    })
}