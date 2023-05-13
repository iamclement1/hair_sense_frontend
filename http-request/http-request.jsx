import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ERROR_RESPONSES } from "./response";


export const baseUrl = "https://hairshine.pythonanywhere.com";

// console.log("Base Ur === ", baseUrl);

// const accessToken = Cookies.get(access_token)

//a http request for every request like post, get, put, delete
export const httpGet = async (url) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log('Resource not found');
        } else {
            console.log('Error occurred:', error.message);
        }
        return null;
    }
};


// export const httpGet = async (url) => {
//     const access_token = Cookies.get("access_token");
//     const refresh_token = Cookies.get("refresh_token");
//     const headers = {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//         mode: "no-cors",
//     };
//     try {
//         const { data } = await axios.get(`${url}`, {
//             headers: headers,
//         });
//         return data;
//     } catch (error) {
//         // Check if the error is due to an invalid access token
//         if (
//             error.response && error.response.status === 401 &&
//             error.response.data.code === "token_not_valid"
//         ) {
//             // Request a new access token using the refresh token
//             const refresh_headers = {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             };
//             const refresh_data = {
//                 refresh: refresh_token,
//             };
//             const refresh_response = await axios.get(`${url}`, refresh_data, {
//                 headers: refresh_headers,
//             });

//             // Update the cookies with the new tokens
//             const { access } = refresh_response.data;
//             Cookies.set("access_token", access);
//             headers.Authorization = `Bearer ${access}`;

//             // Retry the original request with the new access token
//             const retry_response = await axios.get(`${url}`, {
//                 headers: headers,
//             });
//             return retry_response.data;
//         } else {
//             // Rethrow the error if it's not due to an invalid access token
//             throw error;
//         }
//     }
// };

export const httpDelete = async (url) => {
    try {
        const { data } = await axios.delete(`${url}`);
        return data;
    } catch (error) {
        return error;
    }
};

export const httpPost = async (url, postBody) => {
    const access_token = Cookies.get("access_token");
    try {
        const { data } = await axios.post(url, postBody, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return data;
    } catch (error) {
        console.log("hello dude, error is here", error);
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    toast.error(ERROR_RESPONSES.UNAUTHORIZED);
                    break;
                case 422:
                    toast.error(ERROR_RESPONSES.UNPROCESSABLE_ENTITY);
                    break;
                case 500:
                    toast.error(ERROR_RESPONSES.INTERNAL_SERVER_ERROR);
                    break;
                case 404:
                    toast.error(ERROR_RESPONSES.RESOURCE_NOT_FOUND);
                    // console.log("user with the credentials not found")
                    break;
                case 400:
                    toast.error(ERROR_RESPONSES.BAD_REQUEST);
                    break;
                default:
                    toast.error(ERROR_RESPONSES.GENERIC_ERROR);
            }
        } else {
            toast.error(ERROR_RESPONSES.GENERIC_ERROR);
        }
        return error;
    }
};

export const httpPut = async (url) => {
    try {
        const { data } = await axios.put(url);
        return data;
    } catch (error) {
        return error;
    }
};
