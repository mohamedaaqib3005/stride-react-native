import { View, Text, Pressable, StyleSheet } from "react-native"
import { useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";
// import * as SecureStore from "expo-secure-store"





function LoginScreen() {

  const redirectUri = AuthSession.makeRedirectUri(
    {
      scheme: "stride",
      path: "redirect"
    }
  )

  console.log("redirectUri", redirectUri)

  const authUrl = "https://guava-3a7j.onrender.com/api/login?redirect_url=stride://redirect"
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: "dummy",
      redirectUri,
    },//config
    {
      authorizationEndpoint: "https://guava-3a7j.onrender.com/api/login?redirect_url=stride://redirect"
    }//discovery

  )

  console.log("request", request)
  console.log("response", response)

  const login = async () => {
    const result = await promptAsync({ url: authUrl, })
    console.log("result", result)
  }


  console.log("fullresponse", response);

  useEffect(() => {
    if (!response) {
      console.log("Request not ready yet");
      return;
    }
    console.log("fullresponse", response);
    if (response.type === "success") {
      const data = Linking.parse(response.url);

      console.log("Parsed data", data)
      const token = data.queryParams?.token;

      console.log("token", token)
    }

    // return () => { }



  }, [response])


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

