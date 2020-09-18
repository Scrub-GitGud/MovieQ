import React from 'react'
import LoadingSpinner from './spinner.gif'

export const Loading = () => {
    return (
        <div>
            <img src={LoadingSpinner} alt="Loading..." style={loadingSpinnerStyle}/>
        </div>
    )
}

const loadingSpinnerStyle = {
    width: '300px',
    margin: 'auto',
    marginTop: '17vh',
    display: 'block'
}

export default Loading;