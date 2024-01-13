import React from "react";

function Transactions(props) {
  const data = props.data;
  console.log("data:", data);
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              From
            </th>
            <th scope="col" class="px-6 py-3">
              To
            </th>
            <th scope="col" class="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <a href={`/history?address=${item.from}`}>{item.from}</a>
              </th>
              <td class="px-6 py-4">
                <a href={`/profile?address=${item.to}`}>{item.to}</a>
              </td>
              <td class="px-6 py-4">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}

export default Transactions;
