import { View, Text, Button } from "react-native";
import { useState } from "react";
import { initialize, requestPermission, readRecords } from "react-native-health-connect";

export default function HomeScreen() {

  const [isInitialized, setIsInitialized] = useState(false);

  const connectHealth = async () => {
    try {

      const status = await initialize();
      console.log("Initialized:", status);

      if (status) {
        setIsInitialized(true);
      }

      const permissions = await requestPermission([
        { accessType: "read", recordType: "Steps" },
      ]);

      console.log("Permissions:", permissions);

    } catch (e) {
      console.log("Permission error:", e);
    }
  };
  const readSteps = async () => {
    try {

      const steps = await readRecords("Steps", {
        timeRangeFilter: {
          operator: "between",
          startTime: new Date(Date.now() - 86400000).toISOString(),
          endTime: new Date().toISOString(),
        },
      });

      const totalSteps = steps.records.reduce(
        (sum, record) => sum + record.count,
        0
      );

      console.log("Total steps:", totalSteps);

    } catch (e) {
      console.log("Read error:", e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Health Connect Test
      </Text>

      <Button title="Connect Health Connect" onPress={connectHealth} />

      <View style={{ height: 20 }} />

      <Button title="Read Steps" onPress={readSteps} />

    </View>
  );
}