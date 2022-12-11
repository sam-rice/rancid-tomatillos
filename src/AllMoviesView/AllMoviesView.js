import React from "react"
import "./AllMoviesView.css"

import Tile from "../Tile/Tile"

function AllMoviesView({ movies, query }) {
  const displayedMovies = !query ? movies :
    movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))

  const tileComponents = displayedMovies.map(movie => {
    return <Tile
      title={movie.title}
      year={movie.release_date}
      img={movie.poster_path}
      rating={movie.average_rating}
      id={movie.id}
      key={movie.id}
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