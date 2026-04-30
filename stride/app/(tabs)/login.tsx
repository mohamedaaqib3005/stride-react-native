import { View, Text, Pressable, StyleSheet } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";
import { setItemAsync, } from "expo-secure-store";



const LOGIN_API_URL = "https://guava-3a7j.onrender.com/api/v1/login?redirect_url=";

function LoginScreen() {

  const redirectUri = makeRedirectUri(
    {
      scheme: "stride",
      path: "myWorkouts"
    }
  )


  console.log("redirectUri", redirectUri);

  const authUrl = `${LOGIN_API_URL}${encodeURIComponent(redirectUri)}`;


  const login = async () => {
    try {
      const response = await openAuthSessionAsync( // returns a promise with result {type:success,url:string}or error {type:dismiss} where type is type of result state,url is redirect url
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


        if (!token) {
          throw new Error("Token not received")
        }
        // Store token in secure Store
        await setItemAsync("token", token);

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
          <Text style={styles.buttonText}>Login with Google</Text>
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
    paddingHorizontal: 50,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontFamily: "Outfit_700Bold",
  }
})



