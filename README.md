# fetch-api-and-write-to-dom

An example fetching data from a movies api and writing content to the dom.

- Example Webflow site: https://fetch-api-and-write-to-dom.webflow.io/
- Using the TMDB api: https://developers.themoviedb.org/3/getting-started/introduction

# How it works

In Webflow, we build most of the user interface elements and then append the data. In this example, we're getting movies from the api, creating some images in our code, and appening them to a featured movie section and a grid container. The majority of styling will be completed in Webflow. We've done minor styling in our code to hide/show some elements before/after getting the data.

The screenshot below shows the set up we've initially built in Webflow. It begins with a pre-loader which will be removed after getting our data.

The featured movie section contains heading and paragraph elements which we'll use to assign the featured movie title and description. In Webflow, we created a class called `.hero-image`. In our code, we will assign this class to an image that we create before appending it to the featured movie section.

Finally, we append the list of movies to the movie grid section.

![image showing annotations in the Webflow Designer](https://p-zmfjbkd.t2.n0.cdn.getcloudapp.com/items/X6uQkl8Z/1f7e4b59-4c92-4c2d-8ba4-d3fa17741bac.jpg?)

# The Javascript

The code begins by setting global variables from our API. Namely, the base URL's for movie poster images, background movie poster, and the main API URL.

Next is an async await function to get the data. If there is an error, we remove the preloader and show an error message. The error message is made in Webflow and is initially set to display none. In our code, we set it to display block if there is an error when fetching data.

Next is the async await function to get our data and assign it to a variable.

Next we get our page elements.

Next we set the movie grid opacity to 0% because the Webflow class has a transition on the opacity. This will give it a fade in effect when we add 100% opacity later in our code. We also set overflow hidden on the body to temporarily hide the scrollbar.

Now we set the last movie as the featured movie.

Next we assign the featured movie values to the page elements.

Next we iterate through our movies, create an image on each iteration, assign the Webflow class to the image, set the source of the image based on the global poster path + the specific movie poster path, and append it to the movie grid element.

Finally, we remove the pre-loader by reducing its opacity, adding a class from Webflow to hide it, and increasing the movie grid opacity. We also add the scrollbar back to the body.

```js
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
  }, 1500);
});
```
