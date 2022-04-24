import React, { useEffect } from "react";
import "./styles.css";
import Input from "./components/input";

function list(item, index) {
  if (item > 0) {
    return <li>Credit {item}</li>;
  } else if (item !== 0) return <li> Debit {-item}</li>;
}

function list2(item, index) {
  return <li>Interest {item}</li>;
}

function App() {
  const [availableBal, updateBal] = React.useState(1000);
  const [statement, setStatement] = React.useState([]);
  const [interest, setInterest] = React.useState([]);

  function handleInterest(prevBal) {
    const prev = (prevBal * 0.025).toFixed(2);
    // setInterest((prevInterest)=>[...prevInterest,prev])
    interest.push(prev);

    return prevBal * 1.025;
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      // console.log("hi");
      updateBal(handleInterest);
    }, 10000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  function onCredit(value) {
    updateBal(parseFloat(availableBal) + parseFloat(value));
    setStatement([...statement, value]);
  }

  function onDebit(value) {
    updateBal(parseFloat(availableBal) - parseFloat(value));
    updateBal((prevBal) => {
      if (prevBal < 500) {
        setStatement([...statement, -value, -50]);
        return prevBal - 50;
      } else {
        setStatement([...statement, -value]);
        return prevBal;
      }
    });
  }

  return (
    <div className="transaction">
      <Input creditFun={onCredit} debitFun={onDebit} />
      <div>
        <h1> Balance: INR {availableBal.toFixed(2)}</h1>
      </div>
      <div className="statement">
        <h2>Statement</h2>
        <ul>{statement.map(list)}</ul>
      </div>
      <div className="statement">
        <h2>Interest Transaction</h2>
        <ul>{interest.map(list2)}</ul>
      </div>
    </div>
  );
}

export default App;
