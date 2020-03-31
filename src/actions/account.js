import {requestSignIn, requestAccountData} from '../utils/user-api';
import Cookies from 'js-cookie';
import {
    addNewCategory, 
    getDoctorCategories, 
    getDoctorCategory,
    getDoctors,
    getDoctorAddressCover,
    sendDoctorInvitation,
    updateDoctorsAccount,
    requestInvitationTokenCheck,
    addNewDoctorAddressCover
} from '../utils/doctors-api';

import {
    getDoctorAppointments,
    addNewAppointment
} from '../utils/appointments-api';

import {
    getClinicAddressCover,
    addNewClinicAddress
} from '../utils/clinics-api';

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
    RESET_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTOR_CATEGORY_SUCCESS,
    LOAD_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTORS_SUCCESS,
    LOAD_DOCTORS_ERROR,
    SEND_INVITATION_SUCCESS,
    SEND_INVITATION_ERROR,
    SEND_INVITATION_ERROR_RESET,
    ACTIVATION_ACCOUNT_SUCCESS,
    ACTIVATION_ACCOUNT_ERROR,
    CHECK_INVITATION_TOKEN_SUCCESS,
    CHECK_INVITATION_TOKEN_ERROR,
    GET_CLINIC_ADDRESS_LIST_SUCCESS,
    GET_CLINIC_ADDRESS_LIST_ERROR,
    GET_DOCTOR_ADDRESS_LIST_SUCCESS,
    GET_DOCTOR_ADDRESS_LIST_ERROR,
    LOAD_DOCTOR_APPOINTMENT_SUCCESS,
    LOAD_DOCTOR_APPOINTMENT_ERROR,
    ACCOUNT_LOGOUT
} from '../constants/action-types';

export const signInPending = () => ({
    type: SIGN_IN_PENDING
});

