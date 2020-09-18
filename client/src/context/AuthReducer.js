export const authReducer = (state, action) => {
    switch(action.type){
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem('jwtToken69', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                loading: false
            }
        case "LOAD_USER":
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
                loading: false
            }
        case "ERROR":
            localStorage.removeItem('jwtToken69')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                userData: null,
                error: action.payload,
                loading: false
            }
        case "LOGOUT":
            localStorage.removeItem('jwtToken69')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                userData: null,
                loading: false
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                error: null
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}