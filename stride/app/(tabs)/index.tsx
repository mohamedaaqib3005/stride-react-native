import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import useWorkout from "../hooks/useWorkout";
import * as Location from "expo-location";
import { useRef } from "react";


function ExerciseScreen() {

  const locationSubscription = useRef(null);


  async function fetchAllData() {
    const permissionObject = await Location.requestForegroundPermissionsAsync()
    console.log("permissions", permissionObject);
    const status = permissionObject.status;
    console.log("permission status", status);

    if (status !== "granted") {
      console.log("location permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    })
    console.log("location", location);

    const latitudeData = location.coords.latitude;
    console.log("latitudeData", latitudeData)

    const longitudeData = location.coords.longitude;
    console.log("longitudedata", longitudeData);
    const Speed = location.coords.speed;
    console.log("speed", Speed);
    const altitudeData = location.coords.altitude;
    console.log("altitudedata", altitudeData);

    locationSubscription.current = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.High,
      timeInterval: 5000,
      distanceInterval: 0
    },
      (location) => {
        const payload = {
          timestamp: new Date(location.timestamp).toISOString(),
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            speed: location.coords.speed,
            altitude: location.coords.altitude,
          }
        }
        // console.log("Time:", location.timestamp);
        // console.log(Date.now())
        console.log("PAYLOAD ----");
        console.log(JSON.stringify(payload, null, 2))
        // console.log("Latitude", location.coords.latitude);
        // console.log("Longitude", location.coords.longitude);
        // console.log("Speed", location.coords.speed);
        // console.log("Altitude", location.coords.altitude);

      }
    )

  }


  async function stopFetchingData() {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
      console.log("GPS tracking stopped");
    }

  }
  const { handleStart, handleStop } = useWorkout();
  async function startWorkout() {
    handleStart()
    await fetchAllData()
  }

  function stopWorkout() {
    handleStop()
    stopFetchingData()
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.display}>00:00:00</Text>
        {/* text is inline */}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.button} onPress={startWorkout}>
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={stopWorkout}>
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const globalConstants = {
  primaryColor: "#111111",
};

const globalStyles = StyleSheet.create({
  primary: {
    backgroundColor: "#111111",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1, // replaces height: 100vh
    backgroundColor: globalConstants.primaryColor,
  },

  content: {
    flex: 1, // pushes footer down
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



// {
//   "timestamp": "2026-03-16T03:01:54.250Z",
//     "location": {
//     "latitude": 12.9304615,
//       "longitude": 77.5966228,
//         "altitude": 830.5999755859375,
//           "speed": 0
//   }