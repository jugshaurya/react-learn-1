import React, { Component } from "react";
import Counter from "./counter";

// class Counters extends Component {
//   render() {
//     return (
//       <div>
//         <Counter />
//         <Counter />
//         <Counter />
//         <Counter />
//         <Counter />
//       </div>
//     );
//   }
// }

const Counters = () => {
  return (
    <>
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <Counter />
    </>
  );
};

export default Counters;
