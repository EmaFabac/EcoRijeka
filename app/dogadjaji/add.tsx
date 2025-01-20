import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { getFirestore, addDoc, collection, getDoc, doc } from "firebase/firestore";
import { auth } from "../../firebaseConfig";

export default function AddEvent() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null); // User role
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  // Fetch user role to ensure only admins can access
  useEffect(() => {
    const fetchRole = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        try {
          console.log("User ID:", user.uid); // Log user ID
          const userDoc = await getDoc(doc(db, "users", user.uid));
          console.log("User Document Data:", userDoc.data()); // Log document data
          const userData = userDoc.data();
          setRole(userData?.role || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
          Alert.alert("Greška", "Ne mogu dohvatiti podatke korisnika.");
        }
      } else {
        console.log("No user is currently logged in.");
      }
    };

    fetchRole();
  }, []);

  // Handle form input changes
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle event creation
  const handleCreateEvent = async () => {
    const { title, date, location, description, imageUrl } = formData;

    // Validation
    if (!title || !date || !location || !description || !imageUrl) {
      Alert.alert("Greška", "Molimo ispunite sva polja.");
      return;
    }

    if (role !== "admin") {
      Alert.alert("Pristup odbijen", "Nemate ovlasti za dodavanje događaja.");
      return;
    }

    try {
      const db = getFirestore();
      await addDoc(collection(db, "events"), {
        title,
        date,
        location,
        description,
        imageUrl,
        createdAt: new Date(),
      });

      Alert.alert("Uspjeh", "Događaj je uspješno dodan!");
      router.push("/dogadjaji"); // Redirect back to events page
    } catch (error: any) {
      console.error("Error adding event:", error);
      Alert.alert("Greška", "Došlo je do greške prilikom dodavanja događaja.");
    }
  };

  // Check for non-admin access
  if (role !== "admin") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nemate pristup ovoj stranici.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Dodaj Novi Događaj</Text>

        <TextInput
          placeholder="Naslov događaja"
          value={formData.title}
          onChangeText={(value) => handleInputChange("title", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Datum i vrijeme (npr. Pon, 10 sij - 10h)"
          value={formData.date}
          onChangeText={(value) => handleInputChange("date", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Lokacija događaja"
          value={formData.location}
          onChangeText={(value) => handleInputChange("location", value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Opis događaja"
          value={formData.description}
          onChangeText={(value) => handleInputChange("description", value)}
          style={styles.input}
          multiline
        />
        <TextInput
          placeholder="URL slike događaja"
          value={formData.imageUrl}
          onChangeText={(value) => handleInputChange("imageUrl", value)}
          style={styles.input}
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <Text style={styles.createButtonText}>Dodaj Događaj</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  container: {
    width: "100%",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
