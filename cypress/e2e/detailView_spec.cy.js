describe("All Movies View - Complete Data", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies"
    }, {
      fixture: "allMovies.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/337401"
    }, {
      fixture: "mulan.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/337401/videos"
    }, {
      fixture: "video.json"
    })

    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="337401"]').click()
  })

  it("should display a movie's poster", () => {
    cy.get('[data-cy="poster"]').invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
  })

  it("should display a movie's title and year", () => {
    cy.get('[data-cy="title"]').contains("Mulan (2020)")
  })

  it("should display a movie's genre(s)", () => {
    cy.get('[data-cy="genres"]').contains("ACTION | ADVENTURE | DRAMA | FANTASY")
  })

  it("should display a movie's overview", () => {
    cy.get('[data-cy="overview"]').contains("When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.")
  })

  it("should display a movie's runtime", () => {
    cy.get('[data-cy="runtime"]').contains("115 minutes")
  })

  it("should display a movie's release date", () => {
    cy.get('[data-cy="release-date"]').contains("September 4, 2020")
  })

  it("should display a movie's budget if the data is reliable", () => {
    cy.get('[data-cy="budget"]').contains("200,000,000")
  })

  it("should display a movie's release date", () => {
    cy.get('[data-cy="revenue"]').contains("57,000,000")
  })

  it("should display a movie's average rating", () => {
    cy.get('[data-cy="avg-rating"]').contains("5")
  })

  it("should have a \"back\" button that takes the user back to the home page", () => {
    cy.get('[data-cy="back-button"]').click()
    cy.url().should("equal", "http://localhost:3000/")
  })

  it("should allow a user to leave their own review", () => {
    cy.get('[data-cy="open-rating-tooltip"').click()
    cy.get('[data-cy="rating-3"]').click()
    cy.get('[data-cy="user-rating"]').contains("3")
  })

  it("should allow a user to change their review", () => {
    cy.get('[data-cy="open-rating-tooltip"').click()
    cy.get('[data-cy="rating-3"]').click()
    cy.get('[data-cy="rating-7"]').click()
    cy.get('[data-cy="user-rating"]').contains("7")
  })

  it("should should display user reviews instead of average reviews on the home page, if the user has left one", () => {
    cy.get('[data-cy="open-rating-tooltip"').click()
    cy.get('[data-cy="rating-7"]').click()
    cy.get('[data-cy="back-button"]').click()
    cy.get('[data-cy="337401"]').find('[data-cy="displayed-tile-rating"]').contains("7")
  })
})

describe("All Movies View - Incomplete Data", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies"
    }, {
      fixture: "allMovies.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/694919"
    }, {
      fixture: "moneyPlane.json"
    })
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies/694919/videos"
    }, {
      fixture: "video.json"
    })

    cy.visit('http://localhost:3000/')
    cy.get('[data-cy="694919"]').click()
  })

  it("should display a movie's budget if the data is reliable", () => {
    cy.get('[data-cy="budget"]').should("not.exist")
  })

  it("should display a movie's release date", () => {
    cy.get('[data-cy="revenue"]').should("not.exist")
  })
})