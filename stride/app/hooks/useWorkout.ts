import { useState } from "react";
import { startWorkout, updateWorkout } from "../api/workout";



function useWorkout() {

  const [workoutId, setWorkoutId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  async function startWorkoutSession() {
    const workoutResponse = await startWorkout();
    if (!workoutResponse) {
      console.log("Workout start failed");
      return;
    }
    const workoutId = workoutResponse.id;

    console.log("EXTRACTED workoutId:", workoutId, typeof workoutId);
    console.log("workoutId", workoutId)
    setWorkoutId(workoutId);
    setIsRunning(true);
    return workoutId;
  }

  async function pauseWorkoutSession() {
    if (!workoutId) return;

    await updateWorkout(workoutId, "pause");
    setIsRunning(false);
  }

  async function resumeWorkoutSession() {
    if (!workoutId) return;

    await updateWorkout(workoutId, "resume");
    setIsRunning(true);
  }

  async function stopWorkoutSession() {
    if (!workoutId) return;

    await updateWorkout(workoutId, "stop");
    setIsRunning(false);
    setWorkoutId(null);

  }

  return {
    startWorkoutSession,
    pauseWorkoutSession,
    resumeWorkoutSession,
    stopWorkoutSession,
    isRunning,
    workoutId
  }
}


export default useWorkout


