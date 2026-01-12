import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/AuthSlice";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const PROFILE = {
  name: "Rajesh",
  role: "FPO",
  phone: "9623460670",
  profileImage: null, // if null → show first letter
};

const ACCOUNT_DETAILS = [
  { id: "1", label: "Phone", value: "9623460670", icon: "📞" },
  { id: "2", label: "Email", value: "rajesh@krishiyan.com", icon: "✉️" },
  { id: "3", label: "Location", value: "Dhule, Maharashtra", icon: "📍" },
];

const FEATURES = [
  { id: "1", key: "field_crop_mapping", icon: "🗺️" },
  { id: "2", key: "schemes_subsidies", icon: "🎁" },
];


const SETTINGS = [
  { id: "1", key: "notifications", badge: "1" },
  { id: "2", key: "language", value: "English" },
  { id: "3", key: "privacy" },
  { id: "4", key: "help" },
  { id: "5", key: "logout", danger: true },
];


/* ---------------- SCREEN ---------------- */

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
   const { t } = useTranslation();

  const [account, setAccount] = useState([]);
  const [features, setFeatures] = useState([]);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    // Later replace with backend response
    setAccount(ACCOUNT_DETAILS);
    setFeatures(FEATURES);
    setSettings(SETTINGS);
  }, []);

  /* ---------------- LOGOUT LOGIC ---------------- */

const handleFeaturePress = (key) => {
  switch (key) {
    case "field_crop_mapping":
      navigation.navigate("FieldCropMapping");
      break;

    case "schemes_subsidies":
      navigation.navigate("SchemesSubsidies");
      break;
  }
};



  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
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

  /* ---------------- AVATAR LOGIC ---------------- */

  const renderAvatar = () => {
    if (PROFILE.profileImage) {
      return (
        <Image
          source={{ uri: PROFILE.profileImage }}
          style={styles.avatar}
        />
      );
    }

    return (
      <View style={styles.avatarFallback}>
        <Text style={styles.avatarLetter}>
          {PROFILE.name.charAt(0).toUpperCase()}
        </Text>
      </View>
    );
  };

  /* ---------------- RENDERERS ---------------- */

  const renderAccount = useCallback(({ item }) => (
    <View style={styles.accountRow}>
      <Text style={styles.accountIcon}>{item.icon}</Text>
      <View>
        <Text style={styles.accountLabel}> {t(`profile.account.${item.label.toLowerCase()}`)}</Text>
        <Text style={styles.accountValue}>{item.value}</Text>
      </View>
    </View>
  ), []);

  const renderFeature = useCallback(({ item }) => (
  <TouchableOpacity
    style={styles.featureCard}
    activeOpacity={0.8}
    onPress={() => handleFeaturePress(item.key)}
  >
    <Text style={styles.featureIcon}>{item.icon}</Text>

    <View style={{ flex: 1 }}>
      <Text style={styles.featureTitle}>
        {t(`profile.features.${item.key}.title`)}
      </Text>
      <Text style={styles.featureSub}>
        {t(`profile.features.${item.key}.sub`)}
      </Text>
    </View>

    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
), []);


 const renderSetting = useCallback(({ item }) => (
  <TouchableOpacity
    style={[
      styles.settingRow,
      item.danger && styles.logoutRow,
    ]}
    activeOpacity={0.8}
    onPress={() => {
      if (item.key === "logout") {
        handleLogout();
      }
    }}
  >
    <Text
      style={[
        styles.settingText,
        item.danger && styles.logoutText,
      ]}
    >
      {t(`profile.settings.${item.key}`)}
    </Text>

    {!item.danger && (
      <View style={styles.settingRight}>
        {item.value && (
          <Text style={styles.settingValue}>{item.value}</Text>
        )}

        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}

        <Text style={styles.arrow}>›</Text>
      </View>
    )}
  </TouchableOpacity>
), []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      {/* HEADER */}
<View style={styles.header}>
  <View style={styles.profileRow}>
    {/* AVATAR */}
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.avatar}
      onPress={() => console.log("Change photo")}
    >
      {PROFILE.profileImage ? (
        <Image
          source={{ uri: PROFILE.profileImage }}
          style={styles.avatarImage}
        />
      ) : (
        <Text style={styles.avatarLetter}>
          {PROFILE.name.charAt(0).toUpperCase()}
        </Text>
      )}

      {/* CAMERA ICON */}
      <View style={styles.cameraIcon}>
        <Text style={{ fontSize: 12 }}>📷</Text>
      </View>
    </TouchableOpacity>

    {/* USER INFO */}
    <View style={styles.userInfo}>
      <Text style={styles.name}>{PROFILE.name}</Text>
      <Text style={styles.phone}>+91{PROFILE.phone}</Text>

      <View style={styles.roleBadge}>
        <Text style={styles.roleText}> {t(`roles.${PROFILE.role.toLowerCase()}`)}</Text>
      </View>
    </View>
  </View>

  {/* EDIT BUTTON */}
  <TouchableOpacity
    style={styles.editBtn}
    activeOpacity={0.8}
    onPress={() => console.log("Edit profile")}
  >
    <Text style={styles.editText}> {t("profile.edit")}</Text>
  </TouchableOpacity>
