import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Stack } from "expo-router";
import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null); // Properly typed state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Current user is User or null
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  if (loading) {
    return null; // Optionally, return a loading spinner or splash screen
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{
          headerShown: false, // Hide the default header for all screens
        }}>
        {user ? (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="LoginHome" options={{ headerShown: false }} />
            <Stack.Screen name="Login" />
            <Stack.Screen name="Register" />
          </>
        )}

        
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
