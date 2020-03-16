import axios from 'axios';
import { API_URL } from '../config.js';
import Cookies from 'js-cookie';

const DOCTOR_CATEGORIES_API_URL = API_URL + '/doctor-categories';

const getAuthToken = () => {
    return Cookies.get('token');
}

export const addNewCategory = (categoryName) => {
    return axios.post(DOCTOR_CATEGORIES_API_URL, {categoryName}, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const getDoctorCategories = () => {
    return axios.get(DOCTOR_CATEGORIES_API_URL, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const getDoctorCategory = (alias) => {
    return axios.get(DOCTOR_CATEGORIES_API_URL + '/' + alias, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const getDoctors = (categoryId) => {
    const url = DOCTOR_CATEGORIES_API_URL + '/' + categoryId + '/doctors';
    
    return axios.get(url, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const sendDoctorInvitation = (categoryId, invitation) => {
    const url = DOCTOR_CATEGORIES_API_URL + '/' + categoryId + '/doctors/invite';

    return axios.post(url, invitation, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const updateDoctorsAccount = (token, password) => {
    const url = API_URL + '/auth/accept-invitation';

    return axios.put(url, {token, password});
}

export const requestInvitationTokenCheck = (token) => {
    const url = API_URL + '/auth/check-invitation-token';

    return axios.post(url, {token});
}

export const getDoctorAppointments = () => {
    return axios.get(API_URL + '/appointments', {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}

export const addNewAppointment = (appointment) => {
    return axios.post(API_URL + '/appointments', {...appointment}, {
        headers: {
            'x-access-token': getAuthToken()
        }
    });
}