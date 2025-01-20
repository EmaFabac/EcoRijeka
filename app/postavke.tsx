import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, FlatList, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsPage() {
  const router = useRouter();

  // State for toggles and time selection
  const [dayBeforeEnabled, setDayBeforeEnabled] = useState(true);
  const [dayOfEnabled, setDayOfEnabled] = useState(true);
  const [dayBeforeTime, setDayBeforeTime] = useState("09:30");
  const [dayOfTime, setDayOfTime] = useState("08:00");

  // Dropdown modal state
  const [showDropdown, setShowDropdown] = useState(null); // 'dayBefore' or 'dayOf'

  // Generate a list of times (every 30 minutes)
  const generateTimes = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, "0");
        const minute = m.toString().padStart(2, "0");
        times.push(`${hour}:${minute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  // Handlers
  const onTimeSelect = (time) => {
    if (showDropdown === "dayBefore") {
      setDayBeforeTime(time);
    } else if (showDropdown === "dayOf") {
      setDayOfTime(time);
    }
    setShowDropdown(null); // Close dropdown
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
                 <Ionicons name="menu" size={30} color="black" />
               </TouchableOpacity>
        <Text style={styles.title}>Postavke</Text>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Obavijesti</Text>

        {/* Day Before Notification */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dan prije</Text>
          <TouchableOpacity
            onPress={() => setShowDropdown("dayBefore")}
            style={styles.timePickerButton}
            disabled={!dayBeforeEnabled}
          >
            <Text style={styles.timeText}>{dayBeforeTime}</Text>
          </TouchableOpacity>
          <Switch
            value={dayBeforeEnabled}
            onValueChange={(value) => setDayBeforeEnabled(value)}
          />
        </View>

        {/* Day Of Notification */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Na dan</Text>
          <TouchableOpacity
            onPress={() => setShowDropdown("dayOf")}
            style={styles.timePickerButton}
            disabled={!dayOfEnabled}
          >
            <Text style={styles.timeText}>{dayOfTime}</Text>
          </TouchableOpacity>
          <Switch
            value={dayOfEnabled}
            onValueChange={(value) => setDayOfEnabled(value)}
          />
        </View>
      </View>

      {/* Time Dropdown Modal */}
      {showDropdown && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDropdown(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <FlatList
                data={timeOptions}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => onTimeSelect(item)}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      )}
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
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Ensures title takes remaining space
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
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
  timePickerButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginRight: 10,
  },
  timeText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: 250,
    maxHeight: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize: 16,
  },
});
