import { useState } from "react";
import { startWorkout, stopWorkout } from "../api/workout";



function useWorkout() {

  const [workoutId, setWorkoutId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  async function handleStart() {
    const data = await startWorkout();
    const workoutId = data.id
    setWorkoutId(workoutId);
    setIsRunning(true);
  }

  async function handleStop() {
    await stopWorkout(workoutId)
    setIsRunning(false);
    setWorkoutId(null);

  }

  return {
    handleStart,
    handleStop,
    isRunning,
  }
}


export default useWorkout


