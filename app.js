// Array to hold animal entries
var animals = [];

// Function for creating new animal buttons
function renderButtons() {

    // Deleting the animal buttons prior to adding new animal buttons
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

      // Generating buttons for each animal in the array.
      var a = $("<button>");
      a.addClass("animal");
      a.attr("data-name", animals[i]);
      a.text(animals[i]);
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
            console.log(results);
            
            for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");

            var animalImage = $("<img>");

            animalImage.attr("src", results[i].images.fixed_height_still.url)
            animalImage.attr("data-state", "still");
            animalImage.attr("alt", "animal gif");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.addClass("gif")

            gifDiv.append(animalImage)

            $("#animals-view").prepend(gifDiv);
            }

            $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
        });
    })
  }

  // Function to push animals to array and renderButtons()
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var animalButton = $("#animal-input").val().trim();
    animals.push(animalButton);
    renderButtons();
  });




// https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9

// 8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl

// https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q={animal}&limit=10&offset=0&rating=G&lang=en