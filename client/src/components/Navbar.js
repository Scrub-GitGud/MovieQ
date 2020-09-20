import React, {useContext, useRef, useEffect} from 'react'
import { MovieContext } from '../context/MovieContext'
import M from 'materialize-css/dist/js/materialize.min.js'

const Navbar = () => {

    const input_text = useRef('')

    const movieContext = useContext(MovieContext)
    const { success, error, ClearErrorAndSuccess, LoadPlaylist } = movieContext

    useEffect(() => {
        LoadPlaylist()
        
        if(error != null) {
            M.toast({ html: error , classes: 'red' })
            ClearErrorAndSuccess()
        }
        if (success != null) {
            M.toast({ html: success, classes: 'limegreen' })
            ClearErrorAndSuccess()
        }
        // eslint-disable-next-line
    }, [success, error])

    const onChange = () => {
        movieContext.SearchMovies(input_text.current.value);
    }
    const onSubmit = (e) => {
        e.preventDefault()
        movieContext.SearchMovies(input_text.current.value);
    }

    const onCross = (e) => {
        input_text.current.value = ''
        movieContext.SearchMovies('');
    }
    
    return (
        <nav>
            <div className="nav-wrapper #7c4dff deep-purple accent-2">
            <form onSubmit={onSubmit}>
                <div className="input-field">
                <input id="search" ref={input_text} type="search" placeholder="Search Movie" required autoComplete="off" />
                <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                <i onClick={onCross} className="material-icons">close</i>
                </div>
            </form>
            </div>
        </nav>
    )
}

export default Navbar