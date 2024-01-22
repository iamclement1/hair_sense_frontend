import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ERROR_RESPONSES } from "./response";


export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


const token = Cookies.get("access_token");
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

//a http request for every request like post, get, put, delete
export const httpGet = async (url) => {
    try {
        const response = await axios.get(`${url}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const httpDelete = async (url, headers) => {
    try {
        const { data } = await axios.delete(`${url}`, headers);
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
                Authorization: `Bearer ${access_token}`,
            },
        });
        return data;
    } catch (error) {

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
export const httpPut = async (url, payload, headers) => {
    try {
        const response = await axios.put(url, payload, {
            headers: {
                ...headers,
                Authorization: `Bearer ${headers.Authorization}`,
            },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};
