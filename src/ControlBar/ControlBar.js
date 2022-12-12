import React from "react"
import { Link } from "react-router-dom"
import Tooltip from "rc-tooltip"
import RatingTooltip from "../RatingTooltip/RatingTooltip"

import "./ControlBar.css"

const ControlBar = ({ rateMovie, avgRating }) => {
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
            average rating:
          </p>
          <div data-cy="rating" className="rating">
            {Math.round(avgRating)}
            <Tooltip
              placement="bottom"
              overlay={<RatingTooltip rateMovie={rateMovie} />}
              arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
              trigger={['click']}
            >
              <img
                className="user-rating-star"
                src={star}
                role="button"
                aria-label="rate movie"
              />
            </Tooltip>
          </div>
        </div>
        <div className="rating-container">
          <p className="rating-label">
            average rating:
          </p>
          <div data-cy="rating" className="rating">
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