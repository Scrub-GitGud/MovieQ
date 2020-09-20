import React, { useContext } from 'react'
import { MovieContext } from '../context/MovieContext'
import Card from './Card'
import Loading from './Loading'
import MovieQLogo from "./MovieQ.png"

const Body = () => {
    const movieContext = useContext(MovieContext)
    const {movies, loading} = movieContext

    if(loading) {
        return <Loading />
    }

    if(movies.length == 0) {
        return(
            <div className="MovieQLogo">
                <img src={MovieQLogo} alt="MovieLogo"/>
            </div>
        )
    }
    
    return (
        <div>
            <div className="grid-4 m1">
                {movies !== undefined && 
                    movies.map(i => 
                        <Card key={i.imdbID} item={i} />
                    )
                }
            </div>
        </div>
    )
}

export default Body
