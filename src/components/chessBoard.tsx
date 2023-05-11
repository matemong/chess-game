import React from "react";

const rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Chessboard() {
  const board = [];
  for (let i = columns.length - 1; i >= 0; i--) {
    for (let j = 0; j < rows.length; j++) {
      const number = i + j + 2;
      if (number % 2 === 0) {
        board.push(
          <div
            key={`${rows[j]}
          ${columns[i]}`}
            className="square black"
          >
            [{rows[j]}
            {columns[i]}]
          </div>
        );
      } else {
        board.push(
          <div
            key={`${rows[j]}
          ${columns[i]}`}
            className="square white"
          >
            [{rows[j]}
            {columns[i]}]
          </div>
        );
      }
    }
  }
  return <div id="chessboard">{board}</div>;
}
