import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/AuthSlice";
import { useTranslation } from "react-i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUserDetails } from "../../../Redux/apiService";

const MENU_ITEMS = [
    { id: 1, title: "Personal Details", icon: "👤", screen: "PersonalDetails" },
    { id: 2, title: "Address Details", icon: "📍", screen: "AddressDetails" },
    { id: 3, title: "Farmer Category", icon: "🧑‍🌾" },
    { id: 4, title: "Crops Grown", icon: "🌱", screen: "CropsGrown" },
    { id: 5, title: "Land Details", icon: "🏡", screen: "LandDetails" },
    { id: 6, title: "Bank Details", icon: "🏦", screen: "BankDetails" },
    { id: 7, title: "Uploaded Documents", icon: "📄", screen: "UploadedDocuments" },
    { id: 8, title: "Help & Support", icon: "❓", screen: "HelpSupport" },
  ];

const FarmerProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Refresh data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails();
    }, [])
  );

  const fetchUserDetails = async () => {
    try {
      console.log('🔍 FarmerProfile - Fetching user details...');
      const response = await getUserDetails();
      console.log('🔍 FarmerProfile - Raw response:', JSON.stringify(response, null, 2));
      
      const userData = response.data || response;
      console.log('🔍 FarmerProfile - Processed userData:', JSON.stringify(userData, null, 2));
      
      setUserDetails(userData);
    } catch (error) {
      console.error('🔍 FarmerProfile - Failed to fetch user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuPress = (item) => {
    console.log('Menu pressed:', item.title, item.screen);
    if (item.screen) {
      try {
        navigation.navigate(item.screen);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const logoutUser = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>👤</Text>
              <View style={styles.cameraIcon}>
                <Text style={{ fontSize: 12 }}>📷</Text>
              </View>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.name}>
                {loading ? "Loading..." : `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`}
              </Text>
              <Text style={styles.phone}>
                {loading ? "Loading..." : `+91 ${userDetails?.phone || "N/A"}`}
              </Text>

              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>Farmer</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* MENU LIST */}
        <View style={styles.listWrapper}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}>
                  <Text>{item.icon}</Text>
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={logoutUser}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>⎋  Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default FarmerProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7F6",
  },

  /* HEADER */
  header: {
    backgroundColor: "#4CAF50",
    paddingTop: 50,
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

  avatarIcon: {
    fontSize: 32,
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
    elevation: 2,
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

  /* MENU */
  listWrapper: {
    paddingHorizontal: 16,
    marginTop: 20,
  },

  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  arrow: {
    fontSize: 20,
    color: "#9CA3AF",
  },

  /* LOGOUT */
  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#FDECEC",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  logoutText: {
    color: "#E53935",
    fontWeight: "700",
    fontSize: 14,
  },
});
