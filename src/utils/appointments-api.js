import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../config.js';

const getAuthToken = () => {
    return Cookies.get('token');
} 

export const getDoctorAppointments = (categoryId) => {
    let options = {
        headers: {
            'x-access-token': getAuthToken()
        }
    };

    if (categoryId) {
        options.params = {
            categoryId
        };
    }

    return axios.get(API_URL + '/appointments', options);
}

export const addNewAppointment = (appointment) => {
    return axios.post(API_URL + '/appointments', {...appointment}, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}