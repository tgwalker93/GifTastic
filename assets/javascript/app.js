      // Initial array of movies
      var giphys = ["Pikachu", "Sonic", "Mario", "Donkey Kong", "Link", "Kirby", "Spyro", "Megaman"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayGiphyInfo() {

      	$("#giphyView").html("");


        var giphyName = $(this).attr("data-name");
        // Example queryURL for Giphy API
        var apiKey = "api_key=dc6zaTOxFJmzC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + giphyName;


        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);

          // Creating a div to hold the giphy
          var giphyDiv = $("<div>");


          // var giphyURL = response.data[0].embed_url;
          // var giphy = $("<iframe>").attr("src", giphyURL);
          // giphyDiv.append(giphy);
          var giphyCount = 0;
          for(i=0; i<10; i++){
			  var iDiv = $("<div id='giphyWithRating'>");
			  var giphyRating = "<h1> Rating: " + response.data[i].rating + "</h1>";
			  iDiv.append(giphyRating);
              var giphyURL = response.data[i].images.fixed_width_still.url;
              var giphy = $("<img>").attr("src", giphyURL);
              giphy.attr("class", "giphyResult");
              giphy.attr("data-giphycount", giphyCount);
              giphy.attr("data-name", giphyName);
              giphyCount++;
              giphy.attr("data-isMoving", "false");
              //.attr( )
              iDiv.append(giphy);
              giphyDiv.append(iDiv);
          }
          // var isStill
          // on click for i giphy
          // 	if isStill === true :
          // 		i = response.data.GIPHY
          			// ELSE 
          			//STILL IMAGE








       $("#giphyView").prepend(giphyDiv);
        });

      }

      // Function for displaying giphy data
      function renderButtons() {
        // Deleting the giphy prior to adding new giphy
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonsView").empty();

        // Looping through the array of giphy
        for (var i = 0; i < giphys.length; i++) {

          // Then dynamicaly generating buttons for each giphy in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of giphy to our button
          a.addClass("giphy");
          // Adding a data-attribute
          a.attr("data-name", giphys[i]);
          //a.attr("id", giphys[i]);
          // Providing the initial button text
          a.text(giphys[i]);
          // Adding the button to the buttons-view div
          $("#buttonsView").append(a);
        }
      }

      // This function handles events where a giphy button is clicked
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var giphy = $("#giphy-input").val().trim();

        // Adding giphy from the textbox to our array
        giphys.push(giphy);

        // Calling renderButtons which handles the processing of our giphy array
        renderButtons();
      });






      function playGiphy() {

      	var giphyObject = $(this);
        var giphy = $(this).attr("data-name");
        var giphyisMovingAttribute = $(this).attr("data-isMoving");
      	var giphyCount = $(this).attr("data-giphycount");
        // Example queryURL for Giphy API
        var apiKey = "api_key=dc6zaTOxFJmzC";
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + giphy;


        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

      	if(giphyisMovingAttribute==="true"){
      		giphyObject.attr("src", response.data[giphyCount].images.fixed_width_still.url);
      		giphyObject.attr("data-isMoving", false);
      	}else {
      		giphyObject.attr("src", response.data[giphyCount].images.fixed_width.url);
        	giphyObject.attr("data-isMoving", true);
      	}
   





              });


    }


      // Adding a click event listener to all elements with a class of "giphy"
      $(document).on("click", ".giphy", displayGiphyInfo);
      $(document).on("click", ".giphyResult", playGiphy);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();