import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import { AuthContext } from '../../context/AuthContext'
import Loading from '../Loading'
import MovieQLogo from "../MovieQ.png"

const Login = (props) => {

    const authContext = useContext(AuthContext)
    const { error, isAuthenticated, loading } = authContext

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/')
        }
        if(error !== null) {
            M.toast({ html: error , classes: 'red' })
            authContext.ClearError()
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}
    const onSubmit = (e) => {
        e.preventDefault()
        authContext.Login(userData)
    }

    if(loading) {
        return <Loading />
    }
    
    return (
        <div className="not-authorized-div">
            <div className="MovieQLogo2" >
                <img src={MovieQLogo} alt="MovieQLogo"/>
            </div>
            <div className="formDiv">
                <form onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input value={userData.email} onChange={onChange} name="email" id="email" type="email" className="validate" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input value={userData.password} onChange={onChange} name="password" id="password" type="password" className="validate" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button type='submit' href="" className='btn deep-purple my1'>Sign In</button>
                    <p>Dont have an account <Link to='/reg' className='deep-purple-text txt-bold'>Join Now</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login
