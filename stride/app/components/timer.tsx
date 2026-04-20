import { View, Text, StyleSheet } from "react-native";
import time from "../hooks/useTimer";

function Timer({ time }) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{time}</Text>
      </View>
    </View >
  );

}

export default Timer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 64,
    color: "white",
    fontWeight: "700",
  },
  button: {}
}

)

