import { View, Text, Pressable, StyleSheet } from "react-native"
import * as AuthSession from "expo-auth-session";
// import * as Linking from "expo-linking";
// import * as SecureStore from "expo-secure-store"
import * as WebBrowser from "expo-web-browser";





function LoginScreen() {

  const redirectUri = AuthSession.makeRedirectUri(
    {
      scheme: "stride",
      path: "redirect"
    }
  )

  console.log("redirectUri", redirectUri)

  const authUrl = `https://guava-3a7j.onrender.com/api/login?redirect_url=${encodeURIComponent(redirectUri)}`;




  const login = async () => {
    const response = await WebBrowser.openAuthSessionAsync(
      authUrl,
      redirectUri
    )
    console.log("response", response)
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

