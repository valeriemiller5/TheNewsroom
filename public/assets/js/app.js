// clicking the "Click Here for Articles" nav button will show the stories retrieved from patch.com
$(".articles").on("click", function(event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrape"
      }).then(function(data) {
        console.log(data);
        location.reload();
      })
      alert("New Stories Found. \nPlease wait while stories load.");
});

// When the "Save as Favorite" button is clicked, story is saved on favorites.handlebars
$(".saveBtn").on("click", function(event) {
  console.log('button is clicked');
  var thisId = $(this).attr("data-id");

  $.ajax({
    type: "POST",
    url: "/news/save/" + thisId,
  }).then(function() { 
  location.reload();
  })
  alert("Story has been saved!");
})
    

// When the "Comment on this Story" button is clicked and saved, the comment is saved to the database
$(".commentBtn").on("click", function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    
    $.ajax({
      method: "GET",
      url: "/news/comment/" + thisId
    }).then(function(data) {
      console.log(data);
      $("#comments").append(data.comments);
    })
});

// When "Delete Story from Favorites" button is clicked, news article is removed from favorites
$(".deleteBtn").on("click", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/news/delete/" + thisId
  }).then(function() {
    location.reload();
  })
  alert("Story has been removed from favorites.");
})

// Clear all articles from index.handlebars so that new articles can be retrieved
$(".clear").on("click", function(event) {
  event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "/clear"
    }).then(function() {
      location.reload();
    })
    alert("Stories have been removed.");
})

// Go to Favorites page
$(".favorites").on("click", function(event) {
  event.preventDefault();
  window.location.replace("/favorites");
});