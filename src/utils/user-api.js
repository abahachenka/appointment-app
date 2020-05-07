import axios from 'axios';
import { API_URL } from '../config.js';
import Cookies from 'js-cookie';

const SIGNIN_API_URL = API_URL + '/auth';

const getAuthToken = () => {
    return Cookies.get('token');
} 

export const requestSignIn = userData => {
    return axios.post(SIGNIN_API_URL + '/login', userData);
}

export const requestAccountData = () => {
    return axios.get(SIGNIN_API_URL + '/account', {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}