import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage(null); // Clear error message before login attempt
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Prijava uspješna!", "Dobrodošli natrag!");
      router.push("/");
    } catch (error: any) {
      // Handle login errors
      const message =
        error.code === "auth/user-not-found" || error.code === "auth/wrong-password"
          ? "Korisničko ime ili lozinka su netočni"
          : "Korisničko ime ili lozinka su netočni";
      setErrorMessage(message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Prijava</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
          <TextInput
            placeholder="Lozinka"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            style={styles.input}
          />
          {/* Display error message */}
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Zaboravili lozinku?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Prijava</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>ili nastavi sa</Text>
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/000000/google-logo.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: "https://img.icons8.com/color/48/000000/facebook.png" }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/Register")}>
          <Text style={styles.registerText}>
            Nemate račun? <Text style={styles.registerLink}>Registriraj se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
    elevation: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPasswordText: {
    alignSelf: "flex-end",
    color: "#6e6e6e",
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 14,
    color: "#A9A9A9",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontSize: 16,
  },
  registerText: {
    fontSize: 14,
    textAlign: "center",
    color: "#A9A9A9",
  },
  registerLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF6347",
    fontSize: 14,
    marginBottom: 10,
  },
});
