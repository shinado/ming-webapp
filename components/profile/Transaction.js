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
            <td><a href={`/history?address=${item.from}`}>{item.from}</a></td>
            <td><a href={`/profile?address=${item.to}`}>{item.to}</a></td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Transactions;