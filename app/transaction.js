import React from "react";

function Transactions(props) {
  const data = props.data;
  console.log("data:", data);
  return (
    <table>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.from}</td>
            <td>{item.to}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Transactions;