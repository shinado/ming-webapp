import React from "react";
import { Table } from "flowbite-react";
import {
  getDisplayableValueFromContract,
  sortData,
} from "../../app/public_api";

export default function TextVotings(props) {
  const { data, onVote } = props;
  const sortedArray = sortData(data);

  const handleVoteClick = (item) => {
    if (onVote) {
      onVote(item);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Bio</Table.HeadCell>
          <Table.HeadCell>Votes</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Vote</span>
          </Table.HeadCell>
        </Table.Head>
        {sortedArray.map((item, index) => (
          <Table.Body key={index} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.key}
              </Table.Cell>
              <Table.Cell>
                {getDisplayableValueFromContract(item.value)}
              </Table.Cell>
              <Table.Cell>
                <div
                  onClick={() => handleVoteClick(item)}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Vote
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}
