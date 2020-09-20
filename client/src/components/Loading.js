import React from 'react'
import LoadingSpinner from './spinner.gif'

export const Loading = () => {
    return (
        <div className="LoadingSpinner">
            <img src={LoadingSpinner} alt="Loading..."/>
        </div>
    )
}

export default Loading;