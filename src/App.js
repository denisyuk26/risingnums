import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      maxCount: 10000 
    };
  }


  componentDidMount() {
    this.getRisingNumbers();
  }

  componentDidUpdate() {
    const {count, maxCount} = this.state;
    if (count === maxCount) {
      clearInterval(this.interval);
      this.timer = setTimeout(() => this.setState({ count: 0 }), 1000);
    }
    if (count === 0) {
      clearTimeout(this.timer);
      this.debounce(this.setCount, 10);
    }
  }

  //this method use for prevent immediately calling function;
  debounce = (func, delay) => {
    this.debounced = setTimeout(() => {
      func();
    }, delay);
  };
  //this method help us to get min and max integers for getting random number which adding in setCount method;
  getRisingNumbers = () => {
    const a = this.state.maxCount / 20;
    const b = Math.floor(this.state.maxCount / 50);
    console.log(a, b);
    this.setState({
      maxRandNum: a,
      minRandNum: b
    });
    return;
  };

  //this method use random integers range from minRandNum to maxRandNum state and add it to count state every interval
  setCount = () => {
    const { maxRandNum, minRandNum, maxCount } = this.state;
    this.interval = setInterval(
      () =>
        this.setState({
          count:
            this.state.count < maxCount
              ? this.state.count +
                Math.floor(
                  Math.random() * (maxRandNum - minRandNum) + minRandNum
                )
              : maxCount
        }),
      30
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.count}</p>
        </header>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timer);
  }
}

export default App;
