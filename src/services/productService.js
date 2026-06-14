const API_URL = "http://3.215.115.127:8081/v1/product";

export const getAllProducts = () => {
    return fetch(API_URL).then(response => response.json());
};
