import React, { useContext, Fragment } from 'react'
import { MovieContext } from '../context/MovieContext'
import Badge from './Badge'
import Loading from './Loading'
import Rating from './Rating'

const ModalMovieDetails = () => {

    const movieContext = useContext(MovieContext)
    const { movieDetails } = movieContext

    return (
        <div id="modal1" className="modal">
        {movieDetails.Title ? 
        <Fragment>
            <div className="modal-content">
                <h4>{ movieDetails.Title } <Badge content={ movieDetails.Rated }/></h4>
                <p>
                    Genre:{movieDetails.Genre && movieDetails.Genre.split(', ').map(i => <Badge key={i} content={i} />)}
                </p>
                <h6>Released: { movieDetails.Released }</h6>
                <h6>Language: { movieDetails.Language }</h6>

                <ul className="list">
                    <h6><span className='txt-bold deep-purple-text'>Ratings:</span></h6>
                    {movieDetails.Ratings && movieDetails.Ratings.map(i => 
                        <Rating key={i.Source} item={i} />
                    )}
                </ul>


                <p><span className='txt-bold deep-purple-text'>Plot: </span>{ movieDetails.Plot }</p>
                <p><span className='txt-bold deep-purple-text'>Writer: </span>{ movieDetails.Writer }</p>


                {movieDetails.Production && movieDetails.Production !== "N/A" && <p><span className='txt-bold deep-purple-text'>A movie from : </span>{ movieDetails.Production }</p>}
            </div>
            <div className="modal-buttons">
                <a href="#modal3" className='modal-close modal-trigger u-btn limegreen'>Add to playlist</a>
                <a href="#modal2" className='modal-close modal-trigger u-btn orange'><i className="material-icons">star</i>Rate</a>
                <a href="#!" className='modal-close u-btn deep-purple'><i className="material-icons">close</i>Close</a>
            </div>
        </Fragment>
        :   <Loading />}

            {/* <div className="modal-footer">
                <a href="#!" className='btn btn-primary'>Add to playlist</a>
                <a href="#!" className="modal-close waves-effect waves-green btn-flat">
                    <i className="material-icons deep-purple u-badge">close</i>
                </a>
            </div> */}
        </div>
    )
}

export default ModalMovieDetails
