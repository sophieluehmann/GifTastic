var snacks = ['cheese', 'pretzels', 'apple', 'chocolate', 'almonds', 'cookies', 'vodka', 'Jennifer Lopez'];
console.log(snacks);

$(document).ready(function(){
    for (var i=0; i<snacks.length; i++) {
        var a = $("<button>");
        a.addClass("snacks");
        a.attr("snack-name", snacks[i]);
        a.text(snacks[i]);
        $("#buttons-view").append(a);
    };
});

function addButton() {
    $("#buttons-view").empty();
    for (var i=0; i<snacks.length; i++) {
        var a = $("<button>");
        a.addClass("snacks");
        a.attr("snack-name", snacks[i]);
        a.text(snacks[i]);
        $("#buttons-view").append(a);
    };
}


function displayGifs() {
    var gifName = $(this).attr("snack-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JH6y2mxfZu7D4wIPyQa5dmWh3IfY4pG1&q=" + gifName + "&limit=10&offset=0&rating=PG&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        $("#gifs-view").empty();
        console.log(response)
        for (i=0; i<response.data.length; i++) {
            console.log(response.data[i].images.fixed_height_still.url);
            var gifURL = response.data[i].images.fixed_height_still.url;
            $("#gifs-view").append('<img src="' + gifURL + '">');
        }
        
    });     
}

$(document).on("click", ".snacks", displayGifs);

$("img").on("click", function() {
    
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
      $(this).attr("data-state", "animate");
      console.log($(this).attr("data-animate"));
      $(this).attr("src", $(this).attr("data-animate"));
    }

    if (state === "animate") {
      $(this).attr("data-state", "still");
      console.log($(this).attr("data-still"));
      $(this).attr("src", $(this).attr("data-still"));
    }
});



$("#add-topic").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var snack = $("#topic-input").val().trim();

    // The movie from the textbox is then added to our array
    snacks.push(snack);

    // Calling renderButtons which handles the processing of our movie array
    addButton();
});