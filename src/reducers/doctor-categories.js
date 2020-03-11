import { 
    DOCTOR_CATEGORIES_LOAD_SUCCESS,
    DOCTOR_CATEGORIES_LOAD_ERROR,
    CREATE_DOCTOR_CATEGORY_SUCCESS,
    CREATE_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTOR_CATEGORY_SUCCESS,
    LOAD_DOCTOR_CATEGORY_ERROR,
    LOAD_DOCTORS_SUCCESS,
    LOAD_DOCTORS_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    error: '',
    categories: [],
    activeCategory: null,
    activeCategoryError: '',
    doctors: []
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
                error: action.payload.error
            };
        case LOAD_DOCTOR_CATEGORY_SUCCESS:
            return {
                ...state,
                activeCategory: action.payload.category
            };
        case LOAD_DOCTOR_CATEGORY_ERROR:
            return {
                ...state,
                activeCategoryError: payload.error
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

        default:
           return state;
        }
};

export default doctorCategoriesReducer;