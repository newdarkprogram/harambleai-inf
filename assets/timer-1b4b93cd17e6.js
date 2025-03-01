// TIMER JS
let dollarValue = parseInt(localStorage.getItem("dollarValue")) || 4342278;
let currentValue = dollarValue; // Initialize the current value with the initial dollarValue
let increaseValue = 20142;
const __days = document.querySelector("#days");
const __hours = document.querySelector("#hours");
const __minutes = document.querySelector("#minutes");
const __secs = document.querySelector("#secs");
const __daysSecond = document.querySelector("#daysSecond");
const __hoursSecond = document.querySelector("#hoursSecond");
const __minutesSecond = document.querySelector("#minutesSecond");
const __secsSecond = document.querySelector("#secsSecond");
const __endDates = document.querySelectorAll("[data-id]");

// Set the initial end date and time (December 21, 2023, 23:59:00)
let endDate = new Date("May 27, 2024 5:59:00 UTC");

function updateEndDate() {
  // Add 14 days to the end date
  endDate.setDate(endDate.getDate() + 2);
  currentValue += increaseValue;
}

function countdown() {

    // Get current UTC time
  const currentTimeUTC = new Date(new Date().toUTCString());

  // Ensure endDate is in UTC
  let endDateUTC = new Date(endDate.toUTCString());

  const currentTime = new Date();
  // Calculate remaining time in UTC
  let remainingSeconds = Math.floor((endDateUTC - currentTimeUTC) / 1000);

  if (remainingSeconds <= 0) {
    // If remaining time is zero, update the end date
    updateEndDate();
    endDateUTC = new Date(endDate.toUTCString()); // Update endDateUTC after changing endDate

    remainingSeconds = Math.floor((endDateUTC - currentTimeUTC) / 1000);
  }

  const days = Math.floor(remainingSeconds / 3600 / 24);
  const hours = Math.floor(remainingSeconds / 3600) % 24;
  const minutes = Math.floor(remainingSeconds / 60) % 60;
  const secss = remainingSeconds % 60;
  localStorage.setItem("seconds", remainingSeconds);
  const time = localStorage.getItem("seconds")
  // console.log(time, "timetimetimetimetime")
  // console.log(remainingSeconds);
  if (endDate >= currentTime) {
    __days.innerHTML = formatTime(days);
    __hours.innerHTML = formatTime(hours);
    __minutes.innerHTML = formatTime(minutes);
    __secs.innerHTML = formatTime(secss);
    __daysSecond.innerHTML = formatTime(days);
    __hoursSecond.innerHTML = formatTime(hours);
    __minutesSecond.innerHTML = formatTime(minutes);
    __secsSecond.innerHTML = formatTime(secss);
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

  __endDates.forEach((endDates) => {
    if (endDate >= currentTime) {
      endDates.innerHTML =
        formattedEndDate.split(" ")[0] +
        " " +
        formattedEndDate.split(" ")[1] +
        result;
    }
  });
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(countdown, 1000);
