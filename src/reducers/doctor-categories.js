import { 
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
    CHECK_INVITATION_TOKEN_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    error: '',
    categories: [],
    activeCategory: null,
    activeCategoryError: '',
    doctors: [],
    isInvitationSent: false,
    invitationError: '',
    isInvitationAccepted: false,
    acceptInvitationError: '',
    isInvitationTokenValid: true,
    invitationTokenError: '',
    addCategoryError: ''
};

const doctorCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOCTOR_CATEGORIES_LOAD_SUCCESS:
            return {
                ...state,
                error: '',
                categories: action.payload.categories
            };

        case DOCTOR_CATEGORIES_LOAD_ERROR:
            return {
                ...state,
                error: action.payload.error
            };

        case CREATE_DOCTOR_CATEGORY_SUCCESS:
            return state;

        case CREATE_DOCTOR_CATEGORY_ERROR:
            return {
                ...state,
                addCategoryError: action.payload.error
            };

        case RESET_DOCTOR_CATEGORY_ERROR:
            return {
                ...state,
                addCategoryError: ''
            };

        case LOAD_DOCTOR_CATEGORY_SUCCESS:
            return {
                ...state,
                activeCategory: action.payload.category
            };
        case LOAD_DOCTOR_CATEGORY_ERROR:
            return {
                ...state,
                activeCategoryError: action.payload.error
            };
        case  LOAD_DOCTORS_SUCCESS:
            return {
                ...state,
                doctors: action.payload.doctors
            };
        case LOAD_DOCTORS_ERROR:
            return {
                ...state,
                error: action.payload.error
            }
        case  SEND_INVITATION_SUCCESS:
            return {
                ...state,
                isInvitationSent: true
            }
        case  SEND_INVITATION_ERROR:
            return {
                ...state,
                invitationError: action.payload.error
            }

        case SEND_INVITATION_ERROR_RESET:
            return {
                ...state,
                invitationError: ''
            }
        case ACTIVATION_ACCOUNT_SUCCESS:
            return {
                ...state,
                isInvitationAccepted: true
            }
        case ACTIVATION_ACCOUNT_ERROR:
            return {
                ...state,
                acceptInvitationError: action.payload.error
            }

        case CHECK_INVITATION_TOKEN_SUCCESS: 
            return {
                ...state,
                isInvitationTokenValid: true
            }

        case CHECK_INVITATION_TOKEN_ERROR: 
            return {
                ...state,
                isInvitationTokenValid: false,
                error: action.payload.error
            }

        default:
           return state;
        }
};

export default doctorCategoriesReducer;