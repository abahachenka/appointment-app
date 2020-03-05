import axios from 'axios';
import { API_URL } from '../config.js';
const SIGNIN_API_URL = API_URL + '/signin';

export const requestSignIn = userData => {
    return axios.post(SIGNIN_API_URL, userData);
}
