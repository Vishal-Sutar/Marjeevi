import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";

const FARMER_CATEGORIES = [
  {
    id: "1",
    titleKey: "farmer_small",
    subtitleKey: "farmer_small_sub",
    value: "small",
  },
  {
    id: "2",
    titleKey: "farmer_marginal",
    subtitleKey: "farmer_marginal_sub",
    value: "marginal",
  },
  {
    id: "3",
    titleKey: "farmer_medium",
    subtitleKey: "farmer_medium_sub",
    value: "medium",
  },
];


const Screen3 = () => {
  const navigation = useNavigation();
    const { t } = useTranslation(); // 🌍
  const route = useRoute();

  // ✅ data from Screen2
  const { screen2Data } = route.params || {};

  const [selectedId, setSelectedId] = useState(null);

 const renderItem = ({ item }) => {
  const isSelected = selectedId === item.id;

  return (
    <TouchableOpacity
      style={[
        styles.optionCard,
        isSelected && styles.optionCardActive,
      ]}
      onPress={() => setSelectedId(item.id)}
    >
      <Text
        style={[
          styles.optionTitle,
          isSelected && styles.optionTitleActive,
        ]}
      >
        {t(item.titleKey)}
      </Text>

      <Text
        style={[
          styles.optionSubtitle,
          isSelected && styles.optionSubtitleActive,
        ]}
      >
        {t(item.subtitleKey)}
      </Text>
    </TouchableOpacity>
  );
};

  const handleContinue = () => {
    if (!selectedId) {
    Alert.alert(t("error"), t("select_farmer_category_alert"));
      return;
    }

    // 🔹 map id → backend value
    const selectedCategory = FARMER_CATEGORIES.find(
      (item) => item.id === selectedId
    )?.value;

    const screen3Data = {
      ...screen2Data,
      farmerCategory: selectedCategory,
    };

    navigation.navigate("Screen4", { screen3Data });
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

          <Text style={styles.stepText}>{t("step_3_of_4")}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>👨‍🌾</Text>
        </View>

        <Text style={styles.cardTitle}>{t("farmer_category")}</Text>
        <Text style={styles.cardSubTitle}>
          {t("select_farmer_category")}
        </Text>

        <FlatList
          data={FARMER_CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          scrollEnabled={false}
          contentContainerStyle={{ marginTop: 12 }}
        />
      </View>

      {/* CONTINUE */}
      <TouchableOpacity
        style={[
          styles.continueBtn,
          !selectedId && { opacity: 0.6 },
        ]}
        disabled={!selectedId}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>{t("continue")} ›</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Screen3;

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
  width: "42%", // Step 3 of 7
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
    marginBottom: 4,
  },
  cardSubTitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },

  /* OPTIONS */
  optionCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  optionCardActive: {
    borderColor: "#2E7D32",
    backgroundColor: "#E8F5E9",
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  optionTitleActive: {
    color: "#2E7D32",
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  optionSubtitleActive: {
    color: "#2E7D32",
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
  continueText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
