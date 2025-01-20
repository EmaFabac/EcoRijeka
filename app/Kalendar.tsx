import React from "react";
import { View, Text, Image, StyleSheet,TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for hamburger icon

export default function Kalendar() {
    const router = useRouter(); // Use the router for navigation
  
  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
      {/* Title */}
      <Text style={styles.title}>Kalendar odvoza</Text>

      {/* Image */}
      <Image
        source={require("../assets/images/kalendar.png")} // Adjust the path to your image
        style={styles.image}
        resizeMode="contain" // Ensures the image scales properly
      />
       {/* Title */}
       <Text style={styles.description}>Na dan pražnjenja kanta se postavlja uz rub javne površine tako da ne ometa promet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    maxWidth: 800,
    height: 400, // Adjust height as needed
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
    marginTop: 10,
  },
  hamburgerButton: {
    padding: 10,
    marginTop:10,
  },
});
