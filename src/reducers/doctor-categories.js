import { 
    DOCTOR_CATEGORIES_LOAD_SUCCESS,
    DOCTOR_CATEGORIES_LOAD_ERROR,
    CREATE_DOCTOR_CATEGORY_SUCCESS,
    CREATE_DOCTOR_CATEGORY_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    error: '',
    categories: []
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

        default: 
           return state;
        }
};

export default doctorCategoriesReducer;