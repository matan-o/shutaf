import axios from "axios";
import storage from "./storage";

const mainUrl = "http://localhost:3001"

const getHttp = (url) => {
  return axios.get(url, {
    headers: {
      authorization: storage.getItem("token"),
    },
  });
};

const putHttp = (url, data) => {
  return axios.put(url, data, {
    headers: {
      authorization: storage.getItem("token"),
    },
  });
};

const postHttp = (url, data) => {
  return axios.post(url, data, {
    headers: {
      authorization: storage.getItem("token"),
    },
  });
};

const deleteHttp = (url) => {
  return axios.delete(url,{
    headers: {
      authorization: storage.getItem("token"),
    },
  });
};

export { mainUrl, getHttp, putHttp, postHttp, deleteHttp };
