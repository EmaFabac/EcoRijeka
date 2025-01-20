import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";  // Importing Ionicons for hamburger icon
import { auth } from "../firebaseConfig"; // Firebase auth instance
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"; // Firestore imports

export default function Dogadjaji() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null); // User role
  const [events, setEvents] = useState<any[]>([]); // Events from Firestore

  useEffect(() => {
    const fetchRole = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      // If no user is logged in, set role as null
      if (!user) {
        setRole(null);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch Firestore document
        const userData = userDoc.data();
        setRole(userData?.role || "user"); // Default to "user"
      } catch (error) {
        console.error("Error fetching user role:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti podatke korisnika.");
      }
    };

    const fetchEvents = async () => {
      const db = getFirestore();
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList); // Set fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
        Alert.alert("Greška", "Ne mogu dohvatiti događaje.");
      }
    };

    fetchRole();
    fetchEvents();
  }, []);

  const handleEditEvent = (eventId: string) => {
    if (role !== "admin") {
      Alert.alert("Pristup odbijen", "Nemate ovlasti za uređivanje događaja.");
      return;
    }

    router.push(`/dogadjaji/edit/${eventId}`); // Navigate to edit page
  };

  const handleAddEvent = () => {
    if (role !== "admin") {
      Alert.alert("Pristup odbijen", "Nemate ovlasti za dodavanje događaja.");
      return;
    }

    router.push(`/dogadjaji/add`); // Navigate to the "Add Event" page
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Hamburger Button */}
        <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
                  <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
        {/* Title */}
        <Text style={styles.title}>Događaji</Text>
      </View>

      {/* Add Event Button (Visible only to admins) */}
      {role === "admin" && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
          <Text style={styles.addButtonText}>Dodaj Događaj</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        {events.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => router.push(`/dogadjaji/edit/${event.id}`)} // Navigate to event details
          >
            <Image
              source={{ uri: event.imageUrl || "https://via.placeholder.com/80" }}
              style={styles.eventImage}
            />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
            {role === "admin" && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={(e) => {
                  e.stopPropagation(); // Prevent parent TouchableOpacity navigation
                  handleEditEvent(event.id);
                }}
              >
                <Text style={styles.editButtonText}>Uredi</Text>
              </TouchableOpacity>
            )}
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
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    flex: 1, // Ensures title takes remaining space
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
  },
  eventImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  eventInfo: {
    flex: 1,
    paddingHorizontal: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#6e6e6e",
  },
  editButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 5,
    padding: 8,
    margin: 10,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#FF6347",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
