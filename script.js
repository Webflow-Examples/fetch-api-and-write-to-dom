window.addEventListener("DOMContentLoaded", async () => {
  // global constants
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";
  const API_URL = "https://dev--movies.api-for-webflow.autocode.gg/";

  // functions
  async function getData() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.results;
    } catch (err) {
      errorDetected();
    }
  }

  function errorDetected() {
    document.getElementById("load-icon").style.display = "none";
    document.getElementById("error-msg").style.display = "block";
  }

  // get data
  const movies = await getData();

  // dom elements
  const loader = document.getElementById("loader");
  const hero = document.getElementById("hero");
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-desc");
  const movieGrid = document.getElementById("movie-grid");
  const heroImage = document.createElement("img");

  // initial styles
  movieGrid.style.opacity = "0%";
  document.body.style.overflow = "hidden";

  // set featured movie
  const featuredMovie = movies[movies.length - 1];

  // set hero/featured elements
  heroImage.classList.add("hero-image");
  heroImage.src = featuredMovie
    ? `${BACKDROP_PATH}${featuredMovie.backdrop_path}`
    : null;
  hero.appendChild(heroImage);
  heroTitle.innerText = featuredMovie.title;
  heroDescription.innerText = featuredMovie.overview;

  // iterate through data results
  // create img element for each data item
  // add class to each image (class exists in Webflow)
  // append each item to movie grid
  movies.forEach((movie) => {
    const moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-image");
    moviePoster.src = `${IMAGE_PATH}${movie.poster_path}`;
    movieGrid.appendChild(moviePoster);
  });

  // remove loader and show movie grid
  setTimeout(() => {
    loader.style.opacity = "0%";
    loader.classList.toggle("hide");
    movieGrid.style.opacity = "100%";
    document.body.style.overflow = "auto";
  }, 1500);
});
