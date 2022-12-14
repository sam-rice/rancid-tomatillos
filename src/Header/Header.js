import React, { useState, createRef } from "react"
import { Link, Route } from "react-router-dom"

import "./Header.css"
import logo from "../assets/rt_logo.png"

function Header({ updateQuery, toggleWatchlist, viewingWatchlist }) {
  const [query, setQuery] = useState("")
  const [searchHidden, setSearchHidden] = useState(true)
  const [searchInput] = useState(createRef())

  const handleChange = e => {
    const { value } = e.target
    setQuery(value)
    updateQuery(value)
  }

  const handleKeyDown = e => {
    if (e.key === "Enter") {
      handleIconClick()
    }
  }

  const handleIconClick = () => {
    setSearchHidden(false)
    searchInput.current.focus()
  }

  const inputClassList = searchHidden ?
    `search-input` :
    `search-input input-transition`

  const iconClassList = searchHidden ?
    `material-symbols-outlined` :
    `material-symbols-outlined icon-transition`

  const watchlistButtonClassList = viewingWatchlist ?
    "watchlist-button watchlist-button-selected" :
    "watchlist-button"

  const searchBar =
    <nav className="header-right">
      <div data-cy="input-container" className="input-container">
        <i
          className={iconClassList}
          onClick={handleIconClick}
          onKeyDown={(e) => handleKeyDown(e)}
          tabIndex={1}
          role="button"
          aria-label="click to search movies by title"
          data-cy="search-icon-button"
        >search</i>
        <input
          className={inputClassList}
          type="search"
          name="search"
          placeholder="search by title"
          value={query}
          tabIndex={1}
          onChange={(e) => handleChange(e)}
          ref={searchInput}
        />
      </div>
      <button 
        className={watchlistButtonClassList} 
        onClick={toggleWatchlist}
        aria-pressed={viewingWatchlist}
        data-cy="watchlist-button"
      >My Watchlist</button>
    </nav>

  return (
    <header>
      <div className="header-left">
        <Link to="/" className="title-container">
          <img
            className="logo"
            src={logo}
            alt="Rancid Tomatillos logo"
          />
          <h1>RANCID <br />TOMATILLOS</h1>
        </Link>
      </div>
      <Route exact path="/" render={() => searchBar}
      />
    </header>
  )
}

export default Header