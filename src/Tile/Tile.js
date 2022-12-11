import React, { useState } from "react"
import { Link } from 'react-router-dom'
import "./Tile.css"

import star from "../assets/star.png"

function Tile({ title, year, img, rating, id }) {
  const [ hovering, setHover ] = useState(false)

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      e.target.firstChild.click()
    }
  }

  const overlay = 
    <div 
      className="overlay"
      data-cy="overlay"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p className="overlay-text">{title}</p>
      <p className="overlay-text">{`(${year.slice(0, 4)})`}</p>
    </div>

  const imageClassList = hovering ? 
    `hover-animation tile-img` : 
    `tile-img`

  return (
    <li 
      data-cy={id}
      tabIndex={2}
      onKeyDown={e => handleKeyDown(e)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      >
        <Link to={`/${id}`}>
          <div data-cy="img-container" className="img-container">
            <img 
              className={imageClassList}
              src={img} 
              alt={title} 
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
            {hovering && overlay}
          </div>
        </Link>
        <p className="tile-rating">{rating.toFixed(1)} 
          <img className="star" src={star}/>
        </p>
      </li>
  )
}

export default Tile