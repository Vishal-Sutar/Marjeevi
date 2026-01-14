import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";

/* 🔹 MOCK DATA (Replace with API later) */
const QUICK_ACTIONS = [
  { id: "1", key: "create_listing.title", icon: "+" },
  { id: "2", key: "buy_inputs", icon: "🛒" },
  { id: "3", key: "my_profile", icon: "👤" },
  { id: "4", key: "documents", icon: "📄" },
  { id: "5", key: "my_farm", icon: "🏘️" },
  { id: "6", key: "my_crop", icon: "🌾" },
];


const ACTIVITIES = [
  {
    id: "1",
    title: "🍅 Tomato listing approved",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: "2",
    title: "🫘 New buyer inquiry received",
    time: "5 hours ago",
    type: "info",
  },
];

const FarmerHome = () => {
 const navigation = useNavigation()
   const { t } = useTranslation(); // 🌍

const renderAction = ({ item }) => {
    const onPressAction = () => {
      if (item.key === "documents") navigation.navigate("Documents");
      if (item.key === "create_listing") navigation.navigate("CreateListing");
      if (item.key === "my_farm") navigation.navigate("MyFarms");
      if (item.key === "my_profile") navigation.navigate("FarmerProfile");
    };

    const getActionText = (key) => {
      return t(key);
    };

    return (
      <TouchableOpacity style={styles.actionCard} onPress={onPressAction}>
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>{item.icon}</Text>
        </View>
        <Text style={styles.actionText}> {getActionText(item.key)}</Text>
      </TouchableOpacity>
    );
  };



  const renderActivity = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.activityCard,
        item.type === "info" && styles.activityAlt,
      ]}
    >
      <Text style={styles.activityText}>{item.title}</Text>
      <Text style={styles.activityTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t("hello_farmer")} 👋</Text>
          <Text style={styles.headerSub}> {t("welcome_back")}</Text>
        </View>

        <TouchableOpacity style={styles.bellWrapper}>
          <Text style={styles.bellIcon}>🔔</Text>
          <View style={styles.bellDot} />
        </TouchableOpacity>
      </View>


      <Text style={styles.sectionTitle}>{t("quick_actions")}</Text>

      <FlatList
        data={QUICK_ACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderAction}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        scrollEnabled={false}
      />

 
      <View style={styles.activityHeader}>
        <Text style={styles.sectionTitle}>{t("recent_activities")}</Text>
        <TouchableOpacity
        onPress={()=> navigation.navigate('Home2')}
        >
          <Text style={styles.seeAll}>{t("see_all")}</Text>
        </TouchableOpacity>
      </View>

  
      <FlatList
        data={ACTIVITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderActivity}
        contentContainerStyle={{ paddingBottom: 20 }}
        scrollEnabled={false}
      />

    </ScrollView>
  );
};

export default FarmerHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9F7",
  },

  header: {
    backgroundColor: "#3A9D4F",
    padding: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 13,
    color: "#E0F2E9",
    marginTop: 4,
  },

  bellWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bellIcon: {
    fontSize: 18,
    color: "#fff",
  },
  bellDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },

  /* QUICK ACTIONS */
  actionCard: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#3A9D4F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionIconText: {
    fontSize: 20,
    color: "#fff",
  },
  actionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
  },

  /* ACTIVITIES */
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 10,
  },
  seeAll: {
    fontSize: 12,
    color: "#3A9D4F",
    fontWeight: "600",
  },
  activityCard: {
    backgroundColor: "#F0FBF4",
    marginHorizontal: 16,
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CDEED9",
  },
  activityAlt: {
    backgroundColor: "#F3F8FF",
    borderColor: "#D6E4FF",
  },
  activityText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
  },
  activityTime: {
    fontSize: 11,
    color: "#777",
    marginTop: 4,
  },
});
