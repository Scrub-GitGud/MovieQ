import React from 'react'
import Navbar from '../Navbar';
import Body from '../Body';
import ModalMovieDetails from '../ModalMovieDetails';
import ModalRate from '../ModalRate';
import FloatingBtn from '../FloatingBtn';
import ModalAddToPlaylist from '../ModalAddToPlaylist';
import ModalPlaylists from '../ModalPlaylists';
import ModalPlaylistItems from '../ModalPlaylistItems';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Body className='app-body' />
            <ModalMovieDetails />
            <ModalRate />
            <ModalAddToPlaylist />
            <ModalPlaylists />
            <ModalPlaylistItems />
            <FloatingBtn />
        </div>
    )
}

export default Home
