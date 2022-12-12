import React from "react"
import "./RatingTooltip.css"

const RatingTooltip = (props) => {
  return (
    <div className="rating-buttons-parent">
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 1/10"
      >1</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 2/10"
      >2</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 3/10"
      >3</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 4/10"
      >4</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 5/10"
      >5</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 6/10"
      >6</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 7/10"
      >7</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 8/10"
      >8</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 9/10"
      >9</button>
      <button 
        className="rating-buttons"
        onClick={e => props.rateMovie(e)}
        aria-label="rate movie 10/10"
      >10</button>
  </div>
  )
}

export default RatingTooltip