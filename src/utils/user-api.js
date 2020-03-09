import axios from 'axios';
import { API_URL } from '../config.js';
import Cookies from 'js-cookie';

const SIGNIN_API_URL = API_URL + '/auth';
const token = Cookies.get('token');


export const requestSignIn = userData => {
    return axios.post(SIGNIN_API_URL, userData);
}

export const requestAccountData = () => {
    return axios.post(SIGNIN_API_URL + '/account', {token}, /*{
        headers: {
            'x-access-token': token
        }
    }*/);
}