import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
  // Set the date we're counting down to
  const countDownDate: number = new Date("Apr 30, 2024 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState<number>(countDownDate - new Date().getTime());

  useEffect(() => {
    // Update the countdown every 1 second
    const intervalId = setInterval(() => {
      // Get the current date and time
      const now: number = new Date().getTime();
      // Find the distance between now and the countdown date
      const distance: number = countDownDate - now;
      // Update the state
      setTimeLeft(distance);
      // If the countdown is over, clear the interval
      if (distance < 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, [countDownDate]);

  // Calculations for days, hours, minutes, and seconds
  const days: number = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours: number = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes: number = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div id="countdown">
      {timeLeft >= 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : "EXPIRED"}
    </div>
  );
}

export default CountdownTimer;