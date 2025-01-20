import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

// Define the type for an event
interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl?: string; // imageUrl is optional
}

export default function Home() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]); // Specify the type of the events state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const db = getFirestore();
        const eventsQuery = query(
          collection(db, "events"),
          orderBy("createdAt", "desc"), // Sort by creation date
          limit(3) // Fetch only the last 3 events
        );
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsList = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[]; // Type-cast to Event[]
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("@/assets/images/Login.png")} // Replace with your background image path
        style={styles.background}
      />

      {/* Foreground Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with EcoRijeka Logo */}
        <View style={styles.header}>
          {/* Hamburger Button aligned to the left */}
          <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
                    <Ionicons name="menu" size={30} color="black" />
                  </TouchableOpacity>

          {/* Right side (text and logo) */}
          <View style={styles.rightHeader}>
            <Text style={styles.appTitle}>EcoRijeka</Text>
            <Image
              source={require("@/assets/images/logo.png")} // Replace with your logo path
              style={styles.logo}
            />
          </View>
        </View>

        {/* Next Collection Card */}
        <View style={styles.nextCollectionCard}>
          <Text style={styles.cardTitle}>SLJEDEĆA KOLEKCIJA</Text>
          <View style={styles.cardContent}>
            <Image
              source={require("@/assets/images/green-bin.png")} // Replace with your actual green bin icon path
              style={styles.binIcon}
            />
            <Image
              source={require("@/assets/images/yellow-bin.png")} // Replace with your actual yellow bin icon path
              style={styles.binIcon}
            />
            <View style={styles.cardTextContent}>
              <Text style={styles.dateText}>Petak, 10.12.</Text>
              <Text style={styles.addressText}>Radmila Matejčića 5</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* First Box: Last 3 Events */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Provjeri događaje</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContainer} // Ensure proper spacing
            >
              {events.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.eventCard}
                  onPress={() => router.push(`/dogadjaji/edit/${event.id}`)} // Redirect to event details
                >
                  <Image
                    source={{ uri: event.imageUrl || "https://via.placeholder.com/120" }}
                    style={styles.eventImage}
                  />
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>{event.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Button to Show All Events */}
            <TouchableOpacity
              style={styles.showAllButton}
              onPress={() => router.push("/dogadjaji")}
            >
              <Text style={styles.showAllButtonText}>Prikaži sve događaje</Text>
            </TouchableOpacity>
          </View>

          {/* Second Box: Calendar */}
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Kalendar</Text>
            <TouchableOpacity
              style={styles.boxContent}
              onPress={() => router.push("/kalendarPopis")}
            >
              <Image
                source={require("@/assets/images/kalendar.png")} // Replace with your calendar image
                style={styles.singleCalendarImage} // Ensures a single image is shown
              />
              <Text style={styles.boxText}>Provjerite raspored</Text>
            </TouchableOpacity>
          </View>

          {/* Third Box: Advice */}
          <TouchableOpacity
            style={styles.adviceButton}
            onPress={() => router.push("/savjeti")}
          >
            <Text style={styles.adviceButtonText}>
              Kako pravilno reciklirati? Saznajte ovdje!
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Prijavi ilegalno odloženo smeće</Text>
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={() => router.push("/prijavaSmeca")}
          >
            <Text style={styles.showAllButtonText}>Prijavi smeće</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  hamburgerButton: {},
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  nextCollectionCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6e6e6e",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  binIcon: {
    width: 30,
    height: 40,
    marginRight: 10,
  },
  cardTextContent: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  addressText: {
    fontSize: 14,
    color: "#6e6e6e",
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  box: {
    backgroundColor: "rgba(245, 245, 245, 0.9)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  boxContent: {
    alignItems: "center",
  },
  singleCalendarImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    textAlign: "center",
    color: "#6e6e6e",
  },
  horizontalScrollContainer: {
    paddingHorizontal: 10,
  },
  eventCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginRight: 10,
    width: 160,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  eventDetails: {
    fontSize: 12,
    color: "#6e6e6e",
    paddingHorizontal: 10,
    marginBottom: 10,
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
  adviceButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  adviceButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
