import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getUserDetails, updateProfile } from "../../../Redux/apiService";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList
} from "react-native";
import { useTranslation } from "react-i18next";

const ScreenSecond = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const STATES = t("states", { returnObjects: true });
  const DISTRICTS = t("districts", { returnObjects: true });
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showStates, setShowStates] = useState(false);
  const [showDistricts, setShowDistricts] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log('🏠 ScreenSecond - Fetching user data...');
      const response = await getUserDetails();
      console.log('🏠 ScreenSecond - Raw response:', JSON.stringify(response, null, 2));
      
      const userData = response.data || response;
      console.log('🏠 ScreenSecond - Processed userData:', JSON.stringify(userData, null, 2));
      
      if (userData) {
        setSelectedState(userData.state || "");
        setSelectedDistrict(userData.district || "");
        console.log('🏠 ScreenSecond - Form populated with:', {
          state: userData.state,
          district: userData.district
        });
      }
    } catch (error) {
      console.error('🏠 ScreenSecond - Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    if (!selectedState || !selectedDistrict) {
      Alert.alert(t("error"), "Please select both state and district");
      return;
    }

    setLoading(true);
    try {
      console.log('🏠 ScreenSecond - Current form values:', {
        selectedState,
        selectedDistrict
      });
      
      const profileData = {
        state: selectedState,
        district: selectedDistrict
      };
      
      console.log('🏠 ScreenSecond - Sending profile data:', profileData);
      const response = await updateProfile(profileData);
      console.log('🏠 ScreenSecond - Profile updated:', response);
      
      // Check if state/district were actually updated
      const updatedData = response.data;
      if (updatedData.state !== selectedState || updatedData.district !== selectedDistrict) {
        Alert.alert(
          "Partial Update", 
          "Address updated but some fields couldn't be changed. This may be restricted by the server.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert("Success", "Address updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('🏠 ScreenSecond - Update profile error:', error);
      Alert.alert("Error", "Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>Address Details</Text>
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <Text style={styles.cardTitle}>Edit Address Details</Text>

        {/* STATE */}
        <Text style={styles.label}>{t("state")} *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowStates(!showStates)}
        >
          <Text style={styles.dropdownText}>
            {selectedState || t("select_state")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {/* STATE LIST */}
        {showStates && (
          <View style={styles.dropdownList}>
            <FlatList
              data={STATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedState(item);
                    setShowStates(false);
                    setSelectedDistrict(""); // Reset district when state changes
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        )}

        {/* DISTRICT */}
        <Text style={styles.label}>{t("district")} *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDistricts(!showDistricts)}
        >
          <Text style={styles.dropdownText}>
            {selectedDistrict || t("select_district")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {/* DISTRICT LIST */}
        {showDistricts && (
          <View style={styles.dropdownList}>
            <FlatList
              data={DISTRICTS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedDistrict(item);
                    setShowDistricts(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        )}
      </View>

      {/* UPDATE BUTTON */}
      <TouchableOpacity 
        style={[styles.updateBtn, loading && styles.updateBtn]} 
        onPress={handleUpdate}
        disabled={loading}
      >
        <Text style={styles.updateText}>{loading ? "Updating..." : "Update"}</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default ScreenSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F5",
  },

  /* HEADER */
  header: {
    padding: 16,
    backgroundColor: "#F4F6F5",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 22,
    color: "#333",
    lineHeight: 22,
  },

  stepText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  
  icon: {
    fontSize: 18,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  /* FORM */
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    color: "#333",
  },

  dropdown: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 14,
    color: "#555",
  },

  dropdownIcon: {
    fontSize: 16,
    color: "#777",
  },

  dropdownList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginTop: 6,
    backgroundColor: "#fff",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },

  /* UPDATE BUTTON */
  updateBtn: {
    backgroundColor: "#2E7D32",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  
  updateText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});