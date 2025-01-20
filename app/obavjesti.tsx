import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";  // Importing Ionicons for hamburger icon
import { useRouter } from "expo-router";

export default function NotificationsPage() {
      const router = useRouter();
    
  const notifications = [
    { id: 1, title: "Podsjetnik", description: "Odvoz plastike na adresi Radmila Matejić 5 zakazan za dva sata.", time: "Danas", icon: "calendar" },
    { id: 2, title: "Podsjetnik", description: "Odvoz plastike na adresi Radmila Matejić 5 zakazan za sutra ujutro u 8:00 sati.", time: "Jučer", icon: "calendar" },
    { id: 3, title: "Novi događaj", description: "Sadnja drveća u okolici Kampusa", time: "Prije 2 dan", icon: "account-group" },
    { id: 4, title: "KEMIS-Termoclen d.o.o", description: "Poruka bla bla", time: "Prije 2 dan", icon: "message" },
  ];

  const handleHamburgerPress = () => {
    // Add navigation logic here, if needed
    console.log("Hamburger menu pressed");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Obavijesti</Text>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.notificationList}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <Icon name={notification.icon} size={20} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
            </View>
            <Text style={styles.notificationTime}>{notification.time}</Text>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, 
    paddingRight: 30,
  },
  notificationList: {
    padding: 15,
  },
  notificationCard: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center", // Center items vertically
    marginBottom: 10, // Add space between cards
  },
  iconContainer: {
    width: 40, // Fixed width
    height: 40, // Fixed height (making it square)
    backgroundColor: "#f0f0f0", // Grey background
    borderRadius: 8, // Optional: rounded corners
    justifyContent: "center", // Vertically center icon
    alignItems: "center", // Horizontally center icon
    marginRight: 10, // Space between icon and text
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999999",
  },
});
