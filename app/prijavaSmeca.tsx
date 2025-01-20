import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Use useNavigation for navigation
import { Ionicons } from "@expo/vector-icons"; // Use Ionicons for back arrow

export default function EventRegistration() {
  const route = useRoute();
  const navigation = useNavigation(); // Hook for navigation

  const [adresa, setAdresa] = useState("");
  const [slika, setSlika] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back Arrow Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Go back to the previous screen
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Prijavi ilegalno odloženo smeće</Text>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Unesi adresu"
            value={adresa}
            onChangeText={setAdresa}
            placeholderTextColor="#A9A9A9"
            style={styles.input}
          />
          <TextInput
            placeholder="Priloži fotografiju"
            value={slika}
            onChangeText={setSlika}
            placeholderTextColor="#A9A9A9"
            style={[styles.input, styles.textArea]}
            multiline
          />
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => navigation.goBack()} // Handle button click
          >
            <Text style={styles.showAllButtonText}>Prijavi smeće</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Back Button Style
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    padding: 10,
  },
  showAllButton: {
    backgroundColor: "#66BB6A",
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  showAllButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    maxWidth: 400,
    paddingTop: 60, // Adjust this value to move the content further down from the top
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left", // Align title to the left
    marginBottom: 30,
    marginLeft: 10, // Provide some left margin
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
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
  textArea: {
    height: 100,
  },
  errorText: {
    color: "#FF6347",
    fontSize: 14,
    marginBottom: 10,
  },
});
