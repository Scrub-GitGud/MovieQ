import React, { useContext, useEffect } from 'react'
import { MovieContext } from '../context/MovieContext'
import Badge from './Badge'

const ModalPlaylistItems = () => {

    const movieContext = useContext(MovieContext)
    const { playlistMovies } = movieContext

    useEffect(() => {

    }, [playlistMovies])

    return (
        <div id="modal5" className="modal">
            <div className="modal-content">
                {playlistMovies.length > 0 && playlistMovies.map( i =>
                    <h4 key={i.imdbID}>{ i.Title }</h4> 
                )}
            </div>
            

            {/* {playlistMovies.map( i => 
            <div className="modal-content" key={i.imdbID}>
                <h4>{ i.Title } <Badge content={ i.Rated }/></h4>
                <p>
                    Genre:{i.Genre && i.Genre.split(', ').map(i => <Badge key={i} content={i} />)}
                </p>
                <h6>Released: { i.Released }</h6>
                <h6>Language: { i.Language }</h6>

                <ul className="list">
                    <h6><span className='txt-bold deep-purple-text'>Ratings:</span></h6>
                    {i.Ratings && i.Ratings.map(i => 
                        <li key={i.Source}>{i.Source}: <span className='txt-bold red-text'>{i.Value}</span></li>
                    )}
                </ul>


                <p><span className='txt-bold deep-purple-text'>Plot: </span>{ i.Plot }</p>
                <p><span className='txt-bold deep-purple-text'>Writer: </span>{ i.Writer }</p>


                {i.Production && i.Production !== "N/A" && <p><span className='txt-bold deep-purple-text'>A movie from : </span>{ i.Production }</p>}
            </div> )} */}
            {/* <div className="modal-buttons">
                <a href="#modal3" className='modal-close modal-trigger u-btn limegreen'>Add to another playlist</a>
                <a href="#!" className='modal-close u-btn deep-purple'><i className="material-icons">delete</i>Delete</a>
            </div> */}
        </div>
    )
}

export default ModalPlaylistItems
