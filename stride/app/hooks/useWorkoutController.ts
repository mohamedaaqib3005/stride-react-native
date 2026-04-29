import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync,
  Accuracy
} from 'expo-location';
import connectWebsocket from '../services/websocketService';
import { useRef } from "react";
import useWorkout from "./useWorkout"
import type { LocationSubscription } from 'expo-location';

function useWorkoutController() {
  const socketRef = useRef<WebSocket | null>(null);
  const locationSubscription = useRef<LocationSubscription | null>(null);
  const { startWorkoutSession, stopWorkoutSession } = useWorkout()

  async function watchUserLocation(workoutId: string) {
    const permissionObject = await requestForegroundPermissionsAsync()
    // console.log("permissions", permissionObject);
    const status = permissionObject.status;
    console.log("permission status", status);

    if (status !== "granted") {
      console.log("location permission denied");
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: Accuracy.High
    })

    console.log("WORKOUT ID INSIDE WATCH:", workoutId);
    locationSubscription.current = await watchPositionAsync({
      accuracy: Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 0
    },

      (location) => {
        const payload = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          workout_id: workoutId,
          time: new Date(location.timestamp).toISOString(),
          altitude: location.coords.altitude,
        }

        const message = {
          type: "location",
          payload
        }
        // console.log("Time:", location.timestamp);
        // console.log(Date.now())
        console.log("PAYLOAD ----");
        console.log(JSON.stringify(message, null, 2))
        // console.log("Latitude", location.coords.latitude);
        // console.log("Longitude", location.coords.longitude);
        // console.log("Speed", location.coords.speed);
        // console.log("Altitude", location.coords.altitude);
        const socket = socketRef.current;
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(message));
        }
      }
    );
    return { success: true }
  }




  function stopWatchingUserLocation() {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
      console.log("GPS tracking stopped");
    }

  }



  function closeWebsocketConnection() {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log("Websocket closed")
    }
  }



  async function handleStartWorkout() {
    if (locationSubscription.current) {
      console.log("Workout already running")
      return;
    }
    try {
      const workoutId = await startWorkoutSession();
      console.log("RECEIVED workoutId in controller:", workoutId);

      if (!workoutId) {
        console.log("❌ workoutId missing — stopping flow");
        return;
      }

      socketRef.current = await connectWebsocket() //  socketRef.current = await connectWebsocket(workoutId);
      const locationResult = await watchUserLocation(workoutId);

      return { success: true, workoutId, socket: socketRef.current, location: locationResult }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }

  }

  async function handleStopWorkout() {
    const session = await stopWorkoutSession()
    const location = stopWatchingUserLocation()
    const socket = closeWebsocketConnection()
    return {
      success: true,
      session,
      location,
      socket
    };
  }

  return { handleStartWorkout, handleStopWorkout };
}

export default useWorkoutController;