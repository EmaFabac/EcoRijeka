import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { auth } from "../../firebaseConfig"; // Import Firebase auth instance
import { signOut, onAuthStateChanged } from "firebase/auth";

export default function Explore() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set logged-in user
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Odjava uspješna", "Uspješno ste odjavljeni.");
      router.replace("/Login"); // Redirect to Login screen after logout
    } catch (error) {
      Alert.alert("Greška", "Došlo je do greške prilikom odjave.");
    }
  };

  const menuItems = [
    { name: "Početna", icon: "home-outline", route: "/" },
    { name: "Kalendar", icon: "calendar-month-outline", route: "/Kalendar" },
    { name: "Savjeti recikliranja", icon: "lightbulb-outline", route: "/savjeti" },
    { name: "Događaji", icon: "account-outline", route: "/dogadjaji" },
    { name: "Usluge odvoza", icon: "truck-outline", route: "/UslugeOdvoza" },
    { name: "Poruke", icon: "chat", route: "/poruke" },
    { name: "Obavjesti", icon: "bell", route: "/obavjesti" },
    { name: "Postavke", icon: "wrench-outline", route: "/postavke" },



    ...(user
      ? [] // Hide Login/Register if logged in
      : [{ name: "Prijava/Registracija", icon: "account-circle-outline", route: "/LoginHome" }]),
  ];

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={require("@/assets/images/EcoRijeka.png")}
        style={styles.headerImage}
        resizeMode="cover"
      />

      {/* Menu Items */}
      <ScrollView contentContainerStyle={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <Icon name={item.icon} size={24} color="#6e6e6e" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Option (only for logged-in users) */}
        {user && (
          <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#66BB6A" />
            <Text style={styles.logoutText}>Odjava</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  menu: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#6e6e6e",
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#66BB6A",
    fontWeight: "bold",
  },
});
