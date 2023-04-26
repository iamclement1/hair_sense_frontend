import axios from 'axios'

export const baseUrl = 'https://hairsense.com.ng'

//a http request for every request like post, get, put, delete
export const httpGet = async (url) => {
   try {
      const { data } = await axios.get(`${url}`);
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