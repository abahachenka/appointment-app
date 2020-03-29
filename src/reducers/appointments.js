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

const initialState = {
    userHomeAddress: null,
    clinics: [],
    selectedClinic: null,
    doctorCategories: [],
    selectedDoctorCategory: null,
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

        case SAVE_SELECTED_CLINIC: 
            return {
                ...state,
                selectedClinic: action.payload.clinic
            }

        case SAVE_SELECTED_DOCTOR_CATEGORY: 
            return {
                ...state,
                selectedDoctorCategory: action.payload.category
            }

        case SAVE_USER_HOME_ADDRESS: 
            return {
                ...state,
                userHomeAddress: action.payload.address
            }
            
        default:
            return state;
        }
};

export default appointmentsReducer;