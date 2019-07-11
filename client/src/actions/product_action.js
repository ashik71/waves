import axios from 'axios';
import {
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    ADD_BRAND,
    GET_WOODS,
    ADD_WOOD,
    GET_PRODUCT_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT
} from './types';

import { PRODUCT_SERVER } from '../components/utils/misc';



export function getProductBySell() {
    const request = axios.get(`${PRODUCT_SERVER}/articles/?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_SELL,
        payload: request
    }
}

export function getProductByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/articles/?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data);

    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}



export function getBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/brands`)
        .then(response => response.data);

    return {
        type: GET_BRANDS,
        payload: request
    }
}


export function getWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
        .then(response => response.data);

    return {
        type: GET_WOODS,
        payload: request
    }
}

export function getProductsToShop(skip, limit, filters = [], previousState = []) {
    const data = {
        limit,
        skip,
        filters
    }
    const request = axios.post(`${PRODUCT_SERVER}/shop`, data)
        .then(response => {
            let newState = [
                ...previousState,
                ...response.data.articles
            ];
            return {
                size: response.data.size,
                articles: newState
            }
        });

    return {
        type: GET_PRODUCT_TO_SHOP,
        payload: request
    }
}

export function addProduct(dataToSubmit) {
    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct(){
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export function addBrand(dataToSubmit,previousBrands) {
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
        .then(response =>{
            let brands = [...previousBrands, response.data.brand];
            console.log(response.data);
            return{
                success: response.data.success,
                brands
            }
        });

    return {
        type: ADD_BRAND,
        payload: request
    }
}

export function addWood(dataToSubmit,previousWoods) {
    const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
        .then(response =>{
            let woods = [...previousWoods, response.data.wood];
            console.log(response.data);
            return{
                success: response.data.success,
                woods
            }
        });

    return {
        type: ADD_WOOD,
        payload: request
    }
}