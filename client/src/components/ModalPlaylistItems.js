import React, { useContext, useEffect } from 'react'
import { MovieContext } from '../context/MovieContext'
import Badge from './Badge'
import Loading from './Loading'
import Rating from './Rating'

const ModalPlaylistItems = () => {

    const movieContext = useContext(MovieContext)
    const { playlistMovies, currentPlaylist, SetMovieDetailsID, RemoveItemFromPlaylist } = movieContext

    useEffect(() => {
        // console.log(playlistMovies);
    }, [playlistMovies, playlistMovies.length])

    
    return (
        <div id="modal5" className="modal playlist-items-modal">
            <div className="playlist-items-modal-title">
                {currentPlaylist.title}
            </div>
            {playlistMovies.length ? playlistMovies.map( i => 
            <div key={i.imdbID}  className="playlist-items-modal-content">
                <div className="playlist-items-modal-img">
                    <img src={i.Poster} alt=""/>
                </div>
                <div className="playlist-items-modal-details" key={i.imdbID}>
                    <h4>{ i.Title } <Badge content={ i.Rated }/></h4>
                    <p>
                        Genre:{i.Genre && i.Genre.split(', ').map(i => <Badge key={i} content={i} />)}
                    </p>
                    <h6>Released: { i.Released }</h6>
                    <h6>Language: { i.Language }</h6>

                    <ul className="list ratingList">
                        <h6><span className='txt-bold deep-purple-text'>Ratings:</span></h6>
                        {i.Ratings && i.Ratings.map(i => 
                            <Rating key={i.Source} item={i} />
                        )}
                    </ul>


                    <p><span className='txt-bold deep-purple-text'>Plot: </span>{ i.Plot }</p>

                    {i.Production && i.Production !== "N/A" && <p><span className='txt-bold deep-purple-text'>A movie from : </span>{ i.Production }</p>}

                    <div className="modal-buttons">
                        <a onClick={() => SetMovieDetailsID(i.imdbID)} href="#modal3" className='modal-close modal-trigger u-btn limegreen'><i className="material-icons">add</i></a>
                        <a onClick={() => SetMovieDetailsID(i.imdbID)} href="#modal2" className='modal-close modal-trigger u-btn orange'><i className="material-icons">star</i></a>
                        <a onClick={() => RemoveItemFromPlaylist(currentPlaylist._id, i.imdbID)} href="#!" className='modal-close u-btn deep-purple'><i className="material-icons">delete</i></a>
                    </div>
                </div>
            </div> ): <Loading />}
        </div>
    )
}

export default ModalPlaylistItems
