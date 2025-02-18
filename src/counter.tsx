import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import "./counter.css";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [bgLevel, setBgLevel] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
    setBgLevel((prev) => Math.min(prev + 10, 100)); // Ensure bgLevel stays within range
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    setBgLevel((prev) => Math.max(prev - 10, 0)); // Ensure bgLevel stays within range
  };

  const reset = () => {
    setCount(0);
    setBgLevel(0);
  };

  return (
    <Box className="counter-container" sx={{ padding: 2 }}>
      <div className="background-overlay" style={{ opacity: bgLevel / 100 }}></div>
      <div className="content">
        <h2>Counter: {count}</h2>
        <div className="button-container">
          <Button variant="contained" onClick={increment}>Increment</Button>
          <Button variant="contained" onClick={decrement}>Decrement</Button>
          <Button variant="contained" onClick={reset}>Reset</Button>
        </div>
      </div>
    </Box>
  );
};

export default Counter;
