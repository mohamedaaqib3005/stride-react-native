
import { View, Text, Pressable, StyleSheet } from "react-native";
// import useWorkout from "../hooks/useWorkout";
// import { handleStartWorkout, handleStopWorkout } from "../hooks/useWebsocket"
import useWorkoutController from "../hooks/useWorkoutController";
import useTimer from "../hooks/useTimer";
import Timer from "../components/timer";
import { useState } from "react";


function ExerciseScreen() {
  const [isPaused, setIsPaused] = useState(false);

  const { handleStartWorkout, handlePauseWorkout,
    handleResumeWorkout, handleStopWorkout } = useWorkoutController();

  const { time, startTimer, pauseTimer, stopTimer } = useTimer();
  const handleStart = async () => {
    if (isPaused) {
      await handleResumeWorkout();
      startTimer();
      setIsPaused(false);
    } else {
      const result = await handleStartWorkout();
      if (result?.success) startTimer();
    }
  };

  const handlePause = () => {
    pauseTimer();
    handlePauseWorkout();
    setIsPaused(true);
  };

  const handleStop = () => {
    stopTimer();
    handleStopWorkout();
    setIsPaused(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Timer style={styles.display} time={time} />{/* cannot use timer inside text component since it returns view ... */}
        {/* text is inline */}
      </View>

      <View style={styles.bottomButtons}>
        <Pressable onPress={handleStart}>
          {({ pressed }) => (
            <View
              style={
                [styles.button, {
                  backgroundColor: pressed
                    ? "transparent"
                    : "#06b2cc",
                  borderWidth: pressed ? 2 : 0,
                  borderColor: "#06b2cc",
                }]}
            >
              <Text style={[styles.buttonText
                , {
                color: pressed
                  ? "#06b2cc"
                  : "black"
              },]
              }>
                {isPaused ? "RESUME" : "START"}
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          style={styles.button} onPressIn={handleStop}>
          <Text style={styles.buttonText}>STOP</Text>
        </Pressable>
        {!isPaused && (
          <Pressable style={styles.button} onPressIn={handlePause}>
            <Text style={styles.buttonText}>PAUSE</Text>
          </Pressable>
        )}
      </View>
    </View >
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
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
  },

  buttonText: {
    color: "black",
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
