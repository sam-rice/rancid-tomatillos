import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"

import "./App.css"
import AllMoviesView from "../AllMoviesView/AllMoviesView"
import DetailView from "../DetailView/DetailView"
import Header from "../Header/Header"

function App() {
  const [movies, setMovies] = useState([])
  const [userRatings, setUserRatings] = useState([])
  const [userBookmarks, setUserBookmarks] = useState([])
  const [query, setQuery] = useState("")
  const [viewingWatchlist, setViewingWatchlist] = useState(false)
  const [err, setError] = useState("")

  useEffect(() => {
    getAllMovies()
  }, [])

  const getAllMovies = () => {
    fetch("https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies")
      .then(response => {
        if (!response.ok) {
          throw Error(response.ok)
        } else {
          return response.json()
        }
      })
      .then(({ movies }) => setMovies(movies))
      .catch(err => setError(err))
  }

  const updateQuery = input => {
    setQuery(input)
  }

  const toggleWatchlist = () => {
    setViewingWatchlist(!viewingWatchlist)
    console.log(viewingWatchlist)
  }

  const rateMovie = (rating, id) => {
    const matchedIndex = userRatings.findIndex(rating => rating.id == id)
    if (matchedIndex !== -1) {
      let newRatings = [...userRatings]
      newRatings[matchedIndex].rating = rating
      setUserRatings(newRatings)
    } else {
      setUserRatings([...userRatings, { id: id, rating: rating }])
    }
  }

  const toggleBookmarked = id => {
    const matchedIndex = userBookmarks.findIndex(bookmark => bookmark.movieID == id)
    if (matchedIndex !== -1) {
      let newBookmarks = [...userBookmarks]
      newBookmarks.splice(matchedIndex, 1)
      setUserBookmarks(newBookmarks)
    } else {
      setUserBookmarks([...userBookmarks, { movieID: id, id: Date.now() }])
    }
  }

  const errorMessage = <p className="error">Sorry, something went wrong. Please try again later.</p>

  return (
    <>
      <Header
        updateQuery={updateQuery}
        toggleWatchlist={toggleWatchlist}
        err={err}
      />
      <main>
        {err && errorMessage}
        <Route
          exact path="/:id"
          render={({ match }) => {
            const targetRating = userRatings.find(rating => match.params.id == rating.id)
            const isBookmarked = userBookmarks.some(bookmark => match.params.id == bookmark.movieID)

            return <DetailView
              id={match.params.id}
              rateMovie={rateMovie}
              userRating={targetRating && targetRating.rating}
              toggleBookmarked={toggleBookmarked}
              isBookmarked={isBookmarked}
            />
          }}
        />
        <Route
          exact path="/"
          render={() => <AllMoviesView
            movies={movies}
            query={query}
            userRatings={userRatings}
            userBookmarks={userBookmarks}
            toggleBookmarked={toggleBookmarked}
            viewingWatchlist={viewingWatchlist}
          />}
        />
      </main>
    </>
  )

}

export default App