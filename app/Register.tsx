import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig"; // Firebase auth instance
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase registration method
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore methods
import { Alert } from "react-native";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (name: string, value: string) => {
    if (name === "phone") {
      // Allow only numeric characters for phone input
      value = value.replace(/[^0-9]/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { username, firstName, lastName, address, email, phone, password, confirmPassword } =
      formData;
    const validationErrors: string[] = [];
  
    // Validation: Check for missing fields
    if (!username) validationErrors.push("Molimo unesite korisničko ime.");
    if (!firstName) validationErrors.push("Molimo unesite ime.");
    if (!lastName) validationErrors.push("Molimo unesite prezime.");
    if (!address) validationErrors.push("Molimo unesite adresu.");
    if (!email) validationErrors.push("Molimo unesite email.");
    if (!phone) validationErrors.push("Molimo unesite broj mobitela.");
    if (!password) validationErrors.push("Molimo unesite lozinku.");
    if (!confirmPassword) validationErrors.push("Molimo potvrdite lozinku.");
  
    // Validation: Ensure email format is correct
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) validationErrors.push("Molimo unesite ispravnu email adresu.");
  
    // Validation: Ensure password length is at least 6 characters
    if (password && password.length < 6) validationErrors.push("Lozinka mora imati najmanje 6 znakova.");
  
    // Validation: Ensure passwords match
    if (password !== confirmPassword) validationErrors.push("Lozinke se ne podudaraju.");
  
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors([]);
  
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user data to Firestore
      const db = getFirestore();
      await setDoc(doc(db, "users", user.uid), {
        username,
        firstName,
        lastName,
        address,
        email,
        phone,
        role: "user", // Default role is "user"
        createdAt: new Date(),
      });
  
      // Show a success message
      Alert.alert("Registracija uspješna!", "Vaš račun je kreiran. Dobrodošli!");
      
      // Redirect to the home page
      router.push("/");
    } catch (error: any) {
      console.error("Registration Error:", error);
      setErrors([error.message || "Došlo je do greške prilikom registracije."]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Registracija</Text>

        <View style={styles.formContainer}>
          {/* Error Display */}
          {errors.length > 0 && (
            <View style={styles.errorContainer}>
              {errors.map((error, index) => (
                <Text key={index} style={styles.errorText}>
                  {error}
                </Text>
              ))}
            </View>
          )}

          <TextInput
            placeholder="Korisničko ime"
            placeholderTextColor="#A9A9A9"
            value={formData.username}
            onChangeText={(value) => handleInputChange("username", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Ime"
            placeholderTextColor="#A9A9A9"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Prezime"
            placeholderTextColor="#A9A9A9"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange("lastName", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Adresa"
            placeholderTextColor="#A9A9A9"
            value={formData.address}
            onChangeText={(value) => handleInputChange("address", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Broj mobitela"
            placeholderTextColor="#A9A9A9"
            keyboardType="numeric"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Lozinka"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Potvrda lozinke"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            style={styles.input}
          />

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Registracija</Text>
            
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => router.push("/Login")}>
            <Text style={styles.loginText}>
              Već imaš račun? <Text style={styles.loginLink}>Prijava</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
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
  errorContainer: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
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
  loginText: {
    fontSize: 14,
    textAlign: "center",
    color: "#A9A9A9",
  },
  loginLink: {
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
