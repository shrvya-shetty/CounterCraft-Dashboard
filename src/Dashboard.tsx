import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useAuth } from './AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [counter, setCounter] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'User Profile Trends',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  useEffect(() => {
    setFadeIn(true); // Trigger fade-in effect when the component mounts
  }, []);

  return (
    <div className={`dashboard-container ${fadeIn ? 'fade-in' : ''}`}>
      <h1>Welcome to the Dashboard, {user?.displayName}</h1>
      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={() => setCounter(counter + 1)}>Increment Counter</button>
      </div>
      <div>
        <Line data={data} />
      </div>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Dashboard;
