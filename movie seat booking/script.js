// selectors
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//set movie data
function setMovieData(selectedMovie, selectedmoviePrice) {
  localStorage.setItem("selectedMovieIndex", selectedMovie);
  localStorage.setItem("selectedMoviePrice", selectedmoviePrice);
}

//update selected count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = selectedSeats.length;

  const selectedSeatIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("SelectedSeatIndex", JSON.stringify(selectedSeatIndex));

  count.innerText = selectedSeatCount;
  total.innerText = selectedSeatCount * ticketPrice;
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("SelectedSeatIndex"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//movie select event listener
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Seats allocation
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});

//Update selected count globally
updateSelectedCount();
