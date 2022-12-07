import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Clock 25 + 5</h2>
        <p>A timer that allows the user to select the duration timer,  as well as a break time duration. The break time automatically starts following the end of the timer.</p>
      </header>
      <Clock />
      <footer>
        <p>Created by <a href="https://github.com/shillingb2012/freeCodeCamp/tree/main/Frontend">b. shilling</a> Dec 2022</p>
      </footer>
    </div>
  );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      sessionNum: 25, // default 25
      breakNum: 5,  // default 5
      time: '',
      timeLeft: '',
      timerActive: false,
      currTimerType: "Session",
      startStopDisp: "Start"
    }
    this.state = this.initialState;

    this.timer=0;

    // bind functions
    this.setSessionTime = this.setSessionTime.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.countDown = this.countDown.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
  }

  setSessionTime(changeTimeNum) {
    let sessionTime = this.state.sessionNum + changeTimeNum;
    let sessionDuration = sessionTime * 60;
    let minutes = parseInt(sessionDuration / 60, 10);
    if (minutes < 10) { 
      minutes = `0${minutes}`; 
    }

    this.setState({ 
      sessionNum: sessionTime,
      time: sessionDuration,
      timeLeft: `${minutes}:00`
    });
  }

  // Min break time is 1min
  decrementBreak() {
    if (this.state.breakNum > 1 && this.state.timerActive === false) {
      this.setState({breakNum: this.state.breakNum - 1})
    }
  }
  // Max time is 60min
  incrementBreak() {
    if (this.state.breakNum < 60 && this.state.timerActive === false) {
      this.setState({breakNum: this.state.breakNum + 1})
    }
  }
  // Min time is 1min
  decrementSession() {
    if (this.state.sessionNum > 1 && this.state.timerActive === false) {
      return (this.setSessionTime(-1))
    }
  }
  // Max session time is 60min
  incrementSession() {
    if (this.state.sessionNum < 60 && this.state.timerActive === false) {
      return (this.setSessionTime(1))
    }
  }

  // Reset back to initial state
  reset() {
    this.setState(this.initialState, () => {
      clearInterval(this.timer);
      this.setSessionTime(0);
      document.getElementById('beep').pause();
      document.getElementById('beep').currentTime = 0;
    });    
  }

  startStop() {
    if (this.state.timerActive === false && this.state.time > 0) { 
      return (
        this.setState({timerActive: true, startStopDisp: "Stop" }, () => {this.timer = setInterval(this.countDown, 1000)})
      )
    }
    else if (this.state.timerActive === true) {
      return (
        this.setState({timerActive: false, startStopDisp: "Start"}, () => {
          clearInterval(this.timer);
          this.timer=0;
        })
      )
    }
    else { return }
  }

  countDown() {    
    if (this.state.currTimerType === "Session") {
      let seconds = this.state.time - 1;
      this.updateTimer(seconds);

      if (seconds <= 0) {
        this.setState({currTimerType: "Break", time: this.state.breakNum*60+1}, () => {
          this.alarm()
        });
      }
    }
    else if (this.state.currTimerType === "Break") {
      let seconds = this.state.time - 1;
      this.updateTimer(seconds);

      if (seconds <= 0) {
        this.setState({ currTimerType: "Session", time: this.state.sessionNum*60+1 })
      }
    }
  }

  updateTimer(timeInSec) {
    let newDuration = timeInSec;
    let min = Math.floor(newDuration / 60);
    if (min < 10) { min = `0${min}` }

    let sec = newDuration % 60;
    if (sec < 10) { sec = `0${sec}` }

    this.setState({ time: newDuration, timeLeft: `${min}:${sec}`});
  }

  alarm() {
    document.getElementById("beep").play();
  }

  render() {
    window.onload = () => this.reset(0);

    return (
      <div id="wholeClock">
        <div id="breakAndSession">
          <Break breakDisp={this.state.breakNum} handleDecrement={this.decrementBreak} handleIncrement={this.incrementBreak} />
          <Session sessionDisp={this.state.sessionNum} handleDecrement={this.decrementSession} handleIncrement={this.incrementSession} />
        </div>
        <div id="timerAndButtons">
          <MainTimer 
            handleReset={this.reset} 
            handleStartStop={this.startStop} 
            startStopDisplay={this.state.startStopDisp} 
            timerType={this.state.currTimerType}
            timerValue={this.state.timeLeft}
          />
        </div>
        <audio id="beep" src="https://assets.mixkit.co/sfx/preview/mixkit-classic-alarm-995.mp3"></audio>
      </div>
    )
  }
}

const Break = (props) => {
  return (
    <div id="break">
      <h2 className="label" id="break-label">
        Break Length
        <p className="description">
          (min 1 min, max 60 min)
        </p>
      </h2>
      <div className="durationChoice">
        <button className="decrement" id="break-decrement" onClick={props.handleDecrement}>-</button>
        <p className="duration" id="break-length">{props.breakDisp}</p>
        <button className="increment" id="break-increment" onClick={props.handleIncrement}>+</button>
      </div>
    </div>
  )
}

const Session = (props) => {
  return (
    <div id="session">
      <h2 className="label" id="session-label">
        Session Length 
        <p className="description">
          (min 1 min, max 60 min)
        </p>
      </h2>
      <div className="durationChoice">
        <button className="decrement" id="session-decrement" onClick={props.handleDecrement}>-</button>
        <p className="duration" id="session-length">{props.sessionDisp}</p>
        <button className="increment" id="session-increment" onClick={props.handleIncrement}>+</button>        
      </div>
    </div>
  )
}

const MainTimer = (props) => {  
  return (
    <div id="mainTimer">
      <h2 className="label">Timer
        <p className="description" id="timer-label">({props.timerType})</p>
      </h2>
      <div id="timerAndButtons" >
        <div id="time-left">
          {props.timerValue}
        </div>
        <button id="start_stop" onClick={props.handleStartStop}>
          {props.startStopDisplay}
        </button>
        <button id="reset" onClick={props.handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}


export default App;
