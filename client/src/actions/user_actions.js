import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEM_USER,
    ON_SUCCESS_BUY_USER,
    UPDATE_USER_INFO,
    CLEAR_UPDATE_USER_INFO
} from './types';

import { USER_SERVER,PRODUCT_SERVER } from '../components/utils/misc';


export function loginUser(dataTosubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataTosubmit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataTosubmit) {
    const request = axios.post(`${USER_SERVER}/register`, dataTosubmit)
        .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
}


export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}


export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id) {
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${id}`)
        .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {
    const request = axios.get(`${PRODUCT_SERVER}/articles_id?id=${cartItems}&type=array`)
    .then(response=>{
       
        userCart.forEach(element => {
            response.data.forEach((i,j)=>{
                if(element.id === i._id){
                    response.data[j].quantity = element.quantity;
                }
            })
        });
        return response.data;
    })
    return{
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(id){
    const request = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`)
    .then(response=>{
        response.data.cart.forEach(item=>{
            response.data.cartDetail.forEach((k,j)=>{
                if(item.id === k._id)
                {
                    response.data.cartDetail[j].quantity = item.quantity;
                }
            })
        })
        return response.data;
    })

    return{
        type: REMOVE_CART_ITEM_USER,
        payload: request
    }
}


export function onSuccessBuy(data){
    const request = axios.post(`${USER_SERVER}/successBuy`,data)
                    .then(response=> response.data);
    return{
        type: ON_SUCCESS_BUY_USER,
        payload:request
    }
}

export function updateUserInfo(dataTosubmit){
    const request = axios.post(`${USER_SERVER}/user_profile`,dataTosubmit)
                    .then(response=>response.data);
    
    return{
        type:UPDATE_USER_INFO,
        payload:request
    }
}

export function clearUpdateUserInfo(){
    return {
        type: CLEAR_UPDATE_USER_INFO,
        payload: ''
    }
}