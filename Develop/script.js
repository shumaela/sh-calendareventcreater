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


