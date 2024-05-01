// result
let yearResultEl = document.getElementById("years-text");
let monthResultEl = document.getElementById("months-text");
let dayResultEl = document.getElementById("days-text");
const calcBtnEl = document.getElementById("calc-btn");

// current date
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

// errors
let errorDayText = document.getElementById("day-error");
const dayInputEl = document.getElementById("day-input");
const dayPlaceholder = document.getElementById("placeholder-day");
let errorMonthText = document.getElementById("month-error");
const monthInputEl = document.getElementById("month-input");
const monthPlaceholder = document.getElementById("placeholder-month");
let errorYearText = document.getElementById("year-error");
const yearInputEl = document.getElementById("year-input");
const yearPlaceholder = document.getElementById("placeholder-year");

function calcAge() {
  // input
  const dayInputEl = document.getElementById("day-input");
  const monthInputEl = document.getElementById("month-input");
  const yearInputEl = document.getElementById("year-input");

  // date of birth
  const dayInput = dayInputEl.value;
  const monthInput = monthInputEl.value;
  const yearInput = yearInputEl.value;

  let ageYears = currentYear - yearInput;
  let ageMonths = currentMonth - monthInput;
  let ageDays = currentDay - dayInput;

  // Check if the inputs are valid
  if (isValidDate(dayInput, monthInput, yearInput)) {
    // Check if birthday hasnt occured yet this year
    if (
      currentMonth < monthInput ||
      (currentMonth === monthInput && currentDay < dayInput)
    ) {
      ageYears--;
      ageMonths += 12;
    }

    // Check if current day is before birthday
    if (currentDay < monthInput) {
      ageMonths--;
      let daysInPrevMonth = new Date(
        currentYear,
        currentMonth - 1,
        0,
      ).getDate();
      ageDays += daysInPrevMonth;
    }

    yearResultEl.textContent = ageYears;
    monthResultEl.textContent = ageMonths;
    dayResultEl.textContent = ageDays;
  }
}

function toggleDayError() {
  dayInputEl.style.borderColor = "red";
  dayPlaceholder.style.color = "red";
  errorDayText.textContent = "Must be a valid day";
}

function toggleMonthError() {
  monthInputEl.style.borderColor = "red";
  monthPlaceholder.style.color = "red";
  errorMonthText.textContent = "Must be a valid month";
}

function toggleYearError() {
  yearInputEl.style.borderColor = "red";
  yearPlaceholder.style.color = "red";
  errorYearText.textContent = "Must be in the past";
}

function clearYearError() {
  yearInputEl.style.borderColor = "var(--light-grey)";
  yearPlaceholder.style.color = "var(--off-black)";
  errorYearText.textContent = "";
}

function clearMonthError() {
  monthInputEl.style.borderColor = "var(--light-grey)";
  monthPlaceholder.style.color = "var(--off-black)";
  errorMonthText.textContent = "";
}

function clearDayError() {
  dayInputEl.style.borderColor = "var(--light-grey)";
  dayPlaceholder.style.color = "var(--off-black)";
  errorDayText.textContent = "";
}

function isValidDate(day, month, year) {
  let failed = false;
  // Check if year is valid (must be between 1900 and current year)
  clearYearError();
  if (year < 1900 || year > new Date().getFullYear()) {
    toggleYearError();
    failed = true;
  }

  // Check if month is valid (must be between 1 and 12)
  clearMonthError();
  if (month < 1 || month > 12) {
    toggleMonthError();
    failed = true;
  }

  // Check if day is valid for the given month and year
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  clearDayError();
  if (day < 1 || day > lastDayOfMonth) {
    toggleDayError();
    failed = true;
  }

  if (failed === true) {
    return false;
  }

  // If all conditions pass, the date is valid
  return true;
}

calcBtnEl.addEventListener("click", calcAge);
