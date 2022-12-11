import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"

import "./App.css"
import AllMoviesView from "../AllMoviesView/AllMoviesView"
import DetailView from "../DetailView/DetailView"
import Header from "../Header/Header"

function App() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [err, setError] = useState("")

  useEffect(() => {
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
  }, [])

  const updateQuery = input => {
    setQuery(input)
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
            return <DetailView id={match.params.id} />
          }}
        />
        <Route
          exact path="/"
          render={() => <AllMoviesView
            movies={movies}
            query={query}
          />}
        />
      </main>
    </>
  )

}

export default App