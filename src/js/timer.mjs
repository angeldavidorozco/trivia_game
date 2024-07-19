class Timer {
  constructor() {
    this.timerId = null;
    this.count = 0;
  }

  startTimer() {
    this.count = 0;
    this.timerId = setInterval(() => {
      this.count++;
      console.log(this.count);
      if (this.count >= 15) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
    return this.count;
  }

  getTime() {
    return this.count;
  }
}

const timerInstance = new Timer();

export default timerInstance;
