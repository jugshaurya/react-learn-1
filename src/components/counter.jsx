import React, { Component } from "react";

class Counter extends Component {
  state = {
    countValue: 0
  };

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.countValue === 0 ? "Zero" : this.state.countValue}
        </div>
        <button onClick={this.handleInc}> + </button>
        <button onClick={this.handleDec}> - </button>
      </React.Fragment>
    );
  }

  // handleInc = () => {
  //   console.log("enteringh", this.state);

  //   console.log("dgkfj");
  //   const changedState = {
  //     ...this.state,
  //     countValue: this.state.countValue + 1
  //   };
  //   console.log("changedState", changedState);

  //   this.state = changedState;
  //   console.log(this.state);
  //   console.log(this.state.countValue);
  //   // this.setState({ countValue: this.state.countValue + 1 });
  // };

  handleInc = () => {
    this.setState({ countValue: this.state.countValue + 1 });
  };

  handleDec = () => {
    if (this.state.countValue <= 0) return;
    this.setState({ countValue: this.state.countValue - 1 });
  };
}

export default Counter;
