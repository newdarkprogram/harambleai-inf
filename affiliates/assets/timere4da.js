let dollarValue = parseInt(localStorage.getItem("dollarValue")) || 1091566;
let currentValue = dollarValue; // Initialize the current value with the initial dollarValue
let increaseValue = 93142;
const __endDates = document.querySelectorAll("[data-id-rewards]");
const __days = document.querySelectorAll("[data-days-id-rewards]");
const __hours = document.querySelectorAll("[data-hours-id-rewards]");
const __minutes = document.querySelectorAll("[data-mins-id-rewards]");
const __secs = document.querySelectorAll("[data-secs-id-rewards]");
// Set the initial end date and time (December 21, 2023, 23:59:00)
let endDate = new Date("June 1, 2024 00:00:00 UTC");
function updateEndDate() {
  // Add 14 days to the end date
  endDate.setDate(endDate.getDate() + 2);
  currentValue += increaseValue;
}
function countdown() {
  const currentTimeUTC = new Date(new Date().toUTCString());
  let endDateUTC = new Date(endDate.toUTCString());
  const currentTime = new Date();

  let remainingSeconds = Math.floor((endDateUTC - currentTimeUTC) / 1000);
  let days = Math.floor(remainingSeconds / 3600 / 24);
  let hours = Math.floor(remainingSeconds / 3600) % 24;
  let minutes = Math.floor(remainingSeconds / 60) % 60;
  let seconds = remainingSeconds % 60;
  localStorage.setItem("seconds", remainingSeconds);

  // Update minutes only if remaining seconds, remaining hours, or remaining minutes are not zero
  if (
    remainingSeconds > 0 ||
    hours > 0 ||
    minutes > 0 ||
    seconds > 0 ||
    endDate >= currentTime
  ) {
    __days.forEach((day) => {
      day.innerHTML = formatTime(days);
    });
    __hours.forEach((hour) => {
      hour.innerHTML = formatTime(hours);
    });
    __minutes.forEach((minute) => {
      minute.innerHTML = formatTime(minutes);
    });
    __secs.forEach((sec) => {
      sec.innerHTML = formatTime(seconds);
    });
  }

  // Format and display the end date
  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  let result;

  if (formattedEndDate.split(" ")[1] == 1) {
    result = "st!";
  } else if (formattedEndDate.split(" ")[1] == 2) {
    result = "nd!";
  } else if (formattedEndDate.split(" ")[0] == 3) {
    result = "rd!";
  } else {
    result = "th!";
  }
  if (remainingSeconds > 0 || hours > 0 || minutes > 0 || seconds > 0) {
    __endDates.forEach((endDates) => {
      endDates.innerHTML =
        formattedEndDate.split(" ")[0] +
        " " +
        formattedEndDate.split(" ")[1] +
        result;
    });
  }
  // If remaining time is zero, update the end date
  /*if (remainingSeconds <= 0) {
    //updateEndDate();
    endDateUTC = new Date(endDate.toUTCString()); // Update endDateUTC after changing endDate

    remainingSeconds = Math.floor((endDateUTC - currentTimeUTC) / 1000);
  }*/
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(countdown);

// 15 MINUTES LAPS

window.onload = function () {
  var timers = document.querySelectorAll('p[id^="checkout-timer"]');
  var svgElement = document.getElementById("counter-svg");
  var initialTime = 900;
  var totalDashLength = 150;
  var maxDashOffset = -150;

  function countdown(timerElement, timeLeft) {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    // Update the timer element if it exists
    if (timerElement) {
      timerElement.innerHTML =
        minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }

    if (timeLeft === 0) {
      clearInterval(timer);
      // Update SVG dash offset to -150 when timer reaches 0:00
      svgElement.setAttribute("stroke-dashoffset", maxDashOffset);
      timerElement.innerHTML = "Time is up!";
      window.location.href = "/";
    } else {
      // Calculate the new dash offset value based on the timer progress
      var dashOffset =
        -((initialTime - timeLeft) / initialTime) * totalDashLength;
      // Ensure the dash offset doesn't exceed the maximum value
      dashOffset = Math.max(maxDashOffset, dashOffset);
      // Update the SVG dash offset
      svgElement.setAttribute("stroke-dashoffset", dashOffset);
      timeLeft--;
    }
  }

  // Start countdown for each timer
  timers.forEach(function (timerElement) {
    var timeLeft = initialTime;
    countdown(timerElement, timeLeft);
    var timer = setInterval(function () {
      countdown(timerElement, timeLeft);
      timeLeft--;
    }, 1000);
  });
};
