import React, { useState } from "react";

const DateInput = ({ onDateChange }) => {
  const [date, setDate] = useState({
    day: "",
    month: "",
    year: "",
    era: "A.D.",
  });

  const validateDate = (newDate, inputField) => {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (inputField === "month") {
      if (newDate.month === "") {
        return true;
      }
      if (newDate.month < 1 || newDate.month > 12) {
        return false;
      }
    }

    if (inputField === "day") {
      if (newDate.day === "") {
        return true;
      }
      const maxDay = newDate.month === "" ? 31 : days[newDate.month - 1];
      if (newDate.day < 1 || newDate.day > maxDay) {
        return false;
      }
    }

    if (inputField === "year" && newDate.year === "") {
      return true;
    }

    return true;
  };

  const handleChange = (e) => {
    const updatedDate = { ...date, [e.target.name]: e.target.value };
    if (validateDate(updatedDate, e.target.name)) {
      setDate(updatedDate);
      onDateChange(
        updatedDate.year +
          "-" +
          updatedDate.month +
          "-" +
          updatedDate.day +
          " " +
          updatedDate.era
      );
    }
  };

  return (
    <div className="mt-2">
      <div className="flex flex-row">
        <input
          type="number"
          name="year"
          placeholder="yyyy"
          value={date.year}
          onChange={handleChange}
          class="mr-2 p-2 w-20 text-sm rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
          // className="mr-2 w-20 p-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
        <input
          type="number"
          name="month"
          placeholder="mm"
          value={date.month}
          onChange={handleChange}
          class="mr-2 p-2 w-20 text-sm rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
          // className="mr-2 w-14 p-2 border border-gray-300 rounded-md shadow-sm text-black"
        />
        <input
          type="number"
          name="day"
          placeholder="dd"
          value={date.day}
          onChange={handleChange}
          class="mr-2 p-2 w-20 text-sm rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
          // className="mr-2 w-14 p-2 border border-gray-300 rounded-md shadow-sm text-black"
        />

        <select
          name="era"
          value={date.era}
          onChange={handleChange}
          class="mr-2 p-2 w-20 text-sm rounded-lg bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
          // className="mr-2 w-20 p-2 border border-gray-300 rounded-md shadow-sm text-black"
        >
          <option value="AD">A.D.</option>
          <option value="BC">B.C.</option>
        </select>
      </div>
    </div>
  );
};

export default DateInput;
