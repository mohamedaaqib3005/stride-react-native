import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { initialize, requestPermission, readRecords } from "react-native-health-connect";

function ExerciseScreen() {
  const recordTypes = [
    "Steps",
    // "Distance",
    // "ActiveCaloriesBurned",
    // "TotalCaloriesBurned",
    // "Speed",
    // "Power",
    // "HeartRate",
    // "RestingHeartRate",
    // "HeartRateVariabilityRmssd",
    // "RespiratoryRate",
    // "OxygenSaturation",
    // "Vo2Max",

    // "ExerciseSession",
    // "ElevationGained",
    // "FloorsClimbed",

    // "BloodGlucose",
    // "BloodPressure",

    // "BasalMetabolicRate",
    // "BodyFat",
    // "Height",
    // "Weight",
    // "BodyTemperature",
    // "BodyWaterMass",
    // "BoneMass",
    // "LeanBodyMass",

    // "Nutrition",
    // "Hydration",
    // "SleepSession"
  ];

  async function debugHealthData() {

    try {

      console.log("Initializing Health Connect...");

      await initialize();

      const permissions = recordTypes.map((type) => ({
        accessType: "read",
        recordType: type,
      }));

      await requestPermission(permissions);

      const timerange = {
        operator: "between",
        startTime: new Date(Date.now() - 86400000).toISOString(),
        endTime: new Date().toISOString(),
      };

      for (const type of recordTypes) {

        try {

          const data = await readRecords(type, {
            timeRangeFilter: timerange,
          });

          console.log(`\n==== ${type} FULL RESPONSE ====`);
          console.log(JSON.stringify(data, null, 2));

          console.log("\n==============================");
          console.log(`DATA TYPE: ${type}`);

          if (!data.records || data.records.length === 0) {
            console.log("No records found");
            continue;
          }

          console.log(`Records count: ${data.records.length}`);

          data.records.forEach((record, index) => {
            console.log(`Record ${index + 1}`);
            console.log(JSON.stringify(record, null, 2));
          });

        } catch (error) {
          console.error(`Error reading ${type}`, error);
        }

      }

    } catch (error) {
      console.error("Health Connect init error", error);
    }

  }

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.title}>Health Connect Debug</Text>

        <TouchableOpacity style={styles.button} onPress={debugHealthData}>
          <Text style={styles.buttonText}>FETCH DATA</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#111111",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#06b2cc",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

});

export default ExerciseScreen;