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
      alert("New Stories Found");
});

// When the "Save as Favorite" button is clicked, story is saved
    

// When the "Comment on this Story" button is clicked and saved, the comment is saved to the database
// $().on("click", function(event) {
//     event.preventDefault();
//     // Pull up comment form
//     // Save comments
//     // Create a div that comments are appended to, so that each comment is seen
// });

// Go to Favorites page
$(".favorites").on("click", function(event) {
  event.preventDefault();
  window.location.replace("/favorites");
});