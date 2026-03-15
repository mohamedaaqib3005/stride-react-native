import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { initialize, requestPermission, readRecords } from "react-native-health-connect";
import * as Location from "expo-location";

function ExerciseScreen() {

  async function getLocation() {

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Location permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    console.log("Latitude:", location.coords.latitude);
    console.log("Longitude:", location.coords.longitude);
    console.log("Speed:", location.coords.speed);
    console.log("Altitude:", location.coords.altitude);
  }

  async function fetchAllData() {

    await getLocation();   // GPS data

    console.log("Fetching health data...");
    await initialize();

    const data = await readRecords("Steps", {
      timeRangeFilter: {
        operator: "between",
        startTime: new Date(Date.now() - 86400000).toISOString(),
        endTime: new Date().toISOString()
      }
    });

    // console.log(JSON.stringify(data, null, 2));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={fetchAllData}>
        <Text style={styles.buttonText}>FETCH DATA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: { backgroundColor: "#06b2cc", padding: 16, borderRadius: 999 },
  buttonText: { color: "white" }
});

export default ExerciseScreen;