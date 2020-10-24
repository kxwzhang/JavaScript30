function timer(seconds) {
  const now = Date.now();
  const then = now + (seconds * 1000);
  console.log({now, then});
  setInterval(() => {
    const secondsLeft = (then - Date.now()) / 1000;
    console.log({secondsLeft})
  }, 1000);
}