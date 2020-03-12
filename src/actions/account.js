import {requestSignIn, requestAccountData} from '../utils/user-api';
import {
    addNewCategory, 
    getDoctorCategories, 
    getDoctorCategory,
    getDoctors,
    sendDoctorInvitation
} from '../utils/doctors-api';
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
    CREATE_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTOR_CATEGORY_SUCCESS,
    LOAD_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTORS_SUCCESS,
    LOAD_DOCTORS_ERROR,
    SEND_INVITATION_SUCCESS,
    SEND_INVITATION_ERROR,
    SEND_INVITATION_ERROR_RESET
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

export const loadDoctorCategorySuccess = (category) => ({
    type: LOAD_DOCTOR_CATEGORY_SUCCESS,
    payload: {
        category
    }
});

export const loadDoctorCategoryError = (error) => ({
    type: LOAD_DOCTOR_CATEGORY_ERROR,
    payload: {
        error
    }
});

export const loadDoctorsSuccess = (doctors) => ({
    type: LOAD_DOCTORS_SUCCESS,
    payload: {
        doctors
    }
});

export const loadDoctorsError = (error) => ({
    type: LOAD_DOCTORS_ERROR,
    payload: {
        error
    }
});

export const sendInvitationSuccess = () => ({
    type: SEND_INVITATION_SUCCESS
});

export const sendInvitationError = (error) => ({
    type: SEND_INVITATION_ERROR,
    payload: {
        error
    }
});

export const resetInvitationError = () => ({
    type: SEND_INVITATION_ERROR_RESET
});

export const loadAccount = () => {
    return dispatch => {
        requestAccountData()
            .then(resp => {
                dispatch(loadDoctorCategories());
                dispatch(loadAccountSuccess(resp.data))
            })
            .catch(err => {
                loadDoctorCategoriesError(err.message);
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
                dispatch(createNewDoctorCategoryError(err.message));
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
                dispatch(loadDoctorCategoriesError(err.message));
            });
    }
}

export const loadDoctors = (categoryId) => {
    return dispatch => {
        getDoctors(categoryId)
            .then(resp => {
                dispatch(loadDoctorsSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadDoctorsError(err.message));
            });
    }
}

export const loadCategory = (alias) => {
    return dispatch => {
        getDoctorCategory(alias)
            .then(resp => {
                const category = resp.data;
                dispatch(loadDoctorCategorySuccess(category));
                dispatch(loadDoctors(category._id))
            })
            .catch(err => {
                dispatch(loadDoctorCategoryError(err.message))
            });
    }
}

export const sendInvitation = (categoryId, invitation) => {
    return dispatch => {
        sendDoctorInvitation(categoryId, invitation)
            .then(resp => {
                dispatch(sendInvitationSuccess());
                dispatch(loadDoctors(categoryId));
            })
            .catch(err => {
                dispatch(sendInvitationError(err.message));
            });
    }
}