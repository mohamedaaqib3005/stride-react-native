import { useState } from "react";
import { startWorkout, stopWorkout } from "../api/workout";



function useWorkout() {

  const [workoutId, setWorkoutId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  async function startWorkoutSession() {
    const workoutResponse = await startWorkout();
    if (!workoutResponse) {
      console.log("Workout start failed");
      return;
    }
    const workoutId = workoutResponse.id
    setWorkoutId(workoutId);
    setIsRunning(true);
    return workoutId;
  }

  async function stopWorkoutSession() {
    if (!workoutId) return;
    await stopWorkout(workoutId)
    setIsRunning(false);
    setWorkoutId(null);

  }

  return {
    startWorkoutSession,
    stopWorkoutSession,
    isRunning,
  }
}


export default useWorkout


