import React from 'react';
import './App.css';

/*
*** General thinking ****
USE IMMEDIATE EXECUTION LOGIC, much easier
Happy path:
1) Display user clicks/input
2) Equals onClick - send the display expression and evaluate
3) Display result

*Other - clear will reset (uase initial state)

Besides the output display, each element is a clickable button (generic class)
  - Generic props
    -- Id / unique name
    -- Button type (see action above) - translates to how onClick handles
    -- Value (eg if button type is operator, then value could be *, +, -, /)
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Calculator App
        </p>
      </header>
      <Calculator />
    </div>
  );
}

class CalcButton extends React.Component {
  // No constructor needed, just a display component
  render() {
    return (
      <button
        className="calcButton"
        id={this.props.name}
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      displayText: "0",
      lastValue: "0", // overwrite the last value on each click (besides equals)
      lastValueType: null,
      firstNum: 0,
      currentOperator: null,
      decimalUsed: false
    }
    this.state = this.initialState;
    this.clickEquals = this.clickEquals.bind(this);
  }

  /* Click number:
    Several cases to consider. If the 
  */
  clickNumber(num) {
    // Options to check. 1) Check lastValueType (null, number, decimal, operator)
    if (this.state.lastValueType === null) {
      // this is the initial state, prevent 0s
      if (num === "0") {
        return;
      }
      else {
        this.setState({
          lastValue: num,
          lastValueType: "number",
          displayText: num
        });
      }
    }
    else if (this.state.lastValueType === "number" || this.state.lastValueType === "decimal" || this.state.lastValueType === "equals") {
      // prevent 0s
      if (this.state.displayText === "0") {
        if (num === "0") { 
          return; // prevent 0s
        } 
        else {
          this.setState({
            lastValue: num,
            lastValueType: "number",
            displayText: num
          });
        }
      }
      else {
        this.setState({
          lastValue: num,
          lastValueType: "number",
          displayText: this.state.displayText + num
        });
      }
      
    }
    else if (this.state.lastValueType === "operator") {
      // handle the preceding "-" sign appropriately
      if ( this.state.lastValue === "-" && this.state.currentOperator !== "-") {
        this.setState({
          displayText: this.state.displayText + num,
          lastValue: num,
          lastValueType: "number",
        });
      }
      else {
        this.setState({
          lastValue: num,
          lastValueType: "number",
          displayText: num
        });
      }
      
    }
    else {
      return;
    }

  }

  clickOperator(operator) {
    // Options to check. 1) Check last value type to see if we will overwrite the operator OR store the current display. Clear the prevent decimal flag
    if (this.state.lastValueType === "number") {
      // Handle situation (eg 3+5*6-2/4), need to evaluate if operator is present
      if (this.state.currentOperator !== null) {
        let tempResult = this.doMath(this.state.firstNum, this.state.displayText, this.state.currentOperator);

        this.setState({
          firstNum: tempResult,
          displayText: tempResult + operator,
          currentOperator: operator,
          lastValueType: "operator",
          lastValue: operator,
          decimalUsed: false
        });
      }
      else {
        this.setState({
          firstNum: this.state.displayText
        });
        this.setState({
          displayText: this.state.displayText + operator, 
          currentOperator: operator,
          lastValueType: "operator",
          lastValue: operator,
          decimalUsed: false
        });
      }
    }
    else if (this.state.lastValueType === "operator" || this.state.lastValueType === "equals") {
      // Handle the case where the second operator is "-"
      if (operator === "-") {
        // reset to initial except first number
        this.setState({
          displayText: operator,
          lastValue: operator, // overwrite the last value on each click (besides equals)
          lastValueType: "operator",
          decimalUsed: false
        })
      }
      else {      
        this.setState({
          displayText: this.state.firstNum + operator,
          currentOperator: operator,
          lastValueType: "operator",
          lastValue: operator
        });
      }
    }
    else {
      return;
    }
    
  }

  clickDecimal() {
    // check if a decimal was already used
    if (this.state.decimalUsed === true) {
      return;
    }

    // Case for if the decimal is clicked first from initial state OR after an operator
    if (this.state.lastValueType === null || this.state.lastValue === "operator") {
      this.setState({
        lastValue: ".",
        lastValueType: "decimal",
        displayText: "0.",
        decimalUsed: true
      })
    }

    // Set last value to decimal, add to display, and change decimal used to true
    this.setState({ 
      lastValue: ".",
      displayText: this.state.displayText + ".",
      decimalUsed: true
    });
  }

  clickEquals() {
    // No operator used, return displayed number
    if (this.state.currentOperator === null) {
      // do nothing
      return;
    }
    
    let result = this.doMath(this.state.firstNum, this.state.displayText, this.state.currentOperator)

    this.setState(this.initialState);
    this.setState({
      displayText: result,
      firstNum: result,
      lastValueType: "equals"
    });
  }

  doMath(num1, num2, sign) {
    let mathResult = 0;
    let firstNumber = parseFloat(num1)
    let secondNumber = parseFloat(num2);

    console.log(`my first number: ${firstNumber} and my second number ${secondNumber}`);

    switch (sign) {
      case "+":
        mathResult = firstNumber + secondNumber;
        break;
      case "-":
        mathResult = firstNumber - secondNumber;
        break;
      case "*":
        mathResult = firstNumber * secondNumber;
        break;
      case "/":
        mathResult = firstNumber / secondNumber;
        break;
    }

    return mathResult;

  }

  render() {
    return (
      <div id="whole-calculator">
        {/* Separate the calculator into 2 main sections (display with clear button, and numbers with operators) */}
        <div id="clearAndDisplay">
          <button id="clear" onClick={() => this.setState(this.initialState)}>
            C
          </button>
          <div id="display">
            {this.state.displayText}
          </div>
        </div>

        {/* Calc Buttons Block is a grid of 4x4 */}
        <div id="calcButtonBlock">
          {/* Map the calcBtns object array to 16 individual CalcButton elements */}
          {calcBtns.map(button => {
            switch (button.type) {
              case "number":
                return (<CalcButton name={button.name} value={button.value} onClick={() => {this.clickNumber(button.value)}} />);
              case "operator":
                return (<CalcButton name={button.name} value={button.value} onClick={() => {this.clickOperator(button.value)}} />);
              case "decimal":
                return (<CalcButton name={button.name} value={button.value} onClick={() => {this.clickDecimal()}} />);
              default: // default wil be the Equals button
                return (<CalcButton name={button.name} value={button.value} onClick={() => {this.clickEquals()}} />);
            }
          })}
        </div>

      </div>
    );
  }
}


