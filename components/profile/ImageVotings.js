import React from "react";

import { Card, Button } from "flowbite-react";
import Image from "next/image";

import {
  getDisplayableValueFromContract,
  getImageUrl,
  sortData,
} from "../../app/public_api";

export default function ImageVotings(props) {
  const { data, onVote } = props;
  const sortedArray = sortData(data);

  const handleVote = (item) => {
    if (onVote) {
      onVote(item);
    }
  };

  return (
    //help me to make cards flow and add spacing to each other
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px", // Adjust the spacing as needed
        justifyContent: "left", // Center the cards
      }}
    >
      {sortedArray.map((item, index) => (
        <Card
          key={index}
          style={{
            flex: "0 1 calc(33% - 20px)", // Adjust the width as needed
            maxWidth: "300px", // You can also set a max-width for each card
          }}
          className="max-w-sm"
          imgSrc={getImageUrl(item.key)}
        >
          <div className="flex items-center justify-between">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Votes: {getDisplayableValueFromContract(item.value)}
            </p>
            <Button onClick={handleVote}>Vote</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
