import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/SaleAppV2";
const SERVER = "http://localhost:8080";

export const endpoints = {
    "products": `${SERVER_CONTEXT}/api/products/`,
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/current-user/`,
    "register": `${SERVER_CONTEXT}/api/users/`,
    "categories": `${SERVER_CONTEXT}/api/categories/`,
    "pay": `${SERVER_CONTEXT}/api/pay/`,
    "addcomment":`${SERVER_CONTEXT}/api/comment/`,
    "details": (productId) => `${SERVER_CONTEXT}/api/products/${productId}/`,
    "comment-product": (productId) => `${SERVER_CONTEXT}/api/products/${productId}/comment/`,
}


export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization":  cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})