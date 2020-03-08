import axios from 'axios';
import { API_URL } from '../config.js';
const SIGNIN_API_URL = API_URL + '/auth';

export const requestSignIn = userData => {
    return axios.post(SIGNIN_API_URL, userData);
}

export const requestAccountData = token => {
    return axios.post(API_URL + '/auth/account', {token}, /*{
        headers: {
            'x-access-token': token
        }
    }*/);
}