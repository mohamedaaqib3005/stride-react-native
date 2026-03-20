import { View, Text, Pressable, StyleSheet } from "react-native";
// import useWorkout from "../hooks/useWorkout";
// import { handleStartWorkout, handleStopWorkout } from "../hooks/useWebsocket"
import useWorkoutController from "../hooks/useWorkoutController";
// named export import with the name, * wants all the named exports from expo location and store them in a obj called Location


function ExerciseScreen() {


  const { handleStartWorkout, handleStopWorkout } = useWorkoutController();

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
          style={styles.button} onPressIn={handleStopWorkout}>
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
