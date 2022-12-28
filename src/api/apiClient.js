import axios from "axios";
import { stringify, parse } from "query-string";
const getToken = () => localStorage.getItem("access_token");
const baseURL = "https://admin-ir6z.onrender.com";

const axiosClient = axios.create({
    baseURL,
    // paramsSerializer: (params) => queryString.stringify(params),
    paramsSerializer: {
        encode: parse,
        serialize: stringify,
    },
});
axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        if (!err.response) {
            return alert(err);
        }
        throw err.response;
    }
);

export default axiosClient;
