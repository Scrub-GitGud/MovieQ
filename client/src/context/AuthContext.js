import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { authReducer } from './AuthReducer';
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const initialState = {
        token: localStorage.getItem('jwtToken69'),
        isAuthenticated: null,
        userData: null,
        loading: null,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    const Register = async (formData) => {
        SetLoading()
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try {
            const res = await axios.post('api/reg', formData, config)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data})
            LoadUser()
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }

    const Login = async (formData) => {
        SetLoading()
        const config = {
            headers: {'Content-Type': 'application/json'}
        }
        try {
            const res = await axios.post('api/login', formData, config)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            LoadUser()
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }

    const LoadUser = async () => {
        const config = {
            headers: {'jwt-token': localStorage.getItem('jwtToken69')}
        }
        try {
            const res = await axios.get('api/login', config)
            dispatch({type: "LOAD_USER", payload: res.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }

    

    const Logout = async () => {
        dispatch({type: "LOGOUT"})
    }
    const SetLoading = () => {
        dispatch({type: "SET_LOADING"})
    }
    const ClearError = async () => {
        dispatch({type: "CLEAR_ERROR"})
    }

    
    
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                userData: state.userData,
                loading: state.loading,
                error: state.error,
                Register,
                Login,
                Logout,
                LoadUser,
                ClearError
            }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;