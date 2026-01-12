import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

const MyFarms = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Farms</Text>

        <TouchableOpacity>
          <Text style={styles.language}>🌐</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          You haven't created any farms yet. Please click on “Add farm”
          to create your first farm
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.85}
          onPress={() => console.log("Add Farm")}
        >
          <Text style={styles.addText}>＋ Add Farm</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyFarms;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },

  back: {
    fontSize: 20,
    color: "#111827",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  language: {
    fontSize: 18,
  },

  /* CONTENT */
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },

  addBtn: {
    backgroundColor: "#15803D",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  addText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
