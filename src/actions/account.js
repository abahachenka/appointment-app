import {requestSignIn, requestAccountData} from '../utils/user-api';
import {addNewCategory} from '../utils/doctors-api';

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

export const requestUserSignIn = (accountData) => {
    return dispatch => {
        dispatch(signInPending());
        
        requestSignIn(accountData)
            .then(resp => {
                const token = resp && resp.data && resp.data.token;

                if (token) {
                    Cookies.set('token', token);
                    dispatch(signInSuccess());
                } else {
                    dispatch(signInError('Something went wrong'));
                }
            })
            .catch(err => {
                dispatch(signInError(err.message));
            });
    }
}

export const loadAccountSuccess = (account) => ({
    type: 'ACCOUNT_LOAD_SUCCESS',
    payload: {
        account
    }
})

export const loadAccount = () => {
    return dispatch => {
        requestAccountData()
            .then(resp => {
                dispatch(loadAccountSuccess(resp.data))
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export const createNewDoctorCategory = (categoryName) => {
    return dispatch => {
        addNewCategory(categoryName)
            .then(resp => {
                console.log(resp);
                // dispatch()
            })
            .catch(err => {
                console.log(err);
            });
    }
}