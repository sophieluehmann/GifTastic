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
            var gifURL = response.data[i].images.fixed_height_still.url;
            $("#gifs-view").append('<img id="gif" src="' + gifURL + '" data-state="still">');
            $("#gifs-view").append(response.data[i].rating);
            console.log(this);
        }
        
    });     
}

$(document).on("click", ".snacks", displayGifs);

// add to this to animate/pause the gifs
/*$("#gif").on("click", function() {  
})*/



$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var snack = $("#topic-input").val().trim();
    snacks.push(snack);
    addButton();
});