import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the back icon

export default function SavjetiLista() {
  const { id, title } = useLocalSearchParams(); // Use useLocalSearchParams to access the dynamic params
  const [subcollectionItems, setSubcollectionItems] = useState<any[]>([]); // State for subcollection items
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter(); // Use the router for navigation
  
  useEffect(() => {
    const fetchSubcollection = async () => {
      try { 
        const db = getFirestore();
        const parentDocRef = doc(db, "savjeti", id);
        console.log('Parent Document Reference:', parentDocRef.path);

        const subcollectionRef = collection(parentDocRef, "plastika");

        const snapshot = await getDocs(subcollectionRef);

        const subcollectionList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSubcollectionItems(subcollectionList);
      } catch (error) {
        Alert.alert("Greška", "Ne mogu dohvatiti dokumente subkolekcije.");
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchSubcollection();
  }, [id]);

  const handleOptionPress = (item: any) => {
    router.push({
        pathname: `/savjetiDetalji/[id]`, // Navigate to the subcollection page     
        params: {
            id: item.id, // Pass the parent document ID
            title: item.primjer, // Pass the title for display
            description: item.description, // Pass the title for display
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Subcollection List */}
      <ScrollView style={styles.subcollectionContainer}>
        {subcollectionItems.length === 0 ? (
          <Text style={styles.emptyMessage}>Trenutno nema primjera!</Text>
        ) : (
          subcollectionItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleOptionPress(item)}>
              <View style={styles.itemContent}>
                <Text style={styles.itemText}>{item.primjer || "No Title"}</Text>
                <Text style={styles.arrow}>{">"}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    flexDirection: "row", // Align elements horizontally
    alignItems: "center", // Vertically center the elements
    marginBottom: 20, // Add space below the header
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginRight:30,
   // Adds space between back button and title
    color: "#000000",
    flex: 1, // Make sure the title takes the remaining space
  },
  subcollectionContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row", // Ensure elements are placed horizontally
    alignItems: "center", // Vertically center elements
  },
  itemContent: {
    flexDirection: "row", // Align text and arrow horizontally
    justifyContent: "space-between", // Ensure space between text and arrow
    width: "100%", // Make sure the container spans the full width
    alignItems: "center", // Vertically center text and arrow
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // Light gray color for the arrow
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    fontSize: 20,
    color: "#888888",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#888888",
    marginTop: 20,
  },
});
