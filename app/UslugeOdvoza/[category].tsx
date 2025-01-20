import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the back icon

export default function Category() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();

  // Map category values to full names
  const categoryNames: Record<string, string> = {
    opasni: "Opasni Otpad",
    glomazni: "Glomazni Otpad",
    etpad: "E-otpad",
    gradjevinski: "Građevinski Otpad",
    automobilski: "Automobilski Dijelovi",
    medicinski: "Medicinski Otpad",
    biootpad: "Biootpad",
    ulja: "Otpadna Ulja",
  };

  const companies: Record<string, { id: string; name: string }[]> = {
    opasni: [
      { id: "kemis", name: "KEMIS-Termoclean" },
      { id: "metis", name: "METIS d.d" },
    ],
    glomazni: [
      { id: "company1", name: "Glomazni Company 1" },
      { id: "company2", name: "Glomazni Company 2" },
    ],
    // Add other categories if needed
  };

  const categoryName = categoryNames[category || ""] || category?.toUpperCase();

  return (
    <View style={styles.container}>
      {/* Row for back button and title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
      </View>
      {companies[category]?.map((company) => (
        <TouchableOpacity
          key={company.id}
          onPress={() =>
            router.push(`/UslugeOdvoza/${category}/${company.id}` as const)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>{company.name}</Text>
        </TouchableOpacity>
      ))}
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
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Vertically center the items
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 10, // Space between back button and title
  },
  title: {
    textAlign: "center", 
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 20,// Align the title to the left of the screen
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
