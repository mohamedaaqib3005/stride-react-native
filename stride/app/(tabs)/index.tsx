import { View, Text, Pressable, StyleSheet } from "react-native";
import useWorkout from "../hooks/useWorkout";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  getCurrentPositionAsync
} from 'expo-location';// named export import with the name, * wants all the named exports from expo location and store them in a obj called Location
import { useRef } from "react";


function ExerciseScreen() {

  const socketRef = useRef(null);
  const locationSubscription = useRef(null);

  function connectWebsocket(workoutId) {
    const socket = new WebSocket('ws://guava-3a7i.onrender.com/ws');
    socket.onopen = (event) => {
      /* Connection established */
      console.log("Websocket connected")
    };
    socket.onmessage = (event) => {
      /* Message received */
      console.log("receivedmessage", event.data)
    };
    socket.onerror = (error) => {
      /* Error occurred */
      console.log("websocket error", error)
      console.log("websocketmessage", JSON.stringify(error, null, 2))
    };
    socket.onclose = (event) => {
      /* Connection closed */
    };

    socketRef.current = socket;

  }

  async function watchUserLocation(workoutId) {
    const permissionObject = await requestForegroundPermissionsAsync()
    // console.log("permissions", permissionObject);
    const status = permissionObject.status;
    console.log("permission status", status);

    if (status !== "granted") {
      console.log("location permission denied");
      return;
    }

    const location = await getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    })

    locationSubscription.current = await watchPositionAsync({
      accuracy: Location.Accuracy.High,
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

        if (socketRef.current) {
          socketRef.current.send(JSON.stringify(message));
        }
      }
    );
  }


  async function stopFetchingData() {
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

  const { startWorkoutSession, stopWorkoutSession } = useWorkout();

  async function handleStartWorkout() {
    if (locationSubscription.current) {
      console.log("Workout already running")
      return;
    }
    const workoutId = await startWorkoutSession();
    connectWebsocket(workoutId) //  socketRef.current = await connectWebsocket(workoutId);
    await watchUserLocation(workoutId);
  }

  function handlestopWorkout() {
    stopWorkoutSession()
    stopFetchingData()
    closeWebsocketConnection()
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.display}>00:00:00</Text>
        {/* text is inline */}
      </View>

      <View style={styles.bottomButtons}>
        <Pressable style={styles.button} onPressIn={handleStartWorkout}>
          <Text style={styles.buttonText}>START</Text>
        </Pressable>

        <Pressable
          style={styles.button} onPressIn={handlestopWorkout}>
          <Text style={styles.buttonText}>STOP</Text>
        </Pressable>
      </View>
    </View>
  );
}

const globalConstants = {
  primaryColor: "#111111",
};

// const globalStyles = StyleSheet.create({
//   primary: {
//     backgroundColor: "#111111",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1, // replaces height:
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
  },

  display: {
    fontSize: 64, // ~4rem
    color: "white",
    fontWeight: "700",
    fontFamily: "Outfit_700Bold",
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },

  button: {
    backgroundColor: "#06b2cc",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginHorizontal: 8, // replaces gap
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Outfit_700Bold",
  },
});

export default ExerciseScreen;




// use Pressable instead of Touchable Opacity
// named vs default imports
// just import the needed methods from location object
// change handleStart name to startWorkout ,data use specific descriptive names
// connect websocket should only return websocket object if the websocket connection is established
// smaller code changes refactor and commit ,push
