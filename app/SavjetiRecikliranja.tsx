import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

export default function SavjetiRecikliranja() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter(); // Use the router for navigation

  const options = [
    { id: "1", title: "Plastika", icon: "bottle-soda-classic-outline", text: "Savjeti za reciklažu plastike: Razvrstajte po vrstama." },
    { id: "2", title: "Papir i karton", icon: "book-outline", text: "Savjeti za reciklažu papira: Koristite obe strane papira." },
    { id: "3", title: "Hrana", icon: "magnify", text: "Savjeti za kompostiranje: Koristite ostatke hrane." },
    { id: "4", title: "Metali", icon: "weight-kilogram", text: "Savjeti za reciklažu metala: Odvojite aluminijum i čelik." },
    { id: "5", title: "Elektronike", icon: "desktop-classic", text: "Savjeti za reciklažu elektronike: Predajte na posebna mjesta." },
    { id: "6", title: "Baterije", icon: "battery", text: "Savjeti za reciklažu baterija: Predajte ih u trgovine." },
    { id: "7", title: "Tekstil i roba", icon: "tshirt-crew-outline", text: "Savjeti za reciklažu tekstila: Donirajte staru odjeću." },
    { id: "8", title: "Auto", icon: "car", text: "Savjeti za reciklažu automobila: Predajte stara vozila na reciklažu." },
    { id: "9", title: "Drvo", icon: "tree-outline", text: "Savjeti za reciklažu drveta: Koristite stare daske za projekte." },
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Savjeti recikliranja</Text>

      {/* Options List */}
      <ScrollView style={styles.optionsContainer}>
        {options.map((option) => (
          <View key={option.id} style={styles.optionWrapper}>
            {/* Option Button */}
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === option.id && styles.selectedOption,
              ]}
              onPress={() => setSelectedOption((prev) => (prev === option.id ? null : option.id))} // Toggle selection
            >
              <Icon name={option.icon} size={24} color="#66BB6A" style={styles.optionIcon} />
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>

            {/* Display Text Below the Selected Option */}
            {selectedOption === option.id && (
              <View style={styles.textContainer}>
                <Text style={styles.optionDetailText}>{option.text}</Text>
              </View>
            )}
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000000",
    marginTop: 40, // To account for the back button
  },
  optionsContainer: {
    marginBottom: 20,
    marginTop: 20, // To avoid overlapping with the back button
  },
  optionWrapper: {
    marginBottom: 10,
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
  },
  selectedOption: {
    backgroundColor: "#E8F5E9",
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  optionDetailText: {
    fontSize: 14,
    color: "#6e6e6e",
    textAlign: "left",
  },
});
