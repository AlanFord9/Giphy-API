// Array to hold animal entries
var animals = [];

// Function for adding buttons
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("animal");
      // Adding a data-attribute with a value of the movie at index i
      a.attr("data-name", animals[i]);
      // Providing the button's text with a value of the movie at index i
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animal = $("#animal-input").val().trim();
    // The movie from the textbox is then added to our array
    animals.push(animal);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });


// Function for dumping the JSON content for each button into the div
function displayMovieInfo() {

  var animal = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // $("#animals-view").text(JSON.stringify(response));
  });
}


// https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9

// 8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl

// https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q={animal}&limit=10&offset=0&rating=G&lang=en