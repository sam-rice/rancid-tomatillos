import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player/youtube'

import ControlBar from "../ControlBar/ControlBar"
import "./DetailView.css"
import bookmarkTrue from "../assets/bookmark-true.png"
import bookmarkFalse from "../assets/bookmark-false.png"

function DetailView({ id, rateMovie, userRating, toggleBookmarked, isBookmarked }) {
  const [movie, setMovie] = useState({})
  const [videoURL, setVideoURL] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    getMovieData()
    getTrailerData()
    window.scrollTo(0, 0)
  }, [])

  const getMovieData = () => {
    fetch(`https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/${id}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.ok)
        } else {
          return response.json()
        }
      })
      .then(({ movie }) => {
        const releaseDateObject = new Date(Date.parse(movie.release_date))
        const releaseDate = `${releaseDateObject.toLocaleString("en-US", { month: "long" })} ${releaseDateObject.getDate() + 1}, ${releaseDateObject.getFullYear()}`
        const releaseYear = releaseDateObject.getFullYear()
        const genres = movie.genres.join(" | ").toUpperCase()

        setMovie({
          avgRating: movie.average_rating,
          backdropURL: movie.backdrop_path,
          budget: movie.budget.toLocaleString(),
          genres: genres,
          id: movie.id,
          overview: movie.overview,
          posterURL: movie.poster_path,
          releaseDate: releaseDate,
          releaseYear: releaseYear,
          revenue: movie.revenue.toLocaleString(),
          runtime: movie.runtime,
          title: movie.title
        })
      })
      .catch(err => setError(err))
  }

  const getTrailerData = () => {
    fetch(`https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/${id}/videos`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.ok)
        } else {
          return response.json()
        }
      })
      .then(({ videos }) => {
        if (videos.length) {
          const trailer = videos.find(video => video.type === "Trailer")
          const targetVideo = trailer ? trailer : videos[0]
          setVideoURL(targetVideo.key)
        }
      })
      .catch(err => setError(err))
  }

  const handleBookmarkKeyDown = e => {
    if (e.key === "Enter") {
      e.target.click()
    }
  }

  const videoElement = <ReactPlayer url={`www.youtube.com/watch?v=${videoURL}`} />

  const errorMessage = <p className="error">Sorry, something went wrong. Please try again later.</p>

  const budgetRow = <tr>
    <td>budget:</td>
    <td data-cy="budget" className="td-key">${movie.budget}</td>
  </tr>

  const revenueRow = <tr>
    <td>box office:</td>
    <td data-cy="revenue" className="td-key">${movie.revenue}</td>
  </tr>

  const backdropStyle = {
    background: `linear-gradient(180deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.4) 100%), url(${movie.backdropURL})`
  }

  return (
    <>
      {Object.keys(movie).length && <div className="details-grandparent">
        <ControlBar
          rateMovie={rateMovie}
          avgRating={movie.avgRating}
          userRating={userRating}
          id={id}
        />
        <section
          className="details-parent"
          style={backdropStyle}
        >
          <div className="details-upper">
            <div className="poster-container">
              <img 
                data-cy="bookmark" 
                className="bookmark" 
                src={isBookmarked ? bookmarkTrue : bookmarkFalse} 
                alt="bookmark icon"
                role="button"
                aria-label="toggle bookmark"
                aria-pressed={isBookmarked}
                onClick={() => toggleBookmarked(id)}
                onKeyDown={e => handleBookmarkKeyDown(e)}
                tabIndex={0}
              />
              <img
                data-cy="poster"
                className="poster"
                src={movie.posterURL}
                alt={`Poster for ${movie.title}`}
              />
            </div>
            <div className="text-container">
              <h2 data-cy="title" className="title">{`${movie.title} (${movie.releaseYear})`}</h2>
              <p data-cy="genres" className="genres">{movie.genres}</p>
              <p data-cy="overview" className="overview">{movie.overview}</p>
              <table>
                <tbody>
                  <tr>
                    <td>runtime:</td>
                    <td data-cy="runtime" className="td-key">{movie.runtime} minutes</td>
                  </tr>
                  <tr>
                    <td>release date:</td>
                    <td data-cy="release-date" className="td-key">{movie.releaseDate}</td>
                  </tr>
                  {movie.budget != 0 && budgetRow}
                  {movie.revenue != 0 && revenueRow}
                </tbody>
              </table>
            </div>
          </div>
          <div className="video-parent">
            {videoURL && videoElement}
          </div>
        </section>

      </div>}

      {error && errorMessage}
    </>
  )

}

export default DetailView