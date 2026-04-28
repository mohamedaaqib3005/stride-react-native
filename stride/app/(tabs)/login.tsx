import { View, Text, Pressable, StyleSheet } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";



const API_BASE = "https://guava-3a7j.onrender.com/api/v1/login?redirect_url=";

function LoginScreen() {

  const redirectUri = AuthSession.makeRedirectUri(
    {
      scheme: "stride",
      path: "myExercises"
    }
  )


  console.log("redirectUri", redirectUri);

  const authUrl = `${API_BASE}${encodeURIComponent(redirectUri)}`;


  const login = async () => {
    try {
      const response = await WebBrowser.openAuthSessionAsync( // returns a promise with result or error{type:success,url:string} where type is type of result state,url is redirect url
        authUrl,
        redirectUri
      )
      console.log("response", response)

      if (response.type === "success") {
        // Parse the redirect URL to extract the token
        const url = new URL(response.url);
        console.log("url", url)
        const token = url.searchParams.get("token");
        console.log("tokens", token)

        if (token) {
          // Store token in secure Store
          await SecureStore.setItemAsync("token", token);

          const savedToken = await SecureStore.getItemAsync("token");
          console.log("savedToken", savedToken)
        }
      }
    } catch (error) {
      console.log("error:", error)
    }
  }



  return (
    <>
      <View>
        <Text>Please login before starting your workout</Text>
        <Pressable onPress={login} style={styles.loginButtons}>
          <Text>Login</Text>
        </Pressable>
      </View>
    </>
  );

}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtons: {
    backgroundColor: "#06b2cc",
    marginTop: 400,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white"
  }
})


//store authorization header and read JWT

