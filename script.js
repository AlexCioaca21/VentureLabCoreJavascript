var apiId = "fe7364b5&r";
var urlRoot = "http://www.omdbapi.com/?apikey=";

var title = document.getElementById("title");
var search = document.getElementById("search");
var container = document.getElementById("container");
var inputValidity = true;

var movieList = [];

search.addEventListener("click", showMovies);
title.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    showMovies();
  }
});

function showMovies() {
  validateInput();

  if (inputValidity) {
    getData();
  }
}

function validateInput() {
  let title = document.getElementById("title");

  if (title.value === "") {
    inputValidity = false;
    title.classList.add("formInputInvalid");
  } else {
    title.classList.remove("formInputInvalid");
  }
}

function getData() {
  container.innerHTML = "";
  let title = document.getElementById("title");
  let searchTitle = title.value;
  let url1 = urlRoot + apiId + "&type=movie&s=" + searchTitle;
  fetchPages(url1, 1).then((numberOfPages) => {
    fetchResults(url1, numberOfPages);
  });
}

function fetchPages(url, numberOfPages) {
  return fetch(url + "&page=" + numberOfPages)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.Response === "True") {
        let numberOfPages =
          Math.floor(parseInt(response.totalResults) / 10) + 1;
        return numberOfPages;
      }
    });
}

function fetchResults(url, numberOfPages) {
  for (let page = 1; page <= numberOfPages; page++) {
    fetch(url + "&page=" + page)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        response.Search.forEach((element) => {
          let newMovie = new Item(element);
          movieList.push(newMovie);

          addMovie(newMovie);
        });
      });
  }
  return movieList;
}

function Item(element) {
  this.poster = element.Poster;
  this.title = element.Title;
  this.type = element.Type;
  this.year = element.Year;
  this.imdbId = element.imdbID;
}

function addMovie(obj) {
  var posterCell = document.createElement("img");
  posterCell.setAttribute("src", obj.poster);

  var titleCell = document.createElement("p");
  titleCell.innerText = obj.title;

  var yearCell = document.createElement("p");
  yearCell.innerText = obj.year;

  var typeCell = document.createElement("p");
  typeCell.innerText = obj.type;

  var linkCell = document.createElement("a");
  //   linkCell.next().insertBefore(linkCell);
  //   linkCell.style.bottom = "60px";
  //   linkCell.insetAfter(posterCell);
  linkCell.innerText = "Details";
  linkCell.setAttribute("href", "movie.html?id=" + obj.imdbId);
  linkCell.setAttribute("target", "_blank");

  var cell = document.createElement("div");
  cell.style.border = "solid 1px";

  cell.appendChild(titleCell);
  cell.appendChild(yearCell);
  cell.appendChild(typeCell);
  cell.appendChild(linkCell);
  cell.appendChild(posterCell);

  container.appendChild(cell);
}
