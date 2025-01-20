import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for hamburger icon

export default function UslugeOdvoza() {
  const router = useRouter();

  const categories = [
    { id: "opasni", name: "Opasni otpad", icon: "alert", color: "#FF4D4D" },
    { id: "glomazni", name: "Glomazni otpad", icon: "sofa", color: "#66BB6A" },
    { id: "etpad", name: "E-otpad", icon: "desktop-classic", color: "#6C63FF" },
    { id: "gradjevinski", name: "Građevinski otpad", icon: "home-outline", color: "#FF8C00" },
    { id: "automobilski", name: "Automobilski dijelovi", icon: "car", color: "#FF6347" },
    { id: "medicinski", name: "Medicinski otpad", icon: "hospital-box-outline", color: "#FF1493" },
    { id: "biootpad", name: "Biootpad", icon: "leaf", color: "#4CAF50" },
    { id: "ulja", name: "Otpadna ulja", icon: "oil", color: "#FFA500" },
  ];

  // Function to navigate to Explore page


  return (
    <View style={styles.container}>
      {/* Header with Hamburger */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Usluge odvoza</Text>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.card}
            onPress={() => router.push(`/UslugeOdvoza/${category.id}` as const)}
          >
            <Icon name={category.icon} size={40} color={category.color} />
            <Text style={styles.cardText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // Ensure the hamburger button is in the right position
  },
  hamburgerButton: {
    padding: 10,
    position: "absolute",
    paddingTop: 20,
    zIndex: 2, // Ensure it's above other elements
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
