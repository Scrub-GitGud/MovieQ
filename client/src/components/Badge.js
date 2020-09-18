import React from 'react'

const Badge = (props) => {

    switch (props.content) {
        case "game":
            return <span className='u-badge red'>{props.content}</span>
        case "movie":
            return <span className='u-badge deep-purple'>{props.content}</span>
        case "series":
        case "PG":
            return <span className='u-badge limegreen'>{props.content}</span>
        case "PG-13":
            return <span className='u-badge orangered'>{props.content}</span>
        case "R":
            return <span className='u-badge u-red'>{props.content}</span>
        case "N/A":
        case "Not Rated":
            return <span className='u-badge lightblack'>{props.content}</span>
        case "Action":
            return <span className='u-badge crimson'>{props.content}</span>
        case "Adventure":
            return <span className='u-badge forestgreen'>{props.content}</span>
        case "Sci-Fi":
            return <span className='u-badge cyan'>{props.content}</span>
        case "Drama":
            return <span className='u-badge tomato'>{props.content}</span>
        case "Fantasy":
            return <span className='u-badge mediumslateblue'>{props.content}</span>
        case "Romance":
            return <span className='u-badge deeppink'>{props.content}</span>
        case "Mystery":
            return <span className='u-badge lightblack'>{props.content}</span>
        case "Thriller":
            return <span className='u-badge indigo'>{props.content}</span>
        case "War":
            return <span className='u-badge brown'>{props.content}</span>
        case "Comedy":
            return <span className='u-badge orange'>{props.content}</span>
        case "Crime":
            return <span className='u-badge black'>{props.content}</span>
        case "Horror":
            return <span className='u-badge dimgray'>{props.content}</span>
        case "Biography":
            return <span className='u-badge blue'>{props.content}</span>
        case "Sport":
            return <span className='u-badge lawngreen'>{props.content}</span>
        case "Animation":
            return <span className='u-badge tomato'>{props.content}</span>
        case "Family":
            return <span className='u-badge springgreen'>{props.content}</span>
        case "Short":
            return <span className='u-badge darkviolet'>{props.content}</span>
        default:
            return <span className='u-badge deepskyblue'>{props.content}</span>
    }
}

export default Badge