const calcBtns = [
  // Top row
  {
    name: "seven", 
    value: "7", 
    type: "number"
  },
  {
    name: "eight", 
    value: "8", 
    type: "number"
  },
  {
    name: "nine", 
    value: "9", 
    type: "number"
  },
  {
    name: "divide", 
    value: "/", 
    type: "operator"
  },
  // Second row
  {
    name: "four", 
    value: "4", 
    type: "number"
  },
  {
    name: "five", 
    value: "5", 
    type: "number"
  },
  {
    name: "six", 
    value: "6", 
    type: "number"
  },
  {
    name: "multiply", 
    value: "*", 
    type: "operator"
  },
  // Third row
  {
    name: "one", 
    value: "1", 
    type: "number"
  },
  {
    name: "two", 
    value: "2", 
    type: "number"
  },
  {
    name: "three", 
    value: "3", 
    type: "number"
  },
  {
    name: "subtract", 
    value: "-", 
    type: "operator"
  },
  // Last row
  {
    name: "decimal", 
    value: ".", 
    type: "decimal"
  },
  {
    name: "zero", 
    value: "0", 
    type: "number"
  },
  {
    name: "equals", 
    value: "=", 
    type: "equals"
  },
  {
    name: "add", 
    value: "+", 
    type: "operator"
  }
];

export default App;
