import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8000/api/",
    baseURL: "/api/",
    responseType: "json",
});