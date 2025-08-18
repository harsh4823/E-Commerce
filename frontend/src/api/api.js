import { logOutUserPlain } from "./../store/action/authAction";
import axios from "axios";

const api = axios.create(
    {
        baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
        withCredentials : true,
    }
);
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             logOutUserPlain();
//         }
//         return Promise.reject(error);
//     }
// );

export default api;