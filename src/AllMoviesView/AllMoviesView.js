import React from "react"
import "./AllMoviesView.css"

import Tile from "../Tile/Tile"

function AllMoviesView({ movies, query, userRatings, toggleBookmarked, userBookmarks, viewingWatchlist }) {

  const movieSet = viewingWatchlist ?
    movies.filter(movie => {
      return userBookmarks.some(bookmark => bookmark.movieID == movie.id)
    }) :
    movies

  const displayedMovies = !query ?
    movieSet :
    movieSet.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))

  const tileComponents = displayedMovies.map(movie => {
    const targetRating = userRatings.find(rating => rating.id == movie.id)
    const displayedRating = targetRating ?
      targetRating.rating :
      movie.average_rating.toFixed()
    const isBookmarked = userBookmarks.some(bookmark => bookmark.movieID == movie.id)

    return <Tile
      title={movie.title}
      year={movie.release_date}
      img={movie.poster_path}
      id={movie.id}
      key={movie.id}
      displayedRating={displayedRating}
      rated={(targetRating)}
      toggleBookmarked={toggleBookmarked}
      isBookmarked={isBookmarked}
    />
  })

  const noMatches = !tileComponents.length && query
  const noWatchedMovies = !tileComponents.length && viewingWatchlist && !query
  const noMatchesMessage = <p className="no-matches-message">No movies matching your search</p>
  const noWatchedMessage = <p className="no-matches-message">No movies in your watchlist yet</p>

  return (
    <>
      {movies.length && <ul>
        {tileComponents}
        {noMatches && noMatchesMessage}
        {noWatchedMovies && noWatchedMessage}
      </ul>}
    </>
  )
}

export default AllMoviesView