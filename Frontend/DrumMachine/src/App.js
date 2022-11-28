import React from 'react';
import './App.css';

const audioKeys = [
  {
    name: "Heater-1",
    keypad: "Q",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    name: "Heater-2",
    keypad: "W",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    name: "Heater-3",
    keypad: "E",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    name: "Heater-4",
    keypad: "A",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    name: "Clap",
    keypad: "S",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    name: "Open HH",
    keypad: "D",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    name: "Kick n' Hat",
    keypad: "Z",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    name: "Kick",
    keypad: "X",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    name: "Closed HH",
    keypad: "C",
    audioMp3: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

function App() {
    
  return (
    <div className="App">
      <header className="App-header">
        <h2>
          Drum Machine
        </h2>
      </header>
      <DrumMachine />
    </div>
  );
}

// Individual drum pad element
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  // Need to handle 2 methods (onClick and handleKeyDown)
  handleClick() {
    const audio = document.getElementById(this.props.letter);
    // Volume is defaulted to 100%
    audio.play();
    this.props.displayName(this.props.audioName)
  }

  handleKeyPress(e) {
    let keypressLetter = e.key.toUpperCase();
    if (keypressLetter === this.props.letter) {
      this.handleClick();
    }
  }

  render() {
    return (
      <div id={this.props.audioName} className="drum-pad" onClick={this.handleClick}>
        <audio 
          id={this.props.letter}
          className='clip' 
          src={this.props.audioSrc}
        />
        {this.props.letter}
      </div>
    )
  }
}

// Class to map the audio object array to Drum Pad elements
class DrumPadsBlock extends React.Component {
  render() {
    return (
      <div id="drum-pads-block">
        {/* Map the audio clip object array to 9 individual Drum Pad elements */}
        {this.props.audioData.map(drumpad => (
          <DrumPad 
            letter={drumpad.keypad}
            audioSrc={drumpad.audioMp3}
            audioName={drumpad.name}
            displayName={this.props.displayName}
          />
        ))}
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: "Audio Name",
      audioData: audioKeys,
    }
    this.handleSetDisplay = this.handleSetDisplay.bind(this);
  }

  handleSetDisplay = audioTitle => {
    this.setState({
      displayText: audioTitle
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <DrumPadsBlock 
          audioData={this.state.audioData}
          displayName={this.handleSetDisplay}
        />
        <div id="display">
          <h4>{this.state.displayText}</h4>
        </div>
      </div>
    )
  }
}



export default App;
