import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";


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
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Workout Log Empty</Text>
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
  }

})
