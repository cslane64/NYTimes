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
        $(".parent-id").text(id);
        // Make an AJAX POST request
        // This uses the data-id of the update button,
        // which is linked to the specific note title
        // that the user clicked before
        $.ajax({
          type: "GET",
          url: "/notes/" + id,
          })
          .then(function(data){
            console.log("-----------------------------------");
            console.log(data);
            console.log("-----------------------------------");
            // if (data.note) {
            //   console.log(data.note.noteText)
            //    $(".modal-title").val(data.note.title);
            //    $(".modal-body").val(data.note.noteText);
            // }
          })
          // On successful call
          // success: function(data) {
          //   window.location.reload();
          //   // Clear the inputs
          //   // $("#note").val("");
          //   // $("#title").val("");
          //   // // Revert action button to submit
          //   // $("#action-button").html("<button id='make-new'>Submit</button>");
          //   // Grab the results from the db again, to populate the DOM
          //   //getResults();
            //console.log($(this));
          });

          $(document).on("click", ".note-btn", function() {
            // Save the selected element
            var selected = $(this).parents("div.modal-content");
            console.log("Save Note button clicked");
            var id = selected.find("p.parent-id").text();
            var title = selected.find("h5.modal-title").text();
            var noteText = selected.find("#user-note").val();
            console.log(id + title + noteText);

            $.ajax({
              method: "POST",
              url: "/api/notes/" + id,
              data: {
                // Value taken from title input
                title: title,
                // Value taken from note textarea
                noteText: noteText 
              }
            })
              .then(function(data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                
              })
            
              //$("#my-modal").modal("toggle")
          });

          $(document).on("click", ".del-btn", function() {
            // Save the selected element
            var selected = $(this).parents("div.card-body");
            console.log("Delete from saved button clicked");
            var id = selected.find("p.card-id").text();
            //console.log($(this).text());
            console.log(id);
            
            // Make an AJAX POST request
            // This uses the data-id of the update button,
            // which is linked to the specific note title
            // that the user clicked before
            $.ajax({
              type: "POST",
              url: "/saved/" + id,
              dataType: "json",
              data: {
                saved: false
                
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
    
    

