// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Load saved events from local storage
  loadEvents();

  // Add click event for the save button
  $(".saveBtn").on("click", function () {
    // Get the clicked button's parent element (time-block)
    var timeBlock = $(this).closest(".time-block");

    // Get the hour from the time-block's ID
    var hour = timeBlock.attr("id").split("-")[1];

    // Get the text from the textarea
    var eventText = timeBlock.find(".description").val();

    // Save the event to local storage
    saveEvent(hour, eventText);
  });

  // Function to load events from local storage
  function loadEvents() {
    for (var i = 9; i <= 17; i++) {
      var eventText = localStorage.getItem("event-" + i);

      // If there is a saved event, update the textarea
      if (eventText) {
        $("#hour-" + i + " .description").val(eventText);
      }
    }
  }

  // Function to save events to local storage
  function saveEvent(hour, eventText) {
    localStorage.setItem("event-" + hour, eventText);
  }

  // Function to update the time-block colors based on the current time
  function updateColors() {
    var currentHour = dayjs().hour() 

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Update time-block colors on page load
  updateColors();
});


// $(function () {
// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
// });
