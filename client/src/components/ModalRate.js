import React, {useContext, useState} from 'react'
import { MovieContext } from '../context/MovieContext'
import M from 'materialize-css/dist/js/materialize.min.js'

const ModalRate = () => {

    const movieContext = useContext(MovieContext)
    const { movieDetails, RateMovie } = movieContext
    
    const [rateData, setRateData] = useState({
        rate: '',
        comment: ''
    })

    const onChange = (e) => {setRateData({...rateData, [e.target.name]: e.target.value})}
    const onSubmit = (e) => {
        e.preventDefault()

        if(rateData.rate === ''){
            M.toast({ html: 'Rating Failed', classes: 'red' })
        }else {
            rateData.rate = rateData.rate / 2
            RateMovie(rateData)
            setRateData({
                rate: '',
                comment: ''
            })
        }
    }

    return (
        <div id="modal2" className="modal rating-modal">
            <div className="modal-content">
                <h4>Rate {movieDetails.Title}</h4>
                <form onSubmit={onSubmit}>
                    <p className="range-field">
                    <input onChange={onChange} value={rateData.rate} type="range" name='rate' id="test5" min="0" max="20" />
                    </p>
                    <textarea onChange={onChange} value={rateData.comment} className='u-llgray' name="comment" id="" cols="30" rows="10" placeholder="Say something about this movie"></textarea>
                    <button type='submit' className='modal-close u-btn u-btn-block mt1 orange'><i className="material-icons">star</i>Submit Rate</button>
                </form>
            </div>
        </div>
    )
}

export default ModalRate
