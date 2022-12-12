import React from "react"
import { Link } from "react-router-dom"
import Tooltip from "rc-tooltip"
import RatingTooltip from "../RatingTooltip/RatingTooltip"

import "./ControlBar.css"
import backButton from "../assets/back-button.png"
import star from "../assets/star.png"
import blueStar from "../assets/star-blue.png"
import blueOutlineStar from "../assets/star-blue-outline.png"

const ControlBar = ({ rateMovie, avgRating, userRating, id }) => {
  const userStar = userRating ? blueStar : blueOutlineStar
  const displayedUserRating = userRating ? userRating : <p className="rate-prompt">rate<br />movie</p>

  return (
    <div className="control-bar">
      <Link
        to="/"
        role="button"
        className="back-button"
        aria-label="return to home page"
        data-cy="back-button"
      >
        <img
          src={backButton}
          className="back-icon"
          alt="back button"
        />
      </Link>
      <div className="ratings-container">
        <div className="user-rating-container">
          <p className="rating-label">
            my rating:
          </p>
          <div data-cy="user-rating" className="rating">
            {displayedUserRating}
            <Tooltip
              placement="bottom"
              overlay={<RatingTooltip 
                rateMovie={rateMovie} 
                id={id}
              />}
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
              trigger={['click']}
              
            >
              <img
                className="user-rating-star"
                src={userStar}
                role="button"
                aria-label="rate movie"
                data-cy={"open-rating-tooltip"}
              />
            </Tooltip>
          </div>
        </div>
        <div className="rating-container">
          <p className="rating-label">
            average rating:
          </p>
          <div data-cy="avg-rating" className="rating">
            {Math.round(avgRating)}
            <img
              className="rating-star"
              src={star}
              role="button"
              aria-label="rate movie"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ControlBar