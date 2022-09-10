import { types } from '../types/types';

const initialState = {
    checking: true,
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => { // Reducer recibe un state y una action


    switch ( action.type ) {
        
        case types.authLogin:               // Si la action = authLogin
            return {
                ...state,                   // spread del state
                ...action.payload,          // Sobreescribimos nuevo contenido al state con el action.payload 
                checking: false             // cheking: false
            }

        case types.authCheckingFinish:      // Si la action = authCheckingFinish
            return {
                ...state,                   // spread del state
                checking: false             // cheking: false
            }

        case types.authLogout:              // Si la action = authLogout
            return {
                checking: false             // checking: false             
            }


        default:
            return state;
    }

}


