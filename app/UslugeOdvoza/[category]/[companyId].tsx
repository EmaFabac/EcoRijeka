import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For the back button

export default function CompanyDetails() {
  const router = useRouter();
  const { companyId } = useLocalSearchParams<{ companyId: string }>();

  const companyDetails: Record<
    string,
    {
      name: string;
      description: string;
      website: string;
      phone: string;
      email: string;
      logo: any; // Updated to allow both local and remote images
    }
  > = {
    kemis: {
      name: "KEMIS-Termoclean d.o.o.",
      description:
        "Tvrtka s iskustvom u gospodarenju opasnim i neopasnim otpadom. Ima skladište u Novom Vinodolskom i nudi zbrinjavanje otpada poput industrijskih uljeva, onečišćenog tla, otpadnih ulja i masti.",
      website: "https://kemis-termoclean.hr/",
      phone: "051-256-123",
      email: "kemis@gmail.com",
      logo: require('@/assets/images/kemis.jpg'), // Local image
    },
    metis: {
      name: "METIS d.d",
      description:
        "Tvrtka specijalizirana za upravljanje otpadom, uključujući recikliranje i odlaganje industrijskog otpada.",
      website: "https://metis.hr/",
      phone: "051-123-456",
      email: "metis@gmail.com",
      logo: require('@/assets/images/metis.jpg'), // Local image
    },
  };

  const details = companyDetails[companyId || ""] || null;

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Trenutno nema ni jedna dostupna kompanija!</Text>
      </View>
    );
  }

  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Greška", "URL nije podržan: " + url);
      }
    } catch (error) {
      const message = (error as Error)?.message || "Došlo je do greške.";
      Alert.alert("Greška", "Ne mogu otvoriti link: " + message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>{details.name}</Text>
      </View>

      {/* Logo */}
      <Image
        source={details.logo} // Dynamically use the logo
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={styles.sectionTitle}>O industriji</Text>
      <Text style={styles.description}>{details.description}</Text>

      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="logo-firefox" size={20} color="#000" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.organizerLabel}>Website:</Text>
          <Text
            style={[styles.detailText, styles.organizerName, styles.link]}
            onPress={() => handleLinkPress(details.website)}
          >
            {details.website}
          </Text>
        </View>
      </View>

      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="call" size={20} color="#000" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.organizerLabel}>Telefon:</Text>
          <Text style={[styles.detailText, styles.organizerName]}>
            {details.phone}
          </Text>
        </View>
      </View>

      <View style={styles.iconTextContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="mail" size={20} color="#000" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.organizerLabel}>E-mail:</Text>
          <Text style={[styles.detailText, styles.organizerName]}>
            {details.email}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => router.push({ pathname: "/sadrzajPoruka" })}
      >
        <Text style={styles.signUpButtonText}>Poruke</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Align back button and title horizontally
    alignItems: "center", // Vertically align back button and title
    marginBottom: 20, // Space between the header and the rest of the content
  },
  backButton: {
    paddingRight: 10, // Space between the back button and the title
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Allow title to take up remaining space
  },
  iconTextContainer: {
    flexDirection: "row", // Arrange icon and text horizontally
    alignItems: "center", // Vertically align icon and text
    marginBottom: 10, // Add spacing below
    marginTop: 10, // Add spacing below
  },
  signUpButton: {
    backgroundColor: "#66BB6A",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: "normal", // Default weight for the organizer's name
    color: "#666", // Lighter color for the name
    marginTop: 5, // Space between label and name
  },
  iconContainer: {
    backgroundColor: "#f0f0f0", // Gray background color
    borderRadius: 5, // Optional: round the corners of the icon background
    padding: 10, // Optional: adds some padding around the icon
    marginRight: 10, // Space between icon and text
  },
  textContainer: {
    flexDirection: "column", // Stack text vertically
  },
  organizerLabel: {
    fontSize: 16,
    fontWeight: "bold", // Make the label bold
    color: "#333", // Dark color for the label
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6e6e6e",
    marginBottom: 20,
  },
  link: {
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  messageButton: {
    backgroundColor: "#66BB6A",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  messageButtonText: {
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
