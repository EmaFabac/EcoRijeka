import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the back icon
import { useRouter } from "expo-router"; // Importing the useRouter hook for navigation

export default function SavjetiLista() {
  const { id, title, description } = useLocalSearchParams(); // Get the document params
  const [loading, setLoading] = useState(true); // Loading state
  const [descriptionText, setDescription] = useState(description || ""); // State for the description text
  const router = useRouter(); // Use the router for navigation

  useEffect(() => {
    const fetchSubcollection = async () => {
      try {
        const db = getFirestore();
        const parentDocRef = doc(db, "savjeti", id); // Document reference in Firestore
        const docSnap = await getDoc(parentDocRef);

        if (docSnap.exists()) {
          // Process the description if it exists
          const descriptionText = docSnap.data()?.description || "";
          setDescription(descriptionText);
        } else {
          Alert.alert("Error", "Document not found!");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch the document.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcollection();
  }, [id]);

  // This regex will match the number pattern followed by a dot, and separate each item
  const descriptionWithList = descriptionText
    ? descriptionText.split(/(?=\d+\.)/)
    : []; // Split into parts based on numbers (e.g., 1., 2., 3., etc.)

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Učitavanje...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}> {/* Wrap content in ScrollView */}
      {/* Header with Back Button */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Display the description as a list */}
      {descriptionWithList.length > 0 ? (
        descriptionWithList.map((part, index) => (
          <Text key={index} style={styles.listItem}>
            {part.trim()}
          </Text>
        ))
      ) : (
        <Text style={styles.emptyMessage}>Trenutno nema detaljnog opisa!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#888888",
    textAlign: "center", 
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Vertically center the elements
    marginBottom: 15, // Reduced space below the header
  },
  backButton: {
    padding: 5, // Adjusted padding for the back button
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 30, // Reduced space between the back button and title
    color: "#000000",
    flex: 1, // Make sure the title takes the remaining space
    textAlign: "center", // Center the title
  },
  listItem: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center", // Center the list items
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
    marginTop: 20,
  },
});
