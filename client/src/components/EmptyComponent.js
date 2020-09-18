import React, {Fragment, useContext, useEffect} from 'react'
import { AuthContext } from '../context/AuthContext'

const EmptyComponent = () => {

    const authContext = useContext(AuthContext)
    const { token, LoadUser } = authContext

    useEffect(() => {
        if(token != null){
            LoadUser()
        }
        //eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            
        </Fragment>
    )
}

export default EmptyComponent
