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
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                success: `You've rated ${action.payload.Title}`
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
        case "SET_CURRENT_PLAYLIST":
            return {
                ...state,
                currentPlaylist: action.payload,
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
            console.log(action.payload);
            return {
                ...state,
                playlists: state.playlists.map((i) => i._id === action.payload._id ? action.payload : i),
                success: `Added item to ${action.payload.title}`,
                loading: false
            };
        case "REMOVE_ITEM_FROM_PLAYLIST":
            return {
                ...state,
                playlists: state.playlists.map((i) => i._id === action.payload._id ? action.payload : i),
                success: `Removed item from ${action.payload.title}`,
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