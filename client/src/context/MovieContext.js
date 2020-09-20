import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import MovieReducer from './MovieReducer';
export const MovieContext = createContext();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();


const MovieContextProvider = (props) => {
    const initialState = {
        movies: [],
        playlistMovies: [],
        movieDetails: {},
        playlists: [],
        currentPlaylist: {},
        loading: false,
        success: null,
        error: null
    }

    const [state, dispatch] = useReducer(MovieReducer, initialState)

    const SearchMovies = async (input_value) => {
        setLoading()
        let all_search = []
        let i = 1
        let searched_data = null
        do{
            searched_data = await axios.get(`http://www.omdbapi.com/?apikey=f3d5f186&s=${input_value}&page=${i}`, {
                cancelToken: source.token
            }).catch(function (thrown) {
                if (axios.isCancel(thrown)) {
                  console.log('Request canceled', thrown.message);
                } else {
                    console.log(thrown.message);
                }
            })

            if(searched_data.data.Response === "True")console.log("Response Success");
            if(searched_data.data.Error)console.log(searched_data.data.Error, "Response Error");
            
            if(searched_data.data.Search !== undefined){
                all_search = all_search.concat(searched_data.data.Search)
            }
            i++
        }while(searched_data.data.Response !== "False" && i <= 2)
        dispatch({type: "SEARCH_MOVIE", payload: all_search})

        // const x = await axios.get(`http://www.omdbapi.com/?apikey=f3d5f186&s=${input_value}`, {
        //     cancelToken: source.token
        // }).catch(function (thrown) {
        //     if (axios.isCancel(thrown)) {
        //       console.log('Request canceled', thrown.message);
        //     } else {
        //         console.log(thrown.message);
        //     }
        // })
        // console.log(x.data);
    }
    const SetMovieDetailsID = async (imdbID) => {
        try {
            dispatch({type: "CLEAR_MOVIE_DETAILS"})
            const searched_data = await axios.get(`http://www.omdbapi.com/?apikey=f3d5f186&i=${imdbID}`)
            
            // Getting Personal Rating
            const config = {
                headers: {
                    'jwt-token': localStorage.getItem('jwtToken69')
                }
            }
            const res = await axios.get(`api/rating/${searched_data.data.imdbID}`, config)
            
            // Add Personal Rating to searched_data
            if(res.data.rate !== undefined) {
                searched_data.data.Ratings.push({
                    Source: "Personal Rating",
                    Value: `${res.data.rate}/10`
                })
            }

            dispatch({type: "SET_MOVIE_DETAILS", payload: searched_data.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }

    const RateMovie = async (rateData) => {
        setLoading()
        rateData.movieID = state.movieDetails.imdbID
        if(rateData.comment === '') rateData.comment = null

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        try {
            const res = await axios.post('api/rating', rateData, config)
            const rated_movie = await axios.get(`http://www.omdbapi.com/?apikey=f3d5f186&i=${res.data.movieID}`)
            dispatch({type: "RATED_A_MOVIE", payload: rated_movie.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const LoadPlaylist = async () => {
        setLoading()
        const config = {
            headers: {
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        try {
            const res = await axios.get('api/playlist', config)
            dispatch({type: "GET_ALL_PLAYLISTS", payload: res.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const LoadPlaylistItem = async (playlist_id) => {
        dispatch({type: "CLEAR_PLAYLIST_ITEMS"})
        setLoading()
        const config = {
            headers: {
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        try {
            const res = await axios.get(`api/playlist/${playlist_id}`, config)

            dispatch({type: "SET_CURRENT_PLAYLIST", payload: res.data})

            let PlaylistItems = []
            const X = res.data.movieIDs.map(async (i) => {
                const movie = await axios.get(`http://www.omdbapi.com/?apikey=f3d5f186&i=${i}`)
                
                
                const rating_res = await axios.get(`api/rating/${movie.data.imdbID}`, config)
                // Add Personal Rating to movie
                if(rating_res.data.rate !== undefined) {
                    movie.data.Ratings.push({
                        Source: "Personal Rating",
                        Value: `${rating_res.data.rate}/10`
                    })
                }

                // PlaylistItems = [...PlaylistItems, movie.data];
                PlaylistItems.push(movie.data)
            });

            Promise.all(X).then(() => {
                dispatch({type: "GET_PLAYLIST_ITEMS", payload: PlaylistItems})
            });
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const AddNewPlaylist = async (newPlaylistData) => {
        setLoading()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        try {
            const res = await axios.post('api/playlist', newPlaylistData, config)
            dispatch({type: "ADD_NEW_PLAYLIST", payload: res.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const AddItemToPlaylist = async (playlist_id, passedMovieID) => {
        setLoading()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        const movieData = {
            movieID: passedMovieID
        }
        try {
            const res = await axios.put(`api/playlist/${playlist_id}`, movieData, config)
            
            dispatch({type: "ADD_ITEM_TO_PLAYLIST", payload: res.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const RemoveItemFromPlaylist = async (playlist_id, passedMovieID) => {
        setLoading()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        const movieData = {
            movieID: passedMovieID
        }
        try {
            const res = await axios.put(`api/playlist/deleteItem/${playlist_id}`, movieData, config)
            dispatch({type: "REMOVE_ITEM_FROM_PLAYLIST", payload: res.data})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }
    const DeletePlaylist = async (playlist_id) => {
        setLoading()
        const config = {
            headers: {
                'jwt-token': localStorage.getItem('jwtToken69')
            }
        }
        try {
            await axios.delete(`api/playlist/${playlist_id}`, config)
            dispatch({type: "DELETE_PLAYLIST", payload: playlist_id})
        } catch (err) {
            console.log(err);
            dispatch({type: "ERROR", payload: err.response.data.msg})
        }
    }

    const ClearErrorAndSuccess = () => dispatch({ type: "CLEAR_ERROR_AND_SUCCESS" })
    const setLoading = () => dispatch({ type: "SET_LOADING" })

    return(
        <MovieContext.Provider 
            value={{
                movies: state.movies,
                playlistMovies: state.playlistMovies,
                movieDetails: state.movieDetails,
                playlists: state.playlists,
                currentPlaylist: state.currentPlaylist,
                loading: state.loading,
                error: state.error,
                success: state.success,
                SearchMovies,
                SetMovieDetailsID,
                RateMovie,
                LoadPlaylist,
                LoadPlaylistItem,
                AddNewPlaylist,
                AddItemToPlaylist,
                RemoveItemFromPlaylist,
                DeletePlaylist,
                ClearErrorAndSuccess
            }}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider