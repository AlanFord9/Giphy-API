// Array to hold animal entries
var animals = [];

// Function for adding buttons
function renderButtons() {

    // Deleting the animal buttons prior to adding new animal buttons
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

      // Then dynamicaly generating buttons for each animal in the array.
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

    // Function for dumping the JSON content for each button into the div
    $(".animal").on("click", function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";
    
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            var results = response.data;
            
            for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");

            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height.url);
            animalImage.attr("alt", "animal gif");

            gifDiv.append(animalImage)

            $("#animals-view").prepend(gifDiv);
            }
        });
    })
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var animalButton = $("#animal-input").val().trim();
    // The animal from the textbox is then added to our array
    animals.push(animalButton);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });




// https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9

// 8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl

// https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q={animal}&limit=10&offset=0&rating=G&lang=en