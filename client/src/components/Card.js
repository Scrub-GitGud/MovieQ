import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import Badge from './Badge'
import NoPoster from './no_poster.png'

const Card = (props) => {

    const movieContext = useContext(MovieContext)
    const { SetMovieDetailsID } = movieContext

    const onClick = () => {
        SetMovieDetailsID(props.item.imdbID)
    }

    return (
        <div onClick={onClick} className="u-card">
            <a className="modal-trigger" href="#modal1">
                <div className="u-card-image">
                    {props.item.Poster !== "N/A" ? <img src={props.item.Poster} alt={NoPoster} /> : <img src={NoPoster} alt={NoPoster} />}
                    <span className="u-card-title">{props.item.Year}</span>
                </div>
                <div className="left-align u-card-subtitle">
                    <h5>{props.item.Title}</h5>
                    {/* <span className='u-badge deep-purple'>{props.item.Type}</span> */}
                    <Badge content={props.item.Type} />
                </div>
            </a>
        </div>
    )
}

export default Card
