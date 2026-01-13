import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { getUserDetails, updateProfile } from "../../../Redux/apiService";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";

const ScreenThird = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const FARMER_CATEGORIES = [
    { id: "small", label: "Small Farmer" },
    { id: "medium", label: "Medium Farmer" },
    { id: "large", label: "Large Farmer" },
    { id: "marginal", label: "Marginal Farmer" }
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log('🧑‍🌾 ScreenThird - Fetching user data...');
      const response = await getUserDetails();
      console.log('🧑‍🌾 ScreenThird - Raw response:', JSON.stringify(response, null, 2));
      
      const userData = response.data || response;
      console.log('🧑‍🌾 ScreenThird - Processed userData:', JSON.stringify(userData, null, 2));
      
      if (userData) {
        setSelectedCategory(userData.farmerCategory || "");
        console.log('🧑‍🌾 ScreenThird - Form populated with:', {
          farmerCategory: userData.farmerCategory
        });
      }
    } catch (error) {
      console.error('🧑‍🌾 ScreenThird - Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = async () => {
    if (!selectedCategory) {
      Alert.alert(t("error"), "Please select a farmer category");
      return;
    }

    setLoading(true);
    try {
      console.log('🧑‍🌾 ScreenThird - Current form values:', {
        selectedCategory
      });
      
      const profileData = {
        farmerCategory: selectedCategory
      };
      
      console.log('🧑‍🌾 ScreenThird - Sending profile data:', profileData);
      const response = await updateProfile(profileData);
      console.log('🧑‍🌾 ScreenThird - Profile updated:', response);
      
      // Check if farmer category was actually updated
      const updatedData = response.data;
      if (updatedData.farmerCategory !== selectedCategory) {
        Alert.alert(
          "Partial Update", 
          "Profile updated but farmer category couldn't be changed. This may be restricted by the server.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert("Success", "Farmer category updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('🧑‍🌾 ScreenThird - Update profile error:', error);
      Alert.alert("Error", "Failed to update farmer category. Please try again.");
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
          <Text style={styles.stepText}>Farmer Category</Text>
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🧑‍🌾</Text>
        </View>

        <Text style={styles.cardTitle}>Edit Farmer Category</Text>

        {/* FARMER CATEGORY */}
        <Text style={styles.label}>Farmer Category *</Text>
        
        {FARMER_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.radioOption}
            onPress={() => setSelectedCategory(category.id)}
          >
            <View style={styles.radioButton}>
              {selectedCategory === category.id && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
            <Text style={styles.radioText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
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

export default ScreenThird;

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
    marginBottom: 12,
    marginTop: 10,
    color: "#333",
  },

  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#2E7D32",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2E7D32",
  },

  radioText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
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