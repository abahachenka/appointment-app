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
    CANCEL_APPOINTMENT_ERROR
} from '../constants/action-types';

const initialState = {
    clinics: [],
    doctorCategories: [],
    error: '',
    doctorCategoriesError: '',
    doctorAppointments: [],
    doctorAppointmentsError: '',
    selectedAppointment: null,
    registrationCode: '',
    registrationError: '',
    cancelError: '',
    isAppointmentCancelled: false,
    categoriesWithFilters: [
        'dentist',
        'therapist',
        'gynaecologist'
    ]
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

        case SAVE_SELECTED_APPOINTMENT: 
            return {
                ...state,
                selectedAppointment: action.payload.id
            }

        case APPOINTMENT_REGISTRATION_SUCCESS: 
            return {
                ...state,
                registrationCode: action.payload.code
            }
        
        case APPOINTMENT_REGISTRATION_ERROR: 
            return {
                ...state,
                registrationError: action.payload.error
            }

        case CANCEL_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isAppointmentCancelled: true
            }

        case CANCEL_APPOINTMENT_ERROR: 
            return {
                ...state,
                isAppointmentCancelled: false,
                cancelError: action.payload.error
            }
            
        default:
            return state;
        }
};

export default appointmentsReducer;