export const signInSuccess = (accountType) => ({
    type: SIGN_IN_SUCCESS,
    payload: {
        accountType
    }
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

export const resetAddCategoryError = () => ({
    type: RESET_DOCTOR_CATEGORY_ERROR
})

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

export const getAddressListSuccess = (addressList) => ({
    type: GET_CLINIC_ADDRESS_LIST_SUCCESS,
    payload: {
        addressList
    }
});

export const getAddressListError = (error) => ({
    type: GET_CLINIC_ADDRESS_LIST_ERROR,
    payload: {
        error
    }
});

export const getDoctorAddressListSuccess = (addressList) => ({
    type: GET_DOCTOR_ADDRESS_LIST_SUCCESS,
    payload: {
        addressList
    }
});

export const getDoctorAddressListError = (error) => ({
    type: GET_DOCTOR_ADDRESS_LIST_ERROR,
    payload: {
        error
    }
});

export const resetInvitationError = () => ({
    type: SEND_INVITATION_ERROR_RESET
});

export const activateAccountSuccess = () => ({
    type: ACTIVATION_ACCOUNT_SUCCESS
});

export const activateAccountError = (error) => ({
    type: ACTIVATION_ACCOUNT_ERROR,
    payload: {
        error
    }
});

export const checkInvitationTokenSuccess = () => ({
    type: CHECK_INVITATION_TOKEN_SUCCESS
});

export const checkInvitationTokenError = (error) => ({
    type: CHECK_INVITATION_TOKEN_ERROR,
    payload: {
        error
    }
});

export const loadDoctorAppointmentsSuccess = (appointments) => ({
    type: LOAD_DOCTOR_APPOINTMENT_SUCCESS,
    payload: {
        appointments
    }
});

export const loadDoctorAppointmentsError = (error) => ({
    type: LOAD_DOCTOR_APPOINTMENT_ERROR,
    payload: {
        error
    }
});

export const logout = () => ({
    type: ACCOUNT_LOGOUT
});

export const requestUserSignIn = (accountData) => {
    return dispatch => {
        dispatch(signInPending());
        
        requestSignIn(accountData)
            .then(resp => {
                const token = resp && resp.data && resp.data.token;

                if (token) {
                    Cookies.set('token', token);
                    dispatch(signInSuccess(resp.data.accountType));
                } else {
                    dispatch(signInError('Something went wrong'));
                }
            })
            .catch(err => {
                dispatch(signInError(err.response.data));
            });
    }
}

export const loadDoctorAppointments = () => {
    return dispatch => {
        getDoctorAppointments()
            .then(resp => {
                dispatch(loadDoctorAppointmentsSuccess(resp.data));
            })
            .catch(err => {
                dispatch(loadDoctorAppointmentsError(err.response.data));
            });
    }
};

export const loadAccount = () => {
    return dispatch => {
        requestAccountData()
            .then(resp => {
                if (resp.data && resp.data.categoryName) {
                    dispatch(loadDoctorAppointments());
                } else {
                    dispatch(loadDoctorCategories());
                }
                dispatch(loadAccountSuccess(resp.data))
            })
            .catch(err => {
                dispatch(loadAccountError(err.response.data));
            });
    }
}

export const createNewDoctorCategory = (categoryName) => {
    return dispatch => {
        addNewCategory(categoryName)
            .then(() => {
                dispatch(createNewDoctorCategorySuccess());
                dispatch(loadDoctorCategories());
            })
            .catch(err => {
                dispatch(createNewDoctorCategoryError(err.response.data));
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
                dispatch(loadDoctorCategoriesError(err.response.data));
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
                dispatch(loadDoctorsError(err.response.data));
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
                dispatch(loadDoctorCategoryError(err.response.data))
            });
    }
}

export const sendInvitation = (categoryId, invitation) => {
    return dispatch => {
        sendDoctorInvitation(categoryId, invitation)
            .then(resp => {
                console.log(resp); // outputs email link
                dispatch(sendInvitationSuccess());
                dispatch(loadDoctors(categoryId));
            })
            .catch(err => {
                dispatch(sendInvitationError(err.response.data));
            });
    }
}

export const checkInvitationToken = (token) => {
    return dispatch => {
        requestInvitationTokenCheck(token)
            .then(() => {
                dispatch(checkInvitationTokenSuccess());
            })
            .catch(err => {
                dispatch(checkInvitationTokenError(err.response.data));
            });
    }
}

export const activateAccount = (token, password) => {
    return dispatch => {
        updateDoctorsAccount(token, password)
            .then(() => {
                dispatch(activateAccountSuccess());
            })
            .catch(err => {
                dispatch(activateAccountSuccess(err.response.data));
            });
    }
}

export const getAddressList = () => {
    return dispatch => {
        getClinicAddressCover()
            .then((resp) => {
                dispatch(getAddressListSuccess(resp.data));
            })
            .catch(err => {
                dispatch(getAddressListError(err.response.data));
            });
    }
}

export const getDoctorAddressList = () => {
    return dispatch => {
        getDoctorAddressCover()
            .then(resp => {
                dispatch(getDoctorAddressListSuccess(resp.data));
            })
            .catch(err => {
                dispatch(getDoctorAddressListError(err.response.data));
            });
    }
}

export const addNewAddress = (details) => {
    return dispatch => {
        addNewClinicAddress(details)
            .then(() => {
                dispatch(getAddressList());
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }
}

export const addNewDoctorAddress = (details) => {
    return dispatch => {
        addNewDoctorAddressCover(details)
            .then(() => {
                dispatch(getDoctorAddressList());
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }
}

export const createNewAppointment = (appointment) => {
    return dispatch => {
        addNewAppointment(appointment)
            .then(() => {
                dispatch(loadDoctorAppointments());
            })
            .catch(err => {
                console.log(err.response.data);
            });
    }
}

export const accountLogout = () => {
    return dispatch => {
        dispatch(logout());
        Cookies.remove('token');
    }
}