import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_PENDING,
    SIGN_IN_ERROR,
    SIGN_IN_RESET_ERROR,
    ACCOUNT_LOAD_SUCCESS,
    ACCOUNT_LOAD_ERROR,
    ACCOUNT_LOGOUT
} from '../constants/action-types';

const initialState = {
    isPending: false,
    isAuthenticated: false,
    error: '',
    account: null,
    accountType: 'clinic' // 'clinic' || 'doctor'
};

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isPending: false,
                isAuthenticated: true,
                accountType: action.payload.accountType
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
                error: ''
            }
        case ACCOUNT_LOAD_SUCCESS:
            return {
                ...state,
                account: action.payload.account
            }
        case ACCOUNT_LOAD_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        case ACCOUNT_LOGOUT: {
            return {
                ...state,
                account: null
            }
        }
        default: 
           return state;
        }
};

export default signInReducer;