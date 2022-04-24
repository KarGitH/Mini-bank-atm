import React from "react";

function Input(props) {
  const [trValue, setTrValue] = React.useState(0);

  return (
    <div>
      <input
        type="number"
        value={trValue}
        onChange={(event) => {
          setTrValue(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          props.creditFun(trValue);
          setTrValue(0);
        }}
      >
        Credit
      </button>
      <button
        onClick={() => {
          props.debitFun(trValue);
          setTrValue(0);
        }}
      >
        Debit
      </button>
    </div>
  );
}
export default Input;
