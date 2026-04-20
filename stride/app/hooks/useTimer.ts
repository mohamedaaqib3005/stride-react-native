import { useState, useEffect } from "react";


function useTimer() {

  const [isRunning, setIsRunning] = useState(false);

  const [time, setTime] = useState(0);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const stopTimer = () => {
    setIsRunning(false);
    setTime(0)
  }

  useEffect(() => {
    if (!isRunning) return; // guard
    const id = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(id)//cleanup
  }, [isRunning])

  return {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    stopTimer,
  };


}

export default useTimer;


