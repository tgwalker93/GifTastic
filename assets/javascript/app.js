      // Initial array of movies
      var movies = ["Pikachu", "Sonic", "Mario", "Donkey Kong"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        // Example queryURL for Giphy API
        var apiKey = "api_key=dc6zaTOxFJmzC";
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + movie;


        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {


          // Creating a div to hold the giphy
          var giphyDiv = $("<div class='giphy'>");


          // var giphyURL = response.data[0].embed_url;
          // var giphy = $("<iframe>").attr("src", giphyURL);
          // giphyDiv.append(giphy);

          for(i=0; i<5; i++){
              var giphyURL = response.data[i].embed_url;
              var giphy = $("<iframe>").attr("src", giphyURL);
              giphyDiv.append(giphy);
          }



          $("#giphyView").prepend(giphyDiv);
        });

      }

      // Function for displaying giphy data
      function renderButtons() {

        // Deleting the giphy prior to adding new giphy
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonsView").empty();

        // Looping through the array of giphy
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each giphy in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of giphy to our button
          a.addClass("giphy");
          // Adding a data-attribute
          a.attr("data-name", movies[i]);
          // Providing the initial button text
          a.text(movies[i]);
          // Adding the button to the buttons-view div
          $("#buttonsView").append(a);
        }
      }

      // This function handles events where a giphy button is clicked
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#giphy-input").val().trim();

        // Adding giphy from the textbox to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our giphy array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "giphy"
      $(document).on("click", ".giphy", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();