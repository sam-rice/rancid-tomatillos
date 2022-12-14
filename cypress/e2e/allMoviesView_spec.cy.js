describe("All Movies View", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos-api.netlify.app/.netlify/functions/api/v1/movies"
    }, {
      fixture: "allMovies.json"
    })

    cy.visit('http://localhost:3000')
  })

  it("should display the site title upon page load", () => {
    cy.contains("RANCID TOMATILLOS")
  })

  it("should display 10 Tile components upon page load", () => {
    cy.get("ul").find("li").should("have.length", 10)
  })

  it("should render the correct data for the first tile", () => {
    cy.get('[data-cy="694919"]').find("div").find("img").invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get('[data-cy="694919"]').find('[data-cy="img-container"]').trigger("mouseover")
      .find('[data-cy="overlay"]').find("p").first().contains("Money Plane")
    cy.get('[data-cy="694919"]').find('[data-cy="img-container"]').find('[data-cy="overlay"]').find("p").last().contains("(2020)")
    cy.get('[data-cy="694919"]').find('[data-cy="displayed-tile-rating"]').contains("7")
  })

  it("should render the correct data for the last tile", () => {
    cy.get('[data-cy="632618"]').find("div").find("img").invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//sDi6wKgECUjDug2gn4uODSqZ3yC.jpg")
    cy.get('[data-cy="632618"]').find('[data-cy="img-container"]').trigger("mouseover")
      .find('[data-cy="overlay"]').find("p").first().contains("The Crimes That Bind")
    cy.get('[data-cy="632618"]').find('[data-cy="img-container"]').find('[data-cy="overlay"]').find("p").last().contains("(2020)")
    cy.get('[data-cy="632618"]').find('[data-cy="displayed-tile-rating"]').contains("5")
  })

  it("should not display the search bar immediately upon page load", () => {
    cy.get('[data-cy="input-container"]').find("i").should("not.have.class", "icon-transition")
    cy.get('[data-cy="input-container"]').find("input").should("not.have.class", "input-transition")
  })

  it("should display the search bar when the search icon is clicked", () => {
    cy.get('[data-cy="input-container"]').find("i").click()
      .should("have.class", "icon-transition")
    cy.get('[data-cy="input-container"]').find("input").should("have.class", "input-transition")
  })

  it("should allow text input into the search bar", () => {
    cy.get('[data-cy="input-container"]').find("i").click()
    cy.get('[data-cy="input-container"]').find("input").type("c")
      .should("have.value", "c")
  })

  it("should filter movies by title", () => {
    cy.get('[data-cy="input-container"]').find("i").click()
    cy.get('[data-cy="input-container"]').find("input").type("lan")
    cy.get("ul").find("li").should("have.length", 2)
    cy.get('[data-cy="337401"]').should("be.visible")
    cy.get('[data-cy="694919"]').should("be.visible")
  })

  it("should display a message when no movies match the current query", () => {
    cy.get('[data-cy="input-container"]').find("i").click()
    cy.get('[data-cy="input-container"]').find("input").type("foobar")
    cy.contains("No movies matching your search")
  })

  it("should navigate to the \"movie detail view\" when a movie tile is clicked", () => {
    cy.get('[data-cy="694919"]').click()
    cy.url().should("equal", "http://localhost:3000/694919")
  })
})