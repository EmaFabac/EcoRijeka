import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for the back icon
import { useRouter } from "expo-router";

export default function ChatPage() {
          const router = useRouter();
    
  const messages = [
    { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", time: "11:28", sentByUser: false },
    { id: 2, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", time: "11:45", sentByUser: true },
    { id: 3, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", time: "11:58", sentByUser: false },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>KEMIS-Termoclen d.o.o</Text>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.messageList}>
        
        {messages.map((message) => (
          
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sentByUser ? styles.userMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.messageTime}>Poslano {message.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Box */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Poruka"
          placeholderTextColor="#999999"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  backButton: {
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  messageList: {
    padding: 15,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: "75%",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#66BB6A",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 14,
    color: "#333333",
  },
  messageTime: {
    fontSize: 12,
    color: "#666666",
    marginTop: 5,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#333333",
    marginBottom: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: "#66BB6A",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginBottom: 10,

  },
});
