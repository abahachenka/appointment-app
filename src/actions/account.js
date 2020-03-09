import {requestSignIn, requestAccountData} from '../utils/user-api';
import {addNewCategory, getDoctorCategories} from '../utils/doctors-api';
import Cookies from 'js-cookie';

import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_ERROR,
    SIGN_IN_RESET_ERROR,
    ACCOUNT_LOAD_SUCCESS,
    ACCOUNT_LOAD_ERROR,
    DOCTOR_CATEGORIES_LOAD_SUCCESS,
    DOCTOR_CATEGORIES_LOAD_ERROR,
    CREATE_DOCTOR_CATEGORY_SUCCESS,
    CREATE_DOCTOR_CATEGORY_ERROR
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
    type: ACCOUNT_LOAD_SUCCESS,
    payload: {
        account
    }
});

export const loadAccountError = (error) => ({
    type: ACCOUNT_LOAD_ERROR,
    payload: {
        error
    }
});

export const loadDoctorCategoriesSuccess = (categories) => ({
    type: DOCTOR_CATEGORIES_LOAD_SUCCESS,
    payload: {
        categories
    }
});

export const loadDoctorCategoriesError = (error) => ({
    type: DOCTOR_CATEGORIES_LOAD_ERROR,
    payload: {
        error
    }
});

export const createNewDoctorCategorySuccess = () => ({
    type: CREATE_DOCTOR_CATEGORY_SUCCESS
});

export const createNewDoctorCategoryError = (error) => ({
    type: CREATE_DOCTOR_CATEGORY_ERROR,
    payload: {
        error
    }
});

export const loadAccount = () => {
    return dispatch => {
        requestAccountData()
            .then(resp => {
                dispatch(loadDoctorCategories());
                dispatch(loadAccountSuccess(resp.data))
            })
            .catch(err => {
                loadDoctorCategoriesError(err);
            });
    }
}

export const createNewDoctorCategory = (categoryName) => {
    return dispatch => {
        addNewCategory(categoryName)
            .then(resp => {
                dispatch(createNewDoctorCategorySuccess());
                dispatch(loadDoctorCategories());
            })
            .catch(err => {
                dispatch(createNewDoctorCategoryError(err));
            });
    }
}

export const loadDoctorCategories = () => {
    return dispatch => {
        getDoctorCategories()
            .then(resp => {
                dispatch(loadDoctorCategoriesSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadDoctorCategoriesError(err));
            });
    }
}