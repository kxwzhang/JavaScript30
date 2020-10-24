let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);
  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if need to stop
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
};

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? 0 : ''}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
};

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : 12}:${minutes < 10 ? 0 : ''}${minutes}`;
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// grab the form and update timer
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const min = this.minutes.value;
  timer(min * 60);
  this.reset();
});