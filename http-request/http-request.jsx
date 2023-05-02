import axios from 'axios'
import Cookies from 'js-cookie';

export const baseUrl = 'http://hairshine.pythonanywhere.com'

console.log("Base Ur === ", baseUrl);

// const accessToken = Cookies.get(access_token)

//a http request for every request like post, get, put, delete
export const httpGet = async (url) => {
   try {
      const { data } = await axios.get(`${url}`, {
         headers : {
            Authorization: `Bearer ${token}`
         }
      });
      return data;
   } catch (error) {
      return error;
   }
};


export const httpDelete = async (url) => {
   try {
      const { data } = await axios.delete(`${url}`);
      return data;
   } catch (error) {
      return error;
   }
};


export const httpPost = async (url, postBody) => {
   try {
      const { data } = await axios.post(url, postBody);
      return data;
   } catch (error) {
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