import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";


function RedirectScreen() {

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("token");
        console.log("Token from SecureStore", storedToken);

      } catch (error) {
        console.log("Error reading token:", error);
      }
    };
    loadToken();
  }, []);
  const Logout = async () => {
    await SecureStore.deleteItemAsync("token");
    console.log("Token cleared");
    router.replace("/login");

  };
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Workout Log Empty</Text>
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
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  }

})
