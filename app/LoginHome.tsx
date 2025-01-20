import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth listener
import { auth } from "../firebaseConfig"; // Firebase auth instance

export default function LoginHome() {
  const router = useRouter();

  useEffect(() => {
    // Listen to the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, redirect to the main app
        router.replace("/");
      }
    });

    return unsubscribe; // Clean up the listener
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/Login.png")} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")} // Logo image path
          style={styles.logo}
        />
        {/* Login Button */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => router.push("/Login")} // Navigate to Login screen
        >
          <Text style={styles.buttonText}>Prijava</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => router.push("/Register")} // Navigate to Register screen
        >
          <Text style={styles.buttonSecondaryText}>Registracija</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#66BB6A",
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondaryText: {
    color: "#66BB6A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
