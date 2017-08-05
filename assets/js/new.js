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
      // Initial array of movies
      var character_list = ["Jon Snow", "Arya Stark", "Sansa Stark", "Daenerys","Jeoffery"];

      

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < character_list.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button class='btn btn-info' style='margin:10px;'>");
          // Adding a class of movie to our button
          a.addClass("character");
          // Adding a data-attribute
          a.attr("data-name", character_list[i]);
          // Providing the initial button text
          a.text(character_list[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-character").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var character = $("#character-input").val().trim();

        // Adding the character from the textbox to our array
        character_list.push(character);
        console.log(character_list)

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      $("#add_character").on("click", function(){
        console.log("kgjhkgj");

      });

      // Event listener for all button elements
    
      

      // Calling the renderButtons function to display the intial buttons
      renderButtons();




   $(document).on("click", ".character", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-name");
      console.log(person);

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {

          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {


            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img class='gif' data-state='still' data-still='"+results[i].images.fixed_height_still.url+"' data-animate='"+results[i].images.fixed_height.url+"'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_still.url);
             

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);


            }

          }
        });



    });


$(document).on("click", ".gif", function(){

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








