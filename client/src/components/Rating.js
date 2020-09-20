import React from 'react'
import IMDB from './IMDB.png'
import RottenTomatoes from './Rotten_Tomatoes.png'
import Metacritic from './Metacritic.png'
import Star from './Star.png'

const Rating = (props) => {
    switch(props.item.Source){
        case "Internet Movie Database":
            return (
                <li className="rating">
                    <img src={IMDB} alt="IMDB" className="critic-icon" />
                    <span className=''>IMDB: </span><span className='txt-bold red-text'>{props.item.Value}</span>
                </li>
            )
        case "Rotten Tomatoes":
            return (
                <li className="rating">
                    <img src={RottenTomatoes} alt="RT" className="critic-icon" />
                    <span className=''>{props.item.Source}: </span><span className='txt-bold red-text'>{props.item.Value}</span>
                </li>
            )
        case "Metacritic":
            return (
                <li className="rating">
                    <img src={Metacritic} alt="Metacritic" className="critic-icon" />
                    <span className=''>{props.item.Source}: </span><span className='txt-bold red-text'>{props.item.Value}</span>
                </li>
            )
        default:
            return (
                <li className="rating">
                    <img src={Star} alt="PR" className="critic-icon" />
                    <span className=''>{props.item.Source}: </span><span className='txt-bold red-text'>{props.item.Value}</span>
                </li>
            )
    }
}

export default Rating
