import axios from 'axios';
import { API_URL } from '../config.js';
import Cookies from 'js-cookie';

const DOCTOR_CATEGORIES_API_URL = API_URL + '/doctor-categories';
const token = Cookies.get('token');

export const addNewCategory = (categoryName) => {
    return axios.post(DOCTOR_CATEGORIES_API_URL, {categoryName}, {
        headers: {
            'x-access-token': token
        }
    });
}

export const getDoctorCategories = () => {
    return axios.get(DOCTOR_CATEGORIES_API_URL, {
        headers: {
            'x-access-token': token
        }
    });
}