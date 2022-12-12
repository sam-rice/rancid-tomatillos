import React from "react"
import "./AllMoviesView.css"

import Tile from "../Tile/Tile"

function AllMoviesView({ movies, query, userRatings }) {

  const displayedMovies = !query ? 
    movies :
    movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))

  const tileComponents = displayedMovies.map(movie => {

    const targetRating = userRatings.find(rating => rating.id == movie.id)

    const displayedRating = targetRating ? 
    targetRating.rating : 
    movie.average_rating.toFixed()

    return <Tile
      title={movie.title}
      year={movie.release_date}
      img={movie.poster_path}
      id={movie.id}
      key={movie.id}
      displayedRating={displayedRating}
      rated={(targetRating)}
    />
  })

  const noMatches = !tileComponents.length && query
  const noMatchesMessage = <p className="no-matches-message">No movies matching your search</p>

  return (
    <>
      {movies.length && <ul>
        {tileComponents}
        {noMatches && noMatchesMessage}
      </ul>}
    </>
  )
}

export default AllMoviesView