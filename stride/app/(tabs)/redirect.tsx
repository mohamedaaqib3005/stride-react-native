import { useEffect } from "react";
import { View, Text } from "react-native";
import * as Linking from "expo-linking";

export default function RedirectScreen() {

  useEffect(() => {
    const handleUrl = async () => {
      const url = await Linking.getInitialURL();

      console.log("Redirect URL:", url);

      if (!url) return;

      const data = Linking.parse(url);

      console.log("Parsed:", data);

      const token = data.queryParams?.token;

      console.log("TOKEN:", token);
    };

    handleUrl();
  }, []);

  return (
    <View>
      <Text>Processing login...</Text>
    </View>
  );
}