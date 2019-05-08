var snacks = ['cheese', 'pretzels', 'apple', 'chocolate', 'almonds', 'cookies', 'candy', 'donuts'];
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
            var gifID = response.data[i].id;
            $("#gifs-view").append('<img id="' + gifID + '" src="' + gifURL + '" data-state="still" class="border border-white">');
            $("#gifs-view").append(response.data[i].rating);
            console.log(this);
        }
        
    });     
}

$(document).on("click", ".snacks", displayGifs);


    function animate() {
        var gifID = $(this).attr("id");   
        
        var queryURL = "https://api.giphy.com/v1/gifs/" + gifID+ "?api_key=JH6y2mxfZu7D4wIPyQa5dmWh3IfY4pG1&q";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){

            if ($("#" + gifID).attr("data-state") === "still") {
            var animateURL = response.data.images.fixed_height.url;
            $("#" + gifID).attr("src", animateURL);
            $("#" + gifID).attr("data-state", "animate");
            } else if ($("#" + gifID).attr("data-state") === "animate") {
                var gifURL = response.data.images.fixed_height_still.url;
                $("#" + gifID).attr("src", gifURL);
                $("#" + gifID).attr("data-state", "still");
            }
        });     
  
    }
    


$('#gifs-view').on('click', 'img', animate);




$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var snack = $("#topic-input").val().trim();
    snacks.push(snack);
    addButton();
});