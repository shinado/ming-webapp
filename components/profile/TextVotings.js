import React from "react";
import { getDisplayableValueFromContract, sortData } from "../../app/public_api";

export default function TextVotings(props) {
  const {data, onVote} = props;
  const sortedArray = sortData(data);

  const handleVoteClick = (item) => {
    if (onVote) {
      onVote(item);
    }
  };

  const buttonStyle = {
    color: 'blue',          // Set the text color to white for better visibility
    border: 'none',          // Optional: Removes the border
    padding: '5px 10px',     // Optional: Adds some padding
    cursor: 'pointer',       // Optional: Changes cursor to pointer on hover
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Votes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {sortedArray.map((item, index) => (
          <tr key={index}>
            <td>{item.key}</td>
            <td>{getDisplayableValueFromContract(item.value)}</td>
            <td>
              <button style={buttonStyle} onClick={() => handleVoteClick(item)}>Vote</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};