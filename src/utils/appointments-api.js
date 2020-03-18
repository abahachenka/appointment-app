import axios from 'axios';
import { API_URL } from '../config.js';

export const searchClinicByHomeAddress = (params) => {
    const url = API_URL + '/clinics';
    return axios.get(url, {params});
}