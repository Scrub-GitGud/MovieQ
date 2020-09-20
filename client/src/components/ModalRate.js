import React, {useContext, useState } from 'react'
import { MovieContext } from '../context/MovieContext'
import M from 'materialize-css/dist/js/materialize.min.js'

const ModalRate = () => {

    const movieContext = useContext(MovieContext)
    const { movieDetails, SetMovieDetailsID, RateMovie } = movieContext
    
    const [rateData, setRateData] = useState({
        rate: 0,
        comment: ''
    })

    const onChange = (e) => {setRateData({...rateData, [e.target.name]: e.target.value})}
    const onSubmit = (e) => {
        e.preventDefault()

        if(rateData.rate === 0){
            M.toast({ html: 'Rating Failed', classes: 'red' })
        }else {
            RateMovie(rateData)
            M.Modal.init(document.getElementById('modal1')).open()
            SetMovieDetailsID(movieDetails.imdbID)
            setRateData({
                rate: 0,
                comment: ''
            })
        }
    }

    return (
        <div id="modal2" className="modal rating-modal">
            <div className="modal-content">
                <h4>{movieDetails.Title}</h4>
                <h4 className="orange-text txt-bold txt-center">
                    <i className="material-icons">star</i>
                    {rateData.rate%1 === 0 && rateData.rate != 10? "0" + rateData.rate : rateData.rate}
                </h4>

                <form onSubmit={onSubmit}>
                    {/* <p className="range-field"> */}
                        <input onChange={onChange} value={rateData.rate} className="sliderX" type="range" name='rate' id="test5" min="0" max="10" step="0.5" /> 
                    {/* </p> */}
                    <textarea onChange={onChange} value={rateData.comment} className='u-llgray' name="comment" id="" cols="30" rows="10" placeholder="Say something about this movie"></textarea>
                    <button type='submit' className='modal-close u-btn u-btn-block mt1 orange'><i className="material-icons">star</i>Submit Rate</button>
                </form>
            </div>
        </div>
    )
}

export default ModalRate
