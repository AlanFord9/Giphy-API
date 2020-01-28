// Array to hold animal entries
var animals = ["dog", "cat", "rabbit", "goldfish"];

// Function for creating new animal buttons
function renderButtons() {

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

        $("#animals-view").empty()

        // API Key and endpoint 
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8TQfjYKAsaDK2R2tN6TX1b828NjgYaBl&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";
    
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
        // Looping through results
            for (var i = 0; i < results.length; i++) {

            // Creating img and div elements
            var gifDiv = $("<div>");
            var animalImage = $("<img>");
            // Applying attributes to the gif produced
            animalImage.attr("src", results[i].images.fixed_height_still.url)
            animalImage.attr("data-state", "still");
            animalImage.attr("alt", "animal gif");
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.addClass("gif")

            gifDiv.append(animalImage)

            $("#animals-view").append(gifDiv);
            }

            // Pause and play gif when they are clicked
            $(".gif").on("click", function() {
            // Stored data-state in a variable
                var state = $(this).attr("data-state");
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

  renderButtons();

