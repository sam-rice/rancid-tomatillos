describe("All Movies View", () => {

  beforeEach(() => {
    cy.intercept({
      method: "GET",
      url: "https://rancid-tomatillos.herokuapp.com/api/v2/movies" 
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
    cy.get("ul").find("li").first().find("div").find("img").invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
    cy.get("ul").find("li").first().find(".img-container").trigger("mouseover")
      .find(".overlay").find("p").first().contains("Money Plane")
    cy.get("ul").find("li").first().find(".img-container").find(".overlay").find("p").last().contains("(2020)")
    cy.get("ul").find("li").first().find("p").contains("6.9")
  })

  it("should render the correct data for the last tile", () => {
    cy.get("ul").find("li").last().find("div").find("img").invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//sDi6wKgECUjDug2gn4uODSqZ3yC.jpg")
    cy.get("ul").find("li").last().find(".img-container").trigger("mouseover")
      .find(".overlay").find("p").first().contains("The Crimes That Bind")
    cy.get("ul").find("li").last().find(".img-container").find(".overlay").find("p").last().contains("(2020)")
    cy.get("ul").find("li").last().find("p").contains("4.9")
  })

  it("should not display the search bar immediately upon page load", () => {
    cy.get(".input-container").find("i").should("not.have.class", "icon-transition")
    cy.get(".input-container").find("input").should("not.have.class", "input-transition")
  })

  it("should display the search bar when the search icon is clicked", () => {
    cy.get(".input-container").find("i").click()
      .should("have.class", "icon-transition")
    cy.get(".input-container").find("input").should("have.class", "input-transition")
  })

  it("should allow text input into the search bar", () => {
    cy.get(".input-container").find("i").click()
    cy.get(".input-container").find("input").type("c")
      .should("have.value", "c")
  })

  it("should filter movies by title", () => {
    cy.get(".input-container").find("i").click()
    cy.get(".input-container").find("input").type("lan")
    cy.get("ul").find("li").should("have.length", 2)
      .last().find("div").find("img").invoke("attr", "src").should("eql", "https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg")
  })

  it("should display a message when no movies match the current query", () => {
    cy.get(".input-container").find("i").click()
    cy.get(".input-container").find("input").type("foobar")
    cy.contains("No movies matching your search")
  })

  it("should navigate to the \"movie detail view\" when a movie tile is clicked", () => {
    cy.get("ul").find("li").first().click()
    cy.url().should("equal", "http://localhost:3000/694919")
  })
})