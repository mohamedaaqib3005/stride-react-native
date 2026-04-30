import { useEffect, useState } from "react";
import { getItemAsync } from "expo-secure-store";
import { Redirect } from "expo-router";

export default function Index() {
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    const checkToken = async () => {
      const storedToken = await getItemAsync("token");
      setToken(storedToken);
    };

    checkToken();
  }, []);


  if (token === undefined) {
    return null;
  }

  if (token) {
    return <Redirect href="/myWorkouts" />;
  } else {
    return <Redirect href="/login" />;
  }
}

//change checkToken into IIFE since it is used only once