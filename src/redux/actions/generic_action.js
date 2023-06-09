import { parseAPIReponse } from "./response_parser";
import  { default as axios } from "axios";

export const callBackendAPI =
  (url, method, data, type, classIns) => (dispatch) => {
    var payLoad = {};
    var headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };
    if (method === "GET" || method === "HEAD") {
      payLoad = {
        headers: headers,
        method: method,
      };
    } else {
      payLoad = {
        headers: headers,
        method: method,
        body: JSON.stringify(data),
      };
    }

    fetch(url, payLoad)
      .then((res) => res.json())
      .then((res) => {
        dispatch(parseAPIReponse(type, res, classIns));
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };


  export const callMultiPartAPI = (url, formData, type) => (dispatch) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      },
    };
  
    return axios.post(url, formData, config)
      .then((res) => {
        dispatch(parseAPIReponse(type, res.data));
      })
      .catch(function () {
      });
  };
