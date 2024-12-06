import React, { useState } from "react";
import "./App.css";

function App() {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill("white")));
  const [clickedOrder, setClickedOrder] = useState([]);

  const handleClick = (row, col) => {
    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return "green";
        }
        return cell;
      })
    );

    setMatrix(newMatrix);

    setClickedOrder((prev) => [...prev, { row, col }]);

    
    if (row === 2 && col === 2) {
      updateColorsSequentially(clickedOrder);
    }
  };

  const updateColorsSequentially = (order) => {
    order.forEach((pos, index) => {
      setTimeout(() => {
        setMatrix((prev) =>
          prev.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (rowIndex === pos.row && colIndex === pos.col) {
                return "orange";
              }
              return cell;
            })
          )
        );
      }, index * 500); 
    });
  };

  return (
    <div className="App">
      <div className="matrix">
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="box"
              style={{ backgroundColor: cell }}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
