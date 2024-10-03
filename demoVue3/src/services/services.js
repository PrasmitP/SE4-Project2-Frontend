import axios from "axios";
// import Utils from "../config/utils.js"; I guess we dont need this
import AuthServices from "./authServices.js";

var baseurl = "";
if (import.meta.env.DEV) {
  baseurl = "http://localhost/course/";
} else {
  baseurl = "/course-t3/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
});

export default apiClient;