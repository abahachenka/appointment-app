import axios from 'axios';
import { API_URL } from '../config.js';
const CLINICS_API_URL = API_URL + '/clinics';

export const createClinic = clinic => {
    return axios.post(CLINICS_API_URL, clinic);
}
