//script that will affect the index page
$(document).ready(function () {
    console.log ("the index.js page loaded");

    $(document).on("click", ".save-btn", function() {
      // Save the selected element
      var selected = $(this).parents("div.card-body");
      //console.log("Save button clicked");
      var id = selected.find("p.card-id").text();
      //console.log($(this).text());
      
      // Make an AJAX POST request
      // This uses the data-id of the update button,
      // which is linked to the specific note title
      // that the user clicked before
      $.ajax({
        type: "POST",
        url: "/update/" + id,
        dataType: "json",
        data: {
          saved: true
          
        },
        // On successful call
        success: function(data) {
          window.location.reload();
          // Clear the inputs
          // $("#note").val("");
          // $("#title").val("");
          // // Revert action button to submit
          // $("#action-button").html("<button id='make-new'>Submit</button>");
          // Grab the results from the db again, to populate the DOM
          //getResults();
          console.log($(this));
        }
      });
    });



});

    
    

