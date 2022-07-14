const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

window.addEventListener("load", showTitle);

function showTitle() {
  fetch("http://www.omdbapi.com/?apikey=53729abd&s=" + id)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network error");
    })
    .then(function (data) {
      console.log(data);
      renderTable(data);
    });
}

function renderTable(data) {
  tableBody.innerHTML = "";
  newLine(data);
}

function newLine(movie) {
  var titleCell = document.createElement("td");
  titleCell.innerText = movie.Title;

  var yearCell = document.createElement("td");
  yearCell.innerText = movie.Year;

  var releasedCell = document.createElement("td");
  releasedCell.innerText = movie.Released;

  var genreCell = document.createElement("td");
  genreCell.innerText = movie.Genre;

  var directorCell = document.createElement("td");
  directorCell.innerText = movie.Director;

  var actorsCell = document.createElement("td");
  actorsCell.innerText = movie.Actors;

  var plotCell = document.createElement("td");
  plotCell.innerText = movie.Plot;

  var awardsCell = document.createElement("td");
  awardsCell.innerText = movie.Awards;

  var posterCell = document.createElement("td");
  var posterContent = document.createElement("img");
  posterContent.setAttribute("src", movie.Poster);

  var row = document.createElement("tr");
  row.appendChild(titleCell);
  row.appendChild(yearCell);
  row.appendChild(releasedCell);
  row.appendChild(genreCell);
  row.appendChild(directorCell);
  row.appendChild(actorsCell);
  row.appendChild(plotCell);
  row.appendChild(awardsCell);
  posterCell.appendChild(posterContent);
  row.appendChild(posterCell);

  tableBody.appendChild(row);
}
