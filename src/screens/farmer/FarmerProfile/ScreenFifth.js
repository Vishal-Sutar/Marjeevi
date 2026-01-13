import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const IRRIGATION_TYPES = [
  "irrigation_canal",
  "irrigation_borewell",
  "irrigation_rainfed",
  "irrigation_drip",
];

const SOIL_TYPES = [
  "soil_black",
  "soil_red",
  "soil_alluvial",
  "soil_sandy",
];

const Screen5 = () => {
  const navigation = useNavigation();
    const { t } = useTranslation(); // 🌍
  const route = useRoute();

  // ✅ data from Screen4
  const { screen4Data } = route.params || {};

  const [plotId, setPlotId] = useState("");
  const [area, setArea] = useState("");
  const [irrigation, setIrrigation] = useState("");
  const [soil, setSoil] = useState("");

  const [showIrrigation, setShowIrrigation] = useState(false);
  const [showSoil, setShowSoil] = useState(false);

  const isFormValid = plotId && area && irrigation && soil;

const renderIrrigationItem = ({ item }) => (
  <TouchableOpacity
    style={styles.dropdownItem}
    onPress={() => {
      setIrrigation(item);
      setShowIrrigation(false);
    }}
  >
    <Text style={styles.dropdownItemText}>{t(item)}</Text>
  </TouchableOpacity>
);


const renderSoilItem = ({ item }) => (
  <TouchableOpacity
    style={styles.dropdownItem}
    onPress={() => {
      setSoil(item);
      setShowSoil(false);
    }}
  >
    <Text style={styles.dropdownItemText}>{t(item)}</Text>
  </TouchableOpacity>
);


  const handleContinue = () => {
    if (!isFormValid) {
     Alert.alert(t("error"), t("fill_land_details"));

      return;
    }

    // ✅ backend-ready land details
    const landDetails = [
      {
        plotId,
        area: Number(area),
        irrigationType: irrigation,
        soilType: soil,
      },
    ];

    const finalPayload = {
      ...screen4Data,
      landDetails,
    };

    navigation.navigate("Screen6", { finalPayload });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={navigation.goBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>{t("step_5_of_6")}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>🏡</Text>
        </View>

        <Text style={styles.cardTitle}>{t("land_details")}</Text>

        <Text style={styles.label}>{t("plot_id")} *</Text>
        <TextInput
          placeholder={t("plot_placeholder")}
          style={styles.input}
          value={plotId}
          onChangeText={setPlotId}
        />

        <Text style={styles.label}>{t("area_hectares")}</Text>
        <TextInput
          placeholder={t("area_placeholder")}
          style={styles.input}
          value={area}
          onChangeText={setArea}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>{t("irrigation_type")}</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setShowIrrigation(!showIrrigation);
            setShowSoil(false);
          }}
        >
          <Text style={styles.dropdownText}>
            {irrigation ? t(irrigation) : t("select_type")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {showIrrigation && (
          <View style={styles.dropdownList}>
            <FlatList
              data={IRRIGATION_TYPES}
              keyExtractor={(item) => item}
              renderItem={renderIrrigationItem}
            />
          </View>
        )}

        <Text style={styles.label}>{t("soil_type")}</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setShowSoil(!showSoil);
            setShowIrrigation(false);
          }}
        >
          <Text style={styles.dropdownText}>
           {soil ? t(soil) : t("select_soil")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {showSoil && (
          <View style={styles.dropdownList}>
            <FlatList
              data={SOIL_TYPES}
              keyExtractor={(item) => item}
              renderItem={renderSoilItem}
            />
          </View>
        )}
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

export default Screen5;

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
  width: "70%", // Step 5 of 7
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
    marginBottom: 6,
  },

  /* FORM */
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
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
    maxHeight: 180,
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
