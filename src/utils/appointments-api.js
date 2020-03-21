import axios from 'axios';
import Cookies from 'js-cookie';
import { API_URL } from '../config.js';

const APPOINTMENTS_URL = API_URL + '/appointments';

const getAuthToken = () => Cookies.get('token');

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

    return axios.get(APPOINTMENTS_URL, options);
}

export const addNewAppointment = (appointment) => {
    return axios.post(APPOINTMENTS_URL, {...appointment}, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const registerAppointment = (patient, appointment) => {
    return axios.put(APPOINTMENTS_URL + '/' + appointment._id, {...patient});
}