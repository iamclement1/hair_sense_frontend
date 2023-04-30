import axios from 'axios'

export const baseUrl = 'http://hairshine.pythonanywhere.com'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgyNjgyMDc1LCJpYXQiOjE2ODI2Nzg0NzUsImp0aSI6IjNiMWExZDU0M2MzYTQyMjU4MmVhOGM4NmZkMWI5ZjY2IiwidXNlcl9pZCI6NX0.0Rv8YOwARcy0nLqTGJXDCZny-aG_6xRx80hEwqsA8ww"

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