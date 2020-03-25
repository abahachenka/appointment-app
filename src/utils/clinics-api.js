import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../config.js';
const CLINICS_API_URL = API_URL + '/clinics';

const getAuthToken = () => Cookies.get('token');

export const createClinic = clinic => {
    return axios.post(CLINICS_API_URL, clinic);
}

export const searchClinicByHomeAddress = (params) => {
    return axios.get(CLINICS_API_URL, {params});
}

export const getClinicAddressCover = () => {
    return axios.get(API_URL + '/clnic-address-cover', {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const addNewClinicAddress = (details) => {
    return axios.post(API_URL + '/clinic-address-cover', {...details}, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}