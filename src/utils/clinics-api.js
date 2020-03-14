import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../config.js';
const CLINICS_API_URL = API_URL + '/clinics';

const token = Cookies.get('token');

export const createClinic = clinic => {
    return axios.post(CLINICS_API_URL, clinic);
}

export const getClinicAddressCover = () => {
    return axios.get(API_URL + '/address-cover', {
        headers: {
            'x-access-token': token
        }
    });
}