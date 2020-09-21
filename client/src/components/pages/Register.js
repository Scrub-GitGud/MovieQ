import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import { AuthContext } from '../../context/AuthContext'
import Loading from '../Loading'
import MovieQLogo from "../MovieQ.png"

const Register = (props) => {

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
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const onChange = (e) => {setUserData({...userData, [e.target.name]: e.target.value})}
    const onSubmit = (e) => {
        e.preventDefault()
        if(userData.password !== userData.password2) {
            M.toast({ html: "Password doesn't match", classes: 'red' })
        } else {
            authContext.Register(userData)
        }
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
                        <input value={userData.name} onChange={onChange} name="name" id="name" type="text" className="validate" required />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field col s12">
                        <input value={userData.email} onChange={onChange} name="email" id="email" type="email" className="validate" required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s12">
                        <input value={userData.password} onChange={onChange} name="password" id="password" type="password" className="validate" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="input-field col s12">
                        <input value={userData.password2} onChange={onChange} name="password2" id="password2" type="password" className="validate" required />
                        <label htmlFor="password2">Confirm Password</label>
                    </div>
                    <button type='submit' href="" className='btn deep-purple my1'>Sign Up</button>
                    <p>Already have an account? <Link to='/login' className='deep-purple-text txt-bold'>Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register
