var nflArray = [
    "New England Patriots", 
    "Philadelphia Eagles", 
    "Jacksonville Jaguars",
    "Minnesota Vikings",
    "Tennessee Titans",
    "Atlanta Falcons",
    "Pittsburgh Steelers",
    "New Orleans Saints",
    "Tom Brady",
    "Carson Wentz",
    "Blake Bortles",
    "Case Keenum",
    "Marcus Mariota",
    "Matt Ryan",
    "Ben Rothlisberger",
    "Drew Brees"];

function displayNFLinfo() {
    var name = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=mogdpf6eE8xYDliu5PXAltoa5CJUc8Jv&q="
                    + name +
                    "&limit=10&lang=en";
    
                    
    //ajax call for our API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        console.log(response);
        //After the API has loaded, simplify the array by creating a new variable
        var giphyArray = response.data;
        //loop through the array to establish properties for each gif
        giphyArray.forEach(function(giphy){
            //Div is used to post the rating and gif
            var nflDiv = $("<div>");
            //extract the rating and places it in a paragraph
            var ratingP = $("<p>").text("Rating: "+giphy.rating);
            //extracts animated and still images of each provided gif
            var nflImage = $("<img>")
                            .attr("src", giphy.images.fixed_height_still.url)
                            .attr("data-still",giphy.images.fixed_height_still.url)
                            .attr("data-animate",giphy.images.fixed_height.url)
                            .attr("data-state", "still")
                            .addClass("gif");
            nflDiv.append(ratingP);
            nflDiv.append(nflImage);
            $("#giphy-area").prepend(nflDiv);
        });
    });


}

function displayButtons() {
    //empty out buttons and reload after each submission
    $("#button-area").empty();
    //looping through the NFL array to create a button for each element
    nflArray.forEach(function(name){
        //button will need the class for CSS styling, text to appear for the button and data attribute for
        //when it plugs into the API
        var nflButton = $("<button>")
                        .attr("type","button")
                        .addClass("nflAPI")
                        .text(name)
                        .attr("data-name",name);
        //append the button to the button area
        $("#button-area").append(nflButton);
    });
}

//when a user wants to search for new teams/players 
$("#add-nfl").on("click", function(event){
    //function to not allow a blank submission
    event.preventDefault();
    //pull the value off of the text input and assign it to a variable the wipe the text area out
    var nflAddition = $("#nfl-input").val().trim();
    $("#nfl-input").val("");
    
    //push the addition into the nflArray
    nflArray.push(nflAddition);

    //display the new button to list that is provided
    displayButtons();
});
//Function is designed to toggle between animate and still for each gif
$(document).on("click",".gif", function() {
    var state = $(this).attr("data-state");
    if(state === "still") {
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
    } else {
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

//A listener event on the whole document when the user clicks on one of the buttons
$(document).on("click",".nflAPI",displayNFLinfo);

displayButtons();