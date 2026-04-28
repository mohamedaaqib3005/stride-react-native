import { View, Text, Pressable, StyleSheet } from "react-native";
// import useWorkout from "../hooks/useWorkout";
// import { handleStartWorkout, handleStopWorkout } from "../hooks/useWebsocket"
import useWorkoutController from "../hooks/useWorkoutController";
import useTimer from "../hooks/useTimer";
import Timer from "../components/timer";
import * as SecureStore from "expo-secure-store";
import { Redirect } from 'expo-router';



function ExerciseScreen() {


  const handleLogin = async () => {
    const authToken = await SecureStore.getItemAsync("token");
    console.log("authToken", authToken);

    if (authToken) {
      return <Redirect href="/myExercises" />;
    }
    else {
      return <Redirect href="/login" />;

    }
  }

  handleLogin()
  const { handleStartWorkout, handleStopWorkout } = useWorkoutController();

  const { time, startTimer, pauseTimer, stopTimer } = useTimer();
  const handleStart = async () => {
    const result = await handleStartWorkout();
    if (result?.success) startTimer();

  }
  const handleStop = () => {
    stopTimer();
    handleStopWorkout()
  }
  const handlePause = () => {
    pauseTimer();
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Timer style={styles.display} time={time} />{/* cannot use timer inside text component since it returns view ... */}
        {/* text is inline */}
      </View>

      <View style={styles.bottomButtons}>
        <Pressable style={styles.button} onPressIn={handleStart}>
          <Text style={styles.buttonText}>START</Text>
        </Pressable>

        <Pressable
          style={styles.button} onPressIn={handleStop}>
          <Text style={styles.buttonText}>STOP</Text>
        </Pressable>
        <Pressable
          style={styles.button} onPressIn={handlePause}>
          <Text style={styles.buttonText}>PAUSE</Text>
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

export default ExerciseScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, // replaces height:
    justifyContent: "center", // vertical center
    alignItems: "center", // horizontal center
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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





// use Pressable instead of Touchable Opacity
// named vs default imports
// just import the needed methods from location object
// change handleStart name to startWorkout ,data use specific descriptive names
// connect websocket should only return websocket object if the websocket connection is established
// smaller code changes refactor and commit ,push
