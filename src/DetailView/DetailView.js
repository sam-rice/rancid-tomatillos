import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactPlayer from 'react-player/youtube'

import "./DetailView.css"
import backButton from "../assets/back-button.png"

import star from "../assets/star.png"

function DetailView({ id }) {
  const [ movie, setMovie ] = useState({})
  const [ videoURL, setVideoURL ] = useState("")
  const [ error, setError ] = useState("")

  useEffect(() => {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
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

    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}/videos`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.ok)
        } else {
          return response.json()
        }
      })
      .then(({ videos }) => {
        if (videos.length) {
          setVideoURL(videos[0].key)
        }
      })
      .catch(err => setError(err))
      
      window.scrollTo(0, 0)
  }, [])

  const videoElement = <ReactPlayer url={`www.youtube.com/watch?v=${videoURL}`}  width="75%" />

  const errorMessage = <p className="error">Sorry, something went wrong. Please try again later.</p>

  const budgetRow = <tr>
    <td>budget:</td>
    <td data-cy="budget" className="td-key">{movie.budget}</td>
  </tr>

  const revenueRow = <tr>
    <td>box office:</td>
    <td data-cy="revenue" className="td-key">{movie.revenue}</td>
  </tr>


  const backdropStyle = {
    background: `linear-gradient(180deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0.7) 100%), url(${movie.backdropURL})`
  }

  return (
    <>
      {Object.keys(movie).length && <div className="details-grandparent">
        <div className="back-button-parent">
          <Link
            to="/"
            role="button"
            aria-label="return to home page"
            data-cy="back-button"
          >
            <img
              src={backButton}
              className="back-button"
              alt="back button"
            />
          </Link>
        </div>
        <section
          className="details-parent"
          style={backdropStyle}
        >
          <div className="details-upper">
            <div className="test">
              <img
                data-cy="poster"
                className="poster"
                src={movie.posterURL}
                alt={`Poster for ${movie.title}`}
              />
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
            <div className="rating-container">
              <p className="rating">
                average rating:
              </p>
              <p data-cy="rating" className="rating-num">
                {Math.round(movie.avgRating)}
                <img className="detail-star" src={star} />
              </p>
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