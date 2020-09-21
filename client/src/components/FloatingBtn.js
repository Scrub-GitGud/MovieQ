import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import M from 'materialize-css/dist/js/materialize.min.js'

const FloatingBtn = () => {

    React.useEffect(() => {
        M.AutoInit();
        // M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
        //     direction: 'top',
        //     hoverEnabled: false
        // });
    })

    const authContext = useContext(AuthContext)
    const {userData, Logout} = authContext

    const onLogout = () => {
        Logout()
    }
    
    return (
        <div className="fixed-action-btn click-to-toggle">
            {/* <a href="#!" className="btn-floating btn-large deep-purple">
                <i className="large material-icons">settings</i>
            </a>
            <ul>
                { userData && <li><a onClick={onClick} href="#!" className="u-playlist-btn btn-floating blue">{userData.name}</a></li>}
                <li><a onClick={onLogout} href="#!" className="u-playlist-btn btn-floating blueviolet">Logout</a></li>
                <li><a onClick={onClick} href="#modal4" className="modal-trigger u-playlist-btn btn-floating limegreen">Playlists</a></li>
                <li><a onClick={onFABClose} className="u-playlist-btn btn-floating limegreen">Close</a></li>
            </ul> */}

            <div class="fab">
                <input type="checkbox" class="fab__checkbox" id="fab-toggle" />
                <label for="fab-toggle" class="fab__label">
                    <i class="fas fa-cog fa-3x fab__icon"></i>
                    <ul class="fab__list">
                        {userData && <li class="fab__list__item"><a href="#!" className="fab__button u-playlist-btn gradient-bg-1">{userData.name}</a></li>}
                        <li class="fab__list__item"><a href="#modal4" className="modal-trigger fab__button u-playlist-btn gradient-bg-2">Playlists</a></li>
                        <li class="fab__list__item"><a onClick={onLogout} href="#!" className="fab__button u-playlist-btn gradient-bg-3">Logout</a></li>
                        {/* <li class="fab__list__item"><a href="#!" class="fab__button">Button 3</a></li> */}
                    </ul>
                </label>
            </div>
        </div>
    )
}

export default FloatingBtn
