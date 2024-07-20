class Timer {
  constructor() {
    this.timerId = null;
    this.count = 16;
    this.timerElement = document.getElementById('timer');
  }

  startTimer(callback) {
    this.count = 16;
    this.timerId = setInterval(() => {
      this.count--;
      this.timerElement.textContent = this.count;
      if (this.count == 0) {
        this.stopTimer();
        callback();
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
