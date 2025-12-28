import axios, { type AxiosInstance } from "axios";
import config from "../config";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${config.backendUrl}/api`,
    withCredentials: true
})

export default axiosInstance;