</View>


        <View style={styles.container}>
          {/* ACCOUNT DETAILS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}> {t("profile.account_details")}</Text>
            <FlatList
              data={account}
              keyExtractor={(item) => item.id}
              renderItem={renderAccount}
              scrollEnabled={false}
            />
          </View>

          {/* FEATURES */}
          <FlatList
            data={features}
            keyExtractor={(item) => item.id}
            renderItem={renderFeature}
            scrollEnabled={false}
          />

          {/* SETTINGS */}
          <View style={styles.settingsCard}>
            <FlatList
              data={settings}
              keyExtractor={(item) => item.id}
              renderItem={renderSetting}
              scrollEnabled={false}
            />
          </View>

          {/* ABOUT */}
          <View style={styles.about}>
            <Text style={styles.aboutText}> {t("profile.app_name")}</Text>
          </View>
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
    backgroundColor: "#2563EB",
  },
  scrollContent: {
    paddingBottom: 30,
  },

header: {
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 16,
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
},

profileRow: {
  flexDirection: "row",
  alignItems: "center",
},

avatar: {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: "rgba(255,255,255,0.3)",
  justifyContent: "center",
  alignItems: "center",
},

avatarImage: {
  width: 72,
  height: 72,
  borderRadius: 36,
},

avatarLetter: {
  fontSize: 32,
  fontWeight: "700",
  color: "#fff",
},

cameraIcon: {
  position: "absolute",
  bottom: -2,
  right: -2,
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,
},

userInfo: {
  marginLeft: 16,
},

name: {
  fontSize: 18,
  fontWeight: "700",
  color: "#fff",
},

phone: {
  fontSize: 13,
  color: "#E8F5E9",
  marginTop: 2,
},

roleBadge: {
  marginTop: 6,
  backgroundColor: "#E8F5E9",
  paddingHorizontal: 10,
  paddingVertical: 3,
  borderRadius: 12,
  alignSelf: "flex-start",
},

roleText: {
  fontSize: 12,
  color: "#2E7D32",
  fontWeight: "600",
},

editBtn: {
  marginTop: 16,
  backgroundColor: "rgba(255,255,255,0.25)",
  paddingVertical: 10,
  borderRadius: 12,
  alignItems: "center",
},

editText: {
  color: "#fff",
  fontWeight: "600",
},

 
  container: {
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: 10,
  },

  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  accountIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  accountLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  accountValue: {
    fontSize: 13,
    fontWeight: "500",
  },

  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  featureTitle: {
    fontWeight: "600",
  },
  featureSub: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginTop: 12,
    elevation: 2,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
  },
  settingText: {
    fontSize: 13,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 6,
  },

  badge: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 6,
    borderRadius: 10,
    marginRight: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },

  logoutRow: {
    justifyContent: "center",
  },
  logoutText: {
    color: "#DC2626",
    fontWeight: "600",
    textAlign: "center",
  },

  arrow: {
    fontSize: 18,
    color: "#9CA3AF",
  },

  about: {
    alignItems: "center",
    marginTop: 18,
  },
  aboutText: {
    fontSize: 12,
    color: "#6B7280",
  },
});
