import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";

const CROPS = [
  "crop_rice",
  "crop_wheat",
  "crop_maize",
  "crop_cotton",
  "crop_sugarcane",
  "crop_soybean",
  "crop_groundnut",
];

const SEASONS = ["kharif", "rabi", "zaid"];


const Screen4 = () => {
  const navigation = useNavigation();
    const { t } = useTranslation(); // 🌍
  const route = useRoute();

  // ✅ data from Screen3
  const { screen3Data } = route.params || {};

  const [selectedCrop, setSelectedCrop] = useState("");
  const [showCrops, setShowCrops] = useState(false);
  const [season, setSeason] = useState("");
  const [quantity, setQuantity] = useState("");

  const isFormValid = selectedCrop && season;

 const renderCropItem = ({ item }) => (
  <TouchableOpacity
    style={styles.dropdownItem}
    onPress={() => {
      setSelectedCrop(item);
      setShowCrops(false);
    }}
  >
    <Text style={styles.dropdownItemText}>{t(item)}</Text>
  </TouchableOpacity>
);

  const handleContinue = () => {
    if (!isFormValid) {
      Alert.alert(t("error"), t("select_crop_season"));
      return;
    }

    // ✅ backend-ready crops array
    const cropsGrown = [
      {
        cropName: selectedCrop,
        season: season.toLowerCase(), // kharif / rabi / zaid
        quantityProduced: quantity || "",
      },
    ];

    const screen4Data = {
      ...screen3Data,
      cropsGrown,
    };

    navigation.navigate("Screen5", { screen4Data });
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
          <Text style={styles.stepText}>{t("step_4_of_5")}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🌿</Text>
        </View>

        <Text style={styles.cardTitle}>{t("crops_grown")}</Text>
        <Text style={styles.cardSub}>{t("current_year")}</Text>

        {/* CROP */}
        <Text style={styles.label}>{t("crop_name")} *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowCrops((prev) => !prev)}
        >
          <Text style={styles.dropdownText}>
           {selectedCrop ? t(selectedCrop) : t("select_crop")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {showCrops && (
          <View style={styles.dropdownList}>
            <FlatList
              data={CROPS}
              keyExtractor={(item) => item}
              renderItem={renderCropItem}
            />
          </View>
        )}

        {/* SEASON */}
        <Text style={styles.label}>{t("season")} *</Text>
       <View style={styles.seasonRow}>
  {SEASONS.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.seasonBtn,
        season === item && styles.seasonBtnActive,
      ]}
      onPress={() => setSeason(item)}
    >
      <Text
        style={[
          styles.seasonText,
          season === item && styles.seasonTextActive,
        ]}
      >
        {t(item)}   {/* 🔥 localized */}
      </Text>
    </TouchableOpacity>
  ))}
</View>


        {/* QUANTITY */}
        <Text style={styles.label}>{t("quantity_optional")}</Text>
        <TextInput
          placeholder={t("quantity_placeholder")}
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
      </View>

      {/* CONTINUE */}
      <TouchableOpacity
        style={[
          styles.continueBtn,
          !isFormValid && styles.continueBtnDisabled,
        ]}
        disabled={!isFormValid}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>{t("continue")} ›</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Screen4;

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
  marginBottom: 10,
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

progressBarBg: {
  height: 4,
  width: "100%",
  backgroundColor: "#E0E0E0",
  borderRadius: 2,
},

progressBarFill: {
  height: 4,
  width: "56%", // Step 4 of 7
  backgroundColor: "#2E7D32",
  borderRadius: 2,
},

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
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
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },

  /* FORM */
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
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

  /* SEASON */
  seasonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  seasonBtn: {
    width: "32%",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  seasonBtnActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  seasonText: {
    fontSize: 13,
    color: "#555",
  },
  seasonTextActive: {
    color: "#2E7D32",
    fontWeight: "600",
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
  },

  /* ADD MORE */
  addMoreBtn: {
    marginTop: 14,
    backgroundColor: "#EAF4EA",
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
  },

  /* CONTINUE */
  continueBtn: {
    backgroundColor: "#2E7D32",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  continueBtnDisabled: {
    opacity: 0.5,
  },
  continueText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
