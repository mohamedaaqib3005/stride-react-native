import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Redirect } from "expo-router";

export default function Index() {
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken);
    };

    checkAuth();
  }, []);


  if (token === undefined) {
    return null;
  }

  if (token) {
    return <Redirect href="/myExercises" />;
  } else {
    return <Redirect href="/login" />;
  }
}

