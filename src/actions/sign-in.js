import {requestSignIn} from '../utils/sign-in-api';

import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_ERROR,
    SIGN_IN_RESET_ERROR
} from '../constants/action-types';

export const signInPending = () => ({
    type: SIGN_IN_PENDING
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS
});

export const signInError = error => ({
    type: SIGN_IN_ERROR,
    payload: {
        error
    }
});

export const resetSignInError = () => ({
    type: SIGN_IN_RESET_ERROR
});

export const requestUserSignIn = (userData) => {
    return dispatch => {
        dispatch(signInPending());
        
        requestSignIn(userData)
            .then(resp => {
                dispatch(signInSuccess());
            })
            .catch(err => {
                dispatch(signInError(err.message));
            });
    }
}