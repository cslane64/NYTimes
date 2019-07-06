//script that will affect the saved page
$(document).ready(function () {
    console.log ("the saved.js page loaded");
    $(document).on("click", "save-btn", function() {
        // Save the selected element
        var selected = $(this).parents("#myModal");
        console.log("Save button clicked");
        var id = selected.find("h5.modal-title").text();
        console.log(id);
        
        // Make an AJAX POST request
        // This uses the data-id of the update button,
        // which is linked to the specific note title
        // that the user clicked before
        // $.ajax({
        //   type: "POST",
        //   url: "/api/notes/" + id,
        //   dataType: "json",
        //   data: {
        //     title: $("modal-title").val(),
        //     noteText: $("modal-body").val()
            
        //   },
        //   // On successful call
        //   success: function(data) {
        //     window.location.reload();
        //     // Clear the inputs
        //     // $("#note").val("");
        //     // $("#title").val("");
        //     // // Revert action button to submit
        //     // $("#action-button").html("<button id='make-new'>Submit</button>");
        //     // Grab the results from the db again, to populate the DOM
        //     //getResults();
        //     console.log($(this));
        //   }
        // });
      });
    
});
