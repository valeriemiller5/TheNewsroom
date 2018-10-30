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
      alert("New Stories Found. \n\nPlease wait while stories load.");
});

// When the "Save as Favorite" button is clicked, story is saved on favorites.handlebars
$(".saveBtn").on("click", function(event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    type: "POST",
    url: "/news/save/" + thisId,
  }).then(function() { 
  location.reload();
  })
  alert("Story has been saved!");
})

$("#openComment").on("click", function(event) {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/newComment/" + thisId
  }).then(function(data) {
    console.log(data);
  })
});
    

// When the "Save Comment" button in the modal is clicked, the comment is saved to the database
$(".commentBtn").on("click", function(event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    
    $.ajax({
      method: "POST",
      url: "/newComment/" + thisId,
      data: {
        // value of the text input in the text box of the comments section
        body: $("#newComment" + thisId).val()
      }
    }).then(function(data) {
      console.log(data);
      location.reload();
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

// Function for "Scroll to the Top" button, allows user to click button to go back to the top of the page
function topFunction() {
  var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
  if (isSafari) {
      document.body.scrollTop = 0; // For Safari
  } else {
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera, etc.
  }
}