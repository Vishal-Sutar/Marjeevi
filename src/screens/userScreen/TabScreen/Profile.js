import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/AuthSlice";
import { useTranslation } from "react-i18next";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const PROFILE = {
  nameKey: "profile.title",
  roleKey: "profile.procurement_staff",
};

const ACCOUNT_DETAILS = [
  {
    id: "1",
    key: "phone",
    value: "+91 98765 43210",
    icon: "📞",
  },
  {
    id: "2",
    key: "email",
    value: "staff@rajnevi.com",
    icon: "✉️",
  },
  {
    id: "3",
    key: "location",
    value: "Raipur District",
    icon: "📍",
  },
];


const SETTINGS = [
  { id: "1", key: "notifications", icon: "🔔" },
  { id: "2", key: "language", icon: "🌐" },
  { id: "3", key: "privacy", icon: "🔒" },
  { id: "4", key: "help", icon: "❓" },
];


/* ---------------- SCREEN ---------------- */

const Profile = () => {
  const dispatch = useDispatch();
    const { t } = useTranslation();
  const [account, setAccount] = useState([]);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    setAccount(ACCOUNT_DETAILS);
    setSettings(SETTINGS);
  }, []);

  /* ---------------- LOGOUT ---------------- */

 const logoutUser = () => {
  Alert.alert(
    t("profile.logout_title"),
    t("profile.logout_confirm"),
    [
      { text: t("common.cancel"), style: "cancel" },
      {
        text: t("profile.logout"),
        style: "destructive",
        onPress: async () => {
          try {
            await dispatch(logOut()).unwrap();
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]
  );
};

  /* ---------------- RENDERERS ---------------- */

const renderAccount = useCallback(
  ({ item }) => (
    <View style={styles.accountRow}>
      <Text style={styles.accountIcon}>{item.icon}</Text>
      <View>
        <Text style={styles.accountLabel}>
          {t(`profile.account.${item.key}`)}
        </Text>
        <Text style={styles.accountValue}>{item.value}</Text>
      </View>
    </View>
  ),
  [t]
);


 const renderSetting = useCallback(
  ({ item }) => (
    <TouchableOpacity style={styles.settingRow} activeOpacity={0.8}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Text>{item.icon}</Text>
        </View>
        <Text style={styles.settingText}>
          {t(`profile.settings.${item.key}`)}
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  ),
  [t]
);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />

      {/* HEADER (STATIC) */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <Text style={styles.headerTitle}>  {t(PROFILE.nameKey)}</Text>
        <Text style={styles.headerSub}> {t(PROFILE.roleKey)}</Text>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          {/* ACCOUNT DETAILS */}
          <Text style={styles.sectionTitle}> {t("profile.account_details")}</Text>
          <View style={styles.card}>
            <FlatList
              data={account}
              keyExtractor={(item) => item.id}
              renderItem={renderAccount}
              scrollEnabled={false}
            />
          </View>

          {/* SETTINGS */}
          <Text style={styles.sectionTitle}> {t("profile.settings_title")}</Text>
          <View style={styles.card}>
            <FlatList
              data={settings}
              keyExtractor={(item) => item.id}
              renderItem={renderSetting}
              scrollEnabled={false}
            />
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.85}
            onPress={logoutUser}
          >
            <Text style={styles.logoutText}> {t("profile.logout")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    backgroundColor: "#F97316",
    paddingVertical: 10,
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF7ED",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 26,
    color: "#F97316",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSub: {
    color: "#FFF7ED",
    fontSize: 12,
    marginTop: 2,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  container: {
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  accountIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  accountValue: {
    fontSize: 13,
    fontWeight: "500",
  },

  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingText: {
    fontSize: 13,
  },

  arrow: {
    fontSize: 18,
    color: "#9CA3AF",
  },

  logoutBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
