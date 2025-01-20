// MessagePage.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for hamburger icon
import { useRouter } from "expo-router";

export default function MessagePage() {
  const router = useRouter();

  const messages = [
    { id: 1, name: "KEMIS-Termoclen d.o.o", preview: "Bla bla ovo je nova poruka ...", time: "11:58" },
    { id: 2, name: "METIS d.d.", preview: "Bla bla ovo je pročitana por...", time: "11:58" },
    { id: 3, name: "Termoclen-KEMIS d.o.o", preview: "Poruka bla bla", time: "11:58" },
  ];

  const handleMessagePress = (message) => {
    router.push({
      pathname: '/sadrzajPoruka',  
      query: {
        messageId: message.id,
        messageName: message.name,
        messagePreview: message.preview,
        messageTime: message.time,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/explore")} style={styles.hamburgerButton}>
                  <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
        <Text style={styles.title}>Poruke</Text>
      </View>

      <ScrollView contentContainerStyle={styles.messageList}>
        {messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            style={styles.messageCard}
            onPress={() => handleMessagePress(message)} // Navigate to chat when clicked
          >
            <View style={styles.iconWrapper}>
              <Icon name="recycle" size={40} color="#FF6347" />
            </View>
            <View style={styles.messageContent}>
              <Text style={styles.messageTitle}>{message.name}</Text>
              <Text style={styles.messagePreview}>{message.preview}</Text>
            </View>
            <Text style={styles.messageTime}>{message.time}</Text>
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
    padding: 10,
  },
  hamburgerButton: {
    padding: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingRight: 40,
  },
  messageList: {
    paddingVertical: 10,
  },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  messagePreview: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    color: "#999999",
    marginLeft: 10,
  },
});
