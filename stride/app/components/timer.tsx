import { View, Text, StyleSheet } from "react-native";



function formatTime(time) {
  const h = String(Math.floor(time / 3600)).padStart(2, "0");
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}
function Timer({ time }) {

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{formatTime(time)}</Text>
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

