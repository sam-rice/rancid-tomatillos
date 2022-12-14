import React, { useState, createRef } from "react"
import { Link } from 'react-router-dom'
import "./Tile.css"

import star from "../assets/star.png"
import blueStar from "../assets/star-blue.png"
import bookmarkTrue from "../assets/bookmark-true.png"
import bookmarkFalse from "../assets/bookmark-false.png"

function Tile({ title, year, img, id, displayedRating, rated, toggleBookmarked, isBookmarked }) {
  const [hovering, setHover] = useState(false)
  const [tile] = useState(createRef())

  const handleTileKeyDown = e => {
    if (e.key === "Enter") {
      e.target.children[1].click()
    }
  }

  const handleBookmark = () => {
    toggleBookmarked(id)
    tile.current.focus()
  }

  const handleBookmarkKeyDown = e => {
    if (e.key === "Enter") {
      e.target.click()
    }
  }

  const userStar = rated ? blueStar : star

  const tileBookmarkClassList = "bookmark bookmark-tile"

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
      onKeyDown={e => handleTileKeyDown(e)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <img 
        data-cy="bookmark-tile" 
        className={tileBookmarkClassList} 
        src={isBookmarked ? bookmarkTrue : bookmarkFalse} 
        alt="bookmark icon"
        onClick={handleBookmark}
        onKeyDown={e => handleBookmarkKeyDown(e)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        role="button"
        aria-label="toggle bookmark"
        aria-pressed={isBookmarked}
        tabIndex={2}
      /> 
      <Link to={`/${id}`} ref={tile}>
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
      <p
        className="tile-rating"
        data-cy="displayed-tile-rating"
      >{displayedRating}
        <img
          className="star"
          src={userStar}
          alt="rating star"
        />
      </p>
    </li>
  )
}

export default Tile