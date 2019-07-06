//script that will affect the saved page
$(document).ready(function () {
    console.log ("the saved.js page loaded");
    $(document).on("click", ".get-btn", function() {
        // Save the selected element
        var selected = $(this).parents("div.card-body");
        console.log("Save button clicked");
        var id = selected.find("p.card-id").text();
        var title = selected.find("h5.card-title").text();
        console.log(id + title);
        $(".modal-title").text("Add a note for " + title);
        // Make an AJAX POST request
        // This uses the data-id of the update button,
        // which is linked to the specific note title
        // that the user clicked before
        // $.ajax({
        //   type: "GET",
        //   url: "/headlines/" + id,
        //   })
        //   .then(function(data){
            
        //     if (data.note) {
        //       $(".modal-title").val(data.note.title);
        //       $(".modal-body").val(data.note.noteText);
        //     }
        //   })
        //   // On successful call
        //   // success: function(data) {
        //   //   window.location.reload();
        //   //   // Clear the inputs
        //   //   // $("#note").val("");
        //   //   // $("#title").val("");
        //   //   // // Revert action button to submit
        //   //   // $("#action-button").html("<button id='make-new'>Submit</button>");
        //   //   // Grab the results from the db again, to populate the DOM
        //   //   //getResults();
        //     console.log($(this));
          });
});
    
    

