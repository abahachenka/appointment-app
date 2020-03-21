import Cookies from 'js-cookie';

import {getDoctorAppointments} from '../utils/appointments-api';
import {searchClinicByHomeAddress} from '../utils/clinics-api';
import {getDoctorCategories} from '../utils/doctors-api';

import {
    SEARCH_CLINIC_SUCCESS, 
    SEARCH_CLINIC_ERROR,
    LOAD_DOCTOR_CATEGORIES_SUCCESS,
    LOAD_DOCTOR_CATEGORIES_ERROR,
    LOAD_AVAILABLE_APPOINTMENTS_SUCCESS,
    LOAD_AVAILABLE_APPOINTMENTS_ERROR
} from '../constants/action-types';

export const searchClinicSuccess = clinics => ({
    type: SEARCH_CLINIC_SUCCESS,
    payload: {
        clinics
    }
});

export const searchClinicError = error => ({
    type: SEARCH_CLINIC_ERROR,
    payload: {
        error
    }
});

export const loadDoctorCategoriesSuccess = categories => ({
    type: LOAD_DOCTOR_CATEGORIES_SUCCESS,
    payload: {
        categories
    }
});

export const loadDoctorCategoriesError = error => ({
    type: LOAD_DOCTOR_CATEGORIES_ERROR,
    payload: {
        error
    }
});

export const loadAppointmentsSuccess = appointments => ({
    type: LOAD_AVAILABLE_APPOINTMENTS_SUCCESS,
    payload: {
        appointments
    }
});

export const loadAppointmentsError = err => ({
    type: LOAD_AVAILABLE_APPOINTMENTS_ERROR,
    payload: {
        err
    }
});

export const saveUserHomeAddress = address => {
    Cookies.set('userAddress', address.place + ',' + address.street + ',' + address.building);
};

export const searchClinic = (params) => {
    return dispatch => {
        saveUserHomeAddress(params);
        searchClinicByHomeAddress(params)
            .then(resp => {
                dispatch(searchClinicSuccess(resp.data));
            })
            .catch(err => {
                dispatch(searchClinicError(err));
            });
    }
}

export const loadDoctorCategories = () => {
    return dispatch => {
        const clinicId = Cookies.get('newAppointmentClinicId');

        getDoctorCategories(clinicId)
            .then(resp => {
                dispatch(loadDoctorCategoriesSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadDoctorCategoriesError(err));
            });
    }
}

export const saveClinic = (clinicId) => {
    return dispatch => {
        Cookies.set('newAppointmentClinicId', clinicId);
    }
}

export const saveDoctorCategory = (categoryId) => {
    return dispatch => {
        Cookies.set('newAppointmentCategoryId', categoryId);
    }
}

export const loadAppointments = () => {
    return dispatch => {
        const categoryId = Cookies.get('newAppointmentCategoryId');
        getDoctorAppointments(categoryId)
            .then(resp => {
                dispatch(loadAppointmentsSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadAppointmentsError(err));
            });
    }
}