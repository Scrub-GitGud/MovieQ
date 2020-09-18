import React, { useContext, useState } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { MovieContext } from '../context/MovieContext'

const ModalAddToPlaylist = () => {

    const [createNewAndAdd, setCreateNewAndAdd] = useState(false)
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')

    const movieContext = useContext(MovieContext)
    const { movieDetails, playlists, AddNewPlaylist, AddItemToPlaylist } = movieContext

    const onClick = () => {
        setCreateNewAndAdd(true)
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if(newPlaylistTitle !== ''){
            const newPlaylist = {
                title: newPlaylistTitle,
                movieID: movieDetails.imdbID
            }
            AddNewPlaylist(newPlaylist)
            M.Modal.init(document.getElementById('modal3')).close()
            setCreateNewAndAdd(false)
        }else {
            M.toast({ html: "Enter Playlist Title" , classes: 'red' })
        }
    }

    return (
        <div>
            <div id="modal3" className="modal add-to-playlist-modal">
                <div className="modal-content">
                    <ul className="collection with-header">
                        <li className='collection-header'><h5>Add {movieDetails.Title} to a playlist</h5></li>

                        {playlists.length ? playlists.map(i => (
                            <li onClick={() => AddItemToPlaylist(i._id, movieDetails.imdbID)} key={i._id} className="modal-close playlistSelectDiv collection-item">
                                <h6>{i.title} ({i.movieIDs.length} Items)<a href="#!" className="secondary-content"><i className="material-icons">playlist</i></a></h6>
                            </li>
                        )) : <li className="collection-item"> <h6>No Playlist Added</h6> </li>}
                        
                        {!createNewAndAdd && (
                            <li onClick={onClick} className="collection-item playlistSelectDiv">
                                <h6><i className="fas fa-plus" /> Create New And Add</h6>
                            </li>
                        )}
                    </ul>
                    {createNewAndAdd && 
                    <form onSubmit={onSubmit}>
                        <div className="input-field col s12 my3 ">
                            <input value={newPlaylistTitle} onChange={(e) => {setNewPlaylistTitle(e.target.value)}} name="newPlaylistTitle" id="newPlaylistTitle" type="text" className="validate" />
                            <label htmlFor="newPlaylistTitle">New Playlist Title</label>
                        </div>
                        <button type='submit' className='u-btn u-btn-block deep-purple'><i className="fas fa-plus" /> Add</button>
                    </form>}
                </div>
            </div>
        </div>
    )
}

export default ModalAddToPlaylist
