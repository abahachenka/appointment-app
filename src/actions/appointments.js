import {
    getDoctorAppointments, 
    registerAppointment,
    requestCancelAppointment
} from '../utils/appointments-api';
import {searchClinicByHomeAddress} from '../utils/clinics-api';
import {getDoctorCategories} from '../utils/doctors-api';

import {
    SEARCH_CLINIC_SUCCESS, 
    SEARCH_CLINIC_ERROR,
    LOAD_DOCTOR_CATEGORIES_SUCCESS,
    LOAD_DOCTOR_CATEGORIES_ERROR,
    LOAD_AVAILABLE_APPOINTMENTS_SUCCESS,
    LOAD_AVAILABLE_APPOINTMENTS_ERROR,
    SAVE_SELECTED_APPOINTMENT,
    APPOINTMENT_REGISTRATION_SUCCESS,
    APPOINTMENT_REGISTRATION_ERROR,
    CANCEL_APPOINTMENT_SUCCESS,
    CANCEL_APPOINTMENT_ERROR,
    SAVE_SELECTED_CLINIC,
    SAVE_SELECTED_DOCTOR_CATEGORY,
    SAVE_USER_HOME_ADDRESS
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

export const saveAppointment = id => ({
    type: SAVE_SELECTED_APPOINTMENT,
    payload: {
        id
    }
});

export const registrationSuccess = code => ({
    type: APPOINTMENT_REGISTRATION_SUCCESS,
    payload: {
        code
    }
});

export const registrationError = error => ({
    type: APPOINTMENT_REGISTRATION_ERROR,
    payload: {
        error
    }
});

export const cancelAppointmentSuccess = () => ({
    type: CANCEL_APPOINTMENT_SUCCESS
});

export const cancelAppointmentError = error => ({
    type: CANCEL_APPOINTMENT_ERROR,
    payload: {
        error
    }
});

export const saveSelectedClinic = clinic => ({
    type: SAVE_SELECTED_CLINIC,
    payload: {
        clinic
    }
});

export const saveSelectedDoctorCategory = category => ({
    type: SAVE_SELECTED_DOCTOR_CATEGORY,
    payload: {
        category
    }
});

export const saveUserHomeAddress = address => ({
    type: SAVE_USER_HOME_ADDRESS,
    payload: {
        address
    }
});

export const searchClinic = params => {
    return dispatch => {
        dispatch(saveUserHomeAddress(params));

        searchClinicByHomeAddress(params)
            .then(resp => {
                dispatch(searchClinicSuccess(resp.data));
            })
            .catch(err => {
                dispatch(searchClinicError(err.response && err.response.data));
            });
    }
}

export const loadDoctorCategories = clinicId => {
    return dispatch => {
        getDoctorCategories(clinicId)
            .then(resp => {
                dispatch(loadDoctorCategoriesSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadDoctorCategoriesError(err.response && err.response.data));
            });
    }
}

export const saveClinic = clinic => {
    return dispatch => {
        dispatch(saveSelectedClinic(clinic));
    }
}

export const saveDoctorCategory = (category) => {
    return dispatch => {
        dispatch(saveSelectedDoctorCategory(category))
    }
}

export const loadAppointments = (categoryId, filter) => {
    return dispatch => {
        let address = '';

        if (filter) {
            address = `${filter.address.place},${filter.address.street},${filter.address.building}`;
            console.log(address);
        }

        getDoctorAppointments(categoryId, address)
            .then(resp => {
                dispatch(loadAppointmentsSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadAppointmentsError(err.response && err.response.data));
            });
    }
}

export const completeRegistration = (patient, appointment) => {
    return dispatch => {
        registerAppointment(patient, appointment)
            .then(resp => {
                dispatch(registrationSuccess(resp.data.orderNumber));
            })
            .catch(err => {
                dispatch(registrationError(err.response && err.response.data));
            });
    }
}

export const cancelAppointment = orderNumber => {
    return dispatch => {
        requestCancelAppointment(orderNumber)
            .then(() => {
                dispatch(cancelAppointmentSuccess());
            })
            .catch(err => {
                dispatch(cancelAppointmentError(err.response && err.response.data));
            });
    }
}

