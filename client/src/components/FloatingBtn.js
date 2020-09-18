import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import M from 'materialize-css/dist/js/materialize.min.js'

const FloatingBtn = () => {

    React.useEffect(() => {
        M.AutoInit();
    })

    const authContext = useContext(AuthContext)
    const {userData, Logout} = authContext

    const onClick = (e) => {
        console.log(e.target.name);
    }
    const onLogout = () => {
        Logout()
    }
    
    return (
        <div className="fixed-action-btn">
            <a href="#!" className="btn-floating btn-large deep-purple">
                <i className="large material-icons">settings</i>
            </a>
            <ul>
                <li><a onClick={onLogout} href="#!" className="u-playlist-btn btn-floating blueviolet">Logout</a></li>
                {/* <li><a onClick={onClick} href="#!" className="u-playlist-btn btn-floating orange">All Ratings</a></li> */}
                <li><a onClick={onClick} href="#modal4" className="modal-trigger u-playlist-btn btn-floating blue">Playlists</a></li>
                { userData && <li><a onClick={onClick} href="#!" className="u-playlist-btn btn-floating green">{userData.name}</a></li>}
            </ul>
        </div>
    )
}

export default FloatingBtn
