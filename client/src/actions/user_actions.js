import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

import {USER_SERVER} from '../components/utils/misc';


export function loginUser(dataTosubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataTosubmit)
                        .then(response => response.data);
    return{
        type: LOGIN_USER,
        payload: request
    }
}


export function registerUser(dataTosubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataTosubmit)
                        .then(response => response.data);
    return{
        type: REGISTER_USER,
        payload: request
    }
}


