export default (state, action) => {
    switch(action.type) {
        case "SEARCH_MOVIE":
            return {
                ...state,
                movies: action.payload,
                loading: false
            };
        case "SET_MOVIE_DETAILS":
            return {
                ...state,
                movieDetails: action.payload,
            };
        case "CLEAR_MOVIE_DETAILS":
            return {
                ...state,
                movieDetails: {},
            };
        case "RATED_A_MOVIE":
            return {
                ...state,
                loading: false,
                success: "Rating Successfull"
            };
        case "GET_ALL_PLAYLISTS":
            return {
                ...state,
                playlists: action.payload,
                loading: false
            };
        case "GET_PLAYLIST_ITEMS":
            return {
                ...state,
                playlistMovies: action.payload,
                loading: false
            };
        case "CLEAR_PLAYLIST_ITEMS":
            return {
                ...state,
                playlistMovies: [],
            };
        case "ADD_NEW_PLAYLIST":
            return {
                ...state,
                playlists: [...state.playlists, action.payload],
                success: "New Playlist Created",
                loading: false
            };
        case "ADD_ITEM_TO_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.map((i) => i._id === action.payload._id ? action.payload : i),
                success: "Added item to playlist",
                loading: false
            };
        case "DELETE_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.filter(i => i._id !== action.payload),
                success: "Playlist Deleted",
                loading: false
            };
        case "ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        case "CLEAR_ERROR_AND_SUCCESS":
            return {
                ...state,
                error: null,
                success: null
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}