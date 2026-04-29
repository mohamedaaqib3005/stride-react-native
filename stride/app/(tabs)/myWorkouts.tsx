import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import { router } from "expo-router";


function RedirectScreen() {

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getItemAsync("token");
        console.log("Token from SecureStore", storedToken);

      } catch (error) {
        console.log("Error reading token:", error);
      }
    };
    loadToken();
  }, []);
  const Logout = async () => {
    await deleteItemAsync("token");
    console.log("Token cleared");
    router.replace("/login");

  };
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Workout Log Empty</Text>
      <Pressable
        style={styles.startNewWorkoutButton}
        onPress={() => router.replace("/startNewWorkout")}
      >
        <Text style={styles.startNewWorkoutText}>Start New Workout</Text>
      </Pressable>
      <Pressable onPress={Logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

export default RedirectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    color: "#06b2cc",
    fontSize: 16,
    fontFamily: "Outfit_700Bold",
    marginBottom: 40,

  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "200",
    fontFamily: "Outfit_700Bold",
  },
  startNewWorkoutButton: {
    backgroundColor: "#06b2cc",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
    marginHorizontal: 8,
    marginBottom: 20,

  },

  startNewWorkoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Outfit_700Bold",
  },

})
