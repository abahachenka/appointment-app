import {searchClinicByHomeAddress} from '../utils/appointments-api';
import {SEARCH_CLINIC_SUCCESS, SEARCH_CLINIC_ERROR} from '../constants/action-types';

export const searchClinicSuccess = clinics => ({
    type: 'SEARCH_CLINIC_SUCCESS',
    payload: {
        clinics
    }
});


export const searchClinicError = error => ({
    type: 'SEARCH_CLINIC_ERROR',
    payload: {
        error
    }
});

export const searchClinic = (params) => {
    return dispatch => {
        searchClinicByHomeAddress(params)
            .then(resp => {
                dispatch(searchClinicSuccess(resp.data));
            })
            .catch(err => {
                dispatch(searchClinicError(err));
            });
    }
}