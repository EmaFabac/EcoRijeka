import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for hamburger icon
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function SavjetiRecikliranja() {
  const [options, setOptions] = useState<any[]>([]); // State for options fetched from Firestore
  const router = useRouter(); // Use the router for navigation

  useEffect(() => {
    const fetchOptions = async () => {
      const db = getFirestore();
      try {
        const optionsCollection = collection(db, "savjeti"); // Replace "savjeti" with your Firestore collection name
        const snapshot = await getDocs(optionsCollection);

        // Map Firestore documents into an array
        const optionsList = snapshot.docs.map((doc) => ({
          id: doc.id, // Add the document ID
          ...doc.data(), // Spread the fields (e.g., title and icon)
        }));

        setOptions(optionsList);
      } catch (error) {
        console.error("Error fetching savjeti:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti savjete.");
      }
    };

    fetchOptions();
  }, []);

  const handleOptionPress = (option: any) => {
    router.push({
        pathname: `/savjetiLista/[id]`, // Navigate to the subcollection page     
        params: {
            id: option.id, // Pass the parent document ID
            title: option.title, // Pass the title for display
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Container */}
      <View style={styles.header}>
        {/* Hamburger Button */}
        <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Savjeti recikliranja</Text>
      </View>

      {/* Options List */}
      <ScrollView style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => handleOptionPress(option)} // Navigate to details page
          >
            {/* Use Icon from Firestore */}
            <Icon
              name={option.icon} // Icon fetched from Firestore
              size={24}
              color="#66BB6A"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>{option.title}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center align vertically
    marginBottom: 20, // Add space below the header
  },
  hamburgerButton: {
    padding: 10,
    marginTop:10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10, // Adds space between hamburger and title
    color: "#000000",
    flex: 1, // Allow the title to take up the remaining space
  },
  optionsContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#66BB6A",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
