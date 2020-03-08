import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_ERROR,
    SIGN_IN_RESET_ERROR
} from '../constants/action-types';

const initialState = {
    isPending: false,
    isAuthenticated: false,
    error: null,
    account: null
};

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isPending: false,
                isAuthenticated: true
            };

        case SIGN_IN_PENDING:
            return {
                ...state,
                isPending: true
            };

        case SIGN_IN_ERROR:
            return {
                ...state,
                isPending: false,
                error: action.payload.error
            }

        case SIGN_IN_RESET_ERROR:
            return {
                ...state,
                error: null
            }
        case 'ACCOUNT_LOAD_SUCCESS':
            return {
                ...state,
                account: action.payload.account
            }
        default: 
           return state;
        }
};

export default signInReducer;