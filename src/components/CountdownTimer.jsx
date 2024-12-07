import React, { useState, useEffect } from "react";
import "../styles/components/CountdownTimer.css";

export function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className='countdown-container'>
      <div className='countdown-box'>
        <div className='countdown-number'>{timeLeft.days}</div>
        <div className='countdown-label'>Days</div>
      </div>
      <div className='countdown-box'>
        <div className='countdown-number'>{timeLeft.hours}</div>
        <div className='countdown-label'>Hours</div>
      </div>
      <div className='countdown-box'>
        <div className='countdown-number'>{timeLeft.minutes}</div>
        <div className='countdown-label'>Minutes</div>
      </div>
      <div className='countdown-box'>
        <div className='countdown-number'>{timeLeft.seconds}</div>
        <div className='countdown-label'>Seconds</div>
      </div>
    </div>
  );
}

function calculateTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
