import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function KalendarSadrzaj() {
  const { id } = useLocalSearchParams(); // Get the dynamic parameter (id)
  const router = useRouter(); // Router to navigate back

  const [address, setAddress] = useState<any>(null); // Store address details
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const [dayBeforeEnabled, setDayBeforeEnabled] = useState(true);
  const [dayOfEnabled, setDayOfEnabled] = useState(true);
  const [dayBeforeTime, setDayBeforeTime] = useState("09:30");
  const [dayOfTime, setDayOfTime] = useState("08:00");

  useEffect(() => {
    if (id) {
      const fetchAddressDetails = async () => {
        const db = getFirestore();
        try {
          console.log("Fetching document with ID:", id); // Log the ID for debugging
          const addressDocRef = doc(db, "adresa", id as string);
          const addressDoc = await getDoc(addressDocRef);

          if (addressDoc.exists()) {
            console.log("Document data:", addressDoc.data()); // Log the fetched data
            setAddress(addressDoc.data());
          } else {
            console.log("No such document!");
            setAddress(null); // Reset address to null if no document found
          }
        } catch (error) {
          console.error("Error fetching address details:", error);
        } finally {
          setLoading(false); // Stop loading once data is fetched or error occurs
        }
      };

      fetchAddressDetails();
    }
  }, [id]); // Re-fetch when `id` changes

  const handleDeleteAddress = async () => {
    const db = getFirestore();
    try {
      console.log("Updating 'heart' field to false for address with ID:", id); // Log for debugging
      
      // Get a reference to the specific document
      const addressDocRef = doc(db, "adresa", id as string);
  
      // Update the 'heart' field to false
      await updateDoc(addressDocRef, {
        heart: false,
      });
  
      console.log("Address 'heart' field updated to false");
  
      // Navigate back to the previous page after successful update
      router.push('/kalendarPopis');    } catch (error) {
      console.error("Error updating 'heart' field:", error);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!address) {
    return (
      <View style={styles.container}>
        <Text>No such document!</Text> {/* Show message if no document found */}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{address.naziv}</Text>
      </View>

      {/* Display images */}
      {address.slika && (
        <Image
          source={{ uri: address.slika }}
          style={styles.image}
        />
      )}

      {/* Notification Setting */}
      <View style={styles.settingRow}>
         <View style={styles.iconWrapper}>
            <Icon name="calendar-outline" size={30} color="black" />
          </View>
        <Text style={styles.settingLabel}>Obavjesti</Text>
        <Switch
          value={dayBeforeEnabled}
          onValueChange={(value) => setDayBeforeEnabled(value)}
        />
      </View>

      {/* Delete Address */}
      <View style={styles.settingRow}>
        <View style={styles.iconWrapper}>
          <Icon name="trash-can" size={30} color="red" />
        </View>
        
        <TouchableOpacity onPress={handleDeleteAddress}>
          <Text style={[styles.settingLabel, styles.deleteText]}>Izbriši adresu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1, // Ensures label takes available space
  },
  iconContainer: {
    width: 30,
    height: 30,
    backgroundColor: "#ccc", // Gray background for the icon
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5, // Slightly rounded corners
    marginRight: 10,
  },
  deleteText: {
    color: "red", // Red text for delete
    fontWeight: "bold",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 8, // Slightly rounded corners
    backgroundColor: "#F0F0F0", // Grey background
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
