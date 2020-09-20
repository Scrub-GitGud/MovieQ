import React, {useState, useContext, useEffect} from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'
import { MovieContext } from '../context/MovieContext'

const ModalPlaylists = () => {

    const [createNewPlaylist, setCreateNewPlaylist] = useState(false)
    const [newPlaylistTitle, setNewPlaylistTitle] = useState('')

    const movieContext = useContext(MovieContext)
    const { playlists, AddNewPlaylist, LoadPlaylistItem, DeletePlaylist } = movieContext

    useEffect(() => {
        // console.log(playlists);
    }, [playlists])

    const onClick = () => {
        setCreateNewPlaylist(true)
    }
    const onSubmit = (e) => {
        e.preventDefault()

        if(newPlaylistTitle !== ''){
            const newPlaylist = {
                title: newPlaylistTitle
            }
            AddNewPlaylist(newPlaylist)
            M.Modal.init(document.getElementById('modal3')).close()
            setNewPlaylistTitle('')
            setCreateNewPlaylist(false)
        }else {
            M.toast({ html: "Enter Playlist Title" , classes: 'red' })
        }
    }

    return (
        <div>
            <div id="modal4" className="modal add-to-playlist-modal">
                <div className="modal-content">
                    <ul className="collection with-header">
                        <li className='collection-header txt-center'><h5>All playlists</h5></li>

                        {/* {playlists.length ? playlists.map(i => (
                            <div href="#modal5" className="modal-trigger modal-close" onClick={() => LoadPlaylistItem(i._id)} key={i._id} >
                                <li className="collection-item playlists">
                                    <h6>{i.title} ({i.movieIDs.length} Items)<a href="#!" onClick={(e) =>{ e.stopPropagation(); DeletePlaylist(i._id)} } className="secondary-content"><i className="material-icons">delete</i></a></h6>
                                </li>
                            </div>
                        )) : <li className="collection-item"> <h6>No Playlist Added</h6> </li>} */}
                        {playlists.length ? playlists.map(i => (
                            <div key={i._id} className="playlistsDiv">
                                <div href="#modal5" className="modal-trigger modal-close" onClick={() => LoadPlaylistItem(i._id)} >
                                    <li className="collection-item playlists" style={{"paddingRight": "0"}}>
                                        <h6>{i.title.substring(0, 20)} ({i.movieIDs.length} {i.title.length < 15 && "Items"})</h6>
                                    </li>
                                </div>
                                <a href="#!" onClick={(e) =>{ DeletePlaylist(i._id)} } className="secondary-content"><i className="material-icons">delete</i></a>
                            </div>
                        )) : <li className="collection-item"> <h6>No Playlist Added</h6> </li>}
                        
                        {!createNewPlaylist && (
                            <li onClick={onClick} className="collection-item playlists">
                                <h6><i className="fas fa-plus" />  Create New Playlist</h6>
                            </li>
                        )}
                    </ul>
                    {createNewPlaylist && 
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

export default ModalPlaylists
