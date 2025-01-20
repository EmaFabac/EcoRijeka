import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig"; // Import Firebase auth instance
import { signOut } from "firebase/auth"; // Firebase signOut method

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth); // Log out the user
        Alert.alert("Odjava uspješna", "Uspješno ste odjavljeni.");
        router.replace("/Login"); // Redirect to Login page
      } catch (error: any) {
        console.error("Logout Error:", error);
        Alert.alert("Greška", "Došlo je do greške prilikom odjave.");
      }
    };

    handleLogout();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#66BB6A" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
