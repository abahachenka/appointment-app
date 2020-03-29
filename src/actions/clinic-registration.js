import {createClinic} from '../utils/clinics-api';
import { 
    REGISTER_CLINIC_SUCCESS,
    REGISTER_CLINIC_PENDING,
    REGISTER_CLINIC_ERROR,
    REGISTER_RESET_ERROR
} from '../constants/action-types';

export const registerClinicPending = () => ({
    type: REGISTER_CLINIC_PENDING
});

export const registerClinicSuccess = () => ({
    type: REGISTER_CLINIC_SUCCESS
});

export const registerClinicError = error => ({
    type: REGISTER_CLINIC_ERROR,
    payload: {
        error
    }
});

export const resetRegistrationError = () => ({
    type: REGISTER_RESET_ERROR
});

export const registerClinic = (clinic) => {
    return dispatch => {
        dispatch(registerClinicPending());
        
        createClinic(clinic)
            .then(() => {
                dispatch(registerClinicSuccess());
            })
            .catch(err => {
                dispatch(registerClinicError(err.response.data));
            });
    }
}