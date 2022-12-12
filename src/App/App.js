import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"

import "./App.css"
import AllMoviesView from "../AllMoviesView/AllMoviesView"
import DetailView from "../DetailView/DetailView"
import Header from "../Header/Header"

function App() {
  const [movies, setMovies] = useState([])
  const [userRatings, setUserRatings] = useState([])
  const [query, setQuery] = useState("")
  const [err, setError] = useState("")

  useEffect(() => {
    getAllMovies()
  }, [])

  const getAllMovies = () => {
    fetch("https://rancid-tomatillos.herokuapp.com/api/v2/movies")
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

  const rateMovie = (e, id) => {
    const matchedIndex = userRatings.findIndex(rating => rating.id == id)
    const rating = e.target.innerText
    if (matchedIndex !== -1) {
      let newRatings = [...userRatings]
      newRatings[matchedIndex].rating = rating
      setUserRatings(newRatings)
    } else {
      setUserRatings([...userRatings, { id: id, rating: rating }])
    }
  }

  const errorMessage = <p className="error">Sorry, something went wrong. Please try again later.</p>

  return (
    <>
      <Header
        updateQuery={updateQuery}
        err={err}
      />
      <main>
        {err && errorMessage}
        <Route
          exact path="/:id"
          render={({ match }) => {
            const targetRating = userRatings.find(rating => match.params.id == rating.id)

            return <DetailView
              id={match.params.id}
              rateMovie={rateMovie}
              userRating={targetRating && targetRating.rating}
            />
          }}
        />
        <Route
          exact path="/"
          render={() => <AllMoviesView
            movies={movies}
            query={query}
            userRatings={userRatings}
          />}
        />
      </main>
    </>
  )

}

export default App