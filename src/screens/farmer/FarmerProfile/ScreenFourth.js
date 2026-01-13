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

const ScreenFourth = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const CROPS_LIST = [
    { id: "rice", name: "Rice", key: "crop_rice" },
    { id: "wheat", name: "Wheat", key: "crop_wheat" },
    { id: "maize", name: "Maize", key: "crop_maize" },
    { id: "cotton", name: "Cotton", key: "crop_cotton" },
    { id: "sugarcane", name: "Sugarcane", key: "crop_sugarcane" },
    { id: "soybean", name: "Soybean", key: "crop_soybean" },
    { id: "groundnut", name: "Groundnut", key: "crop_groundnut" }
  ];
  
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      console.log('🌱 ScreenFourth - Fetching user data...');
      const response = await getUserDetails();
      console.log('🌱 ScreenFourth - Raw response:', JSON.stringify(response, null, 2));
      
      const userData = response.data || response;
      console.log('🌱 ScreenFourth - Processed userData:', JSON.stringify(userData, null, 2));
      
      if (userData && userData.cropsGrown) {
        const cropNames = userData.cropsGrown.map(crop => {
          const foundCrop = CROPS_LIST.find(c => c.name.toLowerCase() === crop.cropName?.toLowerCase());
          return foundCrop ? foundCrop.id : crop.cropName?.toLowerCase();
        });
        setSelectedCrops(cropNames || []);
        console.log('🌱 ScreenFourth - Form populated with:', {
          cropsGrown: cropNames
        });
      }
    } catch (error) {
      console.error('🌱 ScreenFourth - Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCrop = (cropId) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropId)) {
        return prev.filter(id => id !== cropId);
      } else {
        return [...prev, cropId];
      }
    });
  };
  
  const handleUpdate = async () => {
    if (selectedCrops.length === 0) {
      Alert.alert(t("error"), "Please select at least one crop");
      return;
    }

    setLoading(true);
    try {
      console.log('🌱 ScreenFourth - Current form values:', {
        selectedCrops
      });
      
      // Get current user data to preserve existing crop structure
      const response = await getUserDetails();
      const userData = response.data || response;
      
      // Only keep selected crops, preserve their exact structure
      const updatedCrops = userData.cropsGrown?.filter(crop => {
        const foundCrop = CROPS_LIST.find(c => c.name.toLowerCase() === crop.cropName?.toLowerCase());
        const cropId = foundCrop ? foundCrop.id : crop.cropName?.toLowerCase();
        return selectedCrops.includes(cropId);
      }) || [];
      
      const profileData = {
        cropsGrown: updatedCrops // Keep exact same structure, just filter
      };
      
      console.log('🌱 ScreenFourth - Sending profile data:', profileData);
      const updateResponse = await updateProfile(profileData);
      console.log('🌱 ScreenFourth - Profile updated:', updateResponse);
      
      Alert.alert("Success", "Crops grown updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error('🌱 ScreenFourth - Update profile error:', error);
      Alert.alert("Error", "Failed to update crops grown. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCropItem = ({ item }) => {
    const isSelected = selectedCrops.includes(item.id);
    
    return (
      <TouchableOpacity
        style={[styles.cropItem, isSelected && styles.cropItemSelected]}
        onPress={() => toggleCrop(item.id)}
      >
        <View style={styles.checkbox}>
          {isSelected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={[styles.cropText, isSelected && styles.cropTextSelected]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
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
          <Text style={styles.stepText}>Crops Grown</Text>
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🌱</Text>
        </View>

        <Text style={styles.cardTitle}>Edit Crops Grown</Text>
        <Text style={styles.cardSubtitle}>Select the crops you grow</Text>

        {/* CROPS LIST */}
        <FlatList
          data={CROPS_LIST}
          keyExtractor={(item) => item.id}
          renderItem={renderCropItem}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ marginTop: 16 }}
        />
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

export default ScreenFourth;

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
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },

  /* CROPS */
  row: {
    justifyContent: "space-between",
  },

  cropItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    width: "48%",
  },

  cropItemSelected: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#2E7D32",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  checkmark: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "bold",
  },

  cropText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },

  cropTextSelected: {
    color: "#2E7D32",
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