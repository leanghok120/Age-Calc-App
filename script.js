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
    let daysInPrevMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    ageDays += daysInPrevMonth;
  }

  yearResultEl.textContent = ageYears;
  monthResultEl.textContent = ageMonths;
  dayResultEl.textContent = ageDays;
}

calcBtnEl.addEventListener("click", calcAge);
