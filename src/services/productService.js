const API_URL = "http://localhost:8081/v1/product";

export const getAllProducts = () => {
    return fetch(API_URL).then(response => response.json());
};
