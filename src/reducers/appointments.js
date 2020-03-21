import {
    SEARCH_CLINIC_SUCCESS, 
    SEARCH_CLINIC_ERROR,
    LOAD_DOCTOR_CATEGORIES_SUCCESS,
    LOAD_DOCTOR_CATEGORIES_ERROR,
    LOAD_AVAILABLE_APPOINTMENTS_SUCCESS,
    LOAD_AVAILABLE_APPOINTMENTS_ERROR
} from '../constants/action-types';

const initialState = {
    clinics: [],
    doctorCategories: [],
    error: '',
    doctorCategoriesError: '',
    doctorAppointments: [],
    doctorAppointmentsError: ''
};

const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_CLINIC_SUCCESS: 
            return {
                ...state,
                clinics: action.payload.clinics
            }

        case SEARCH_CLINIC_ERROR:
            return {
                ...state,
                error: action.payload.error
            }

        case LOAD_DOCTOR_CATEGORIES_SUCCESS: 
            return {
                ...state,
                doctorCategories: action.payload.categories
            }

        case LOAD_DOCTOR_CATEGORIES_ERROR:
            return {
                ...state,
                error: action.payload.error
            }

        case LOAD_AVAILABLE_APPOINTMENTS_SUCCESS: 
            return {
                ...state,
                doctorAppointments: action.payload.appointments
            }

        case LOAD_AVAILABLE_APPOINTMENTS_ERROR:
            return {
                ...state,
                doctorAppointmentsError: action.payload.error
            }
        
        default:
            return state;
        }
};

export default appointmentsReducer;