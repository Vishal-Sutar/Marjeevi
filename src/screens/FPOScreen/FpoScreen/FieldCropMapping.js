import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native";
import { useTranslation } from "react-i18next";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const FIELD_DATA = [
  {
    id: "1",
    farmer: "Ramesh Kumar",
    field: "Field 1 - North",
    area: "5.2 acres",
    crop: "Wheat",
    status: "Growing",
  },
  {
    id: "2",
    farmer: "Suresh Patel",
    field: "Field 1 - East",
    area: "3.8 acres",
    crop: "Cotton",
    status: "Harvesting",
  },
  {
    id: "3",
    farmer: "Mahesh Singh",
    field: "Field 2 - South",
    area: "4.5 acres",
    crop: "Rice",
    status: "Growing",
  },
];

/* ---------------- SCREEN ---------------- */

const FieldCropMapping = () => {
  const [data, setData] = useState([]);

  const navigation = useNavigation()
      const { t } = useTranslation(); // 🌍

  useEffect(() => {
    // later replace with API
    setData(FIELD_DATA);
  }, []);

 const renderItem = ({ item }) => {
  const isGrowing = item.status === "Growing";

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>🗺️</Text>
        </View>

        <View>
          <Text style={styles.farmer}>{item.farmer}</Text>
          <Text style={styles.field}>{item.field}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* AREA & CROP */}
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.label}>
            {t("field_mapping.area")}
          </Text>
          <Text style={styles.value}>{item.area}</Text>
        </View>

        <View>
          <Text style={styles.label}>
            {t("field_mapping.crop")}
          </Text>
          <Text style={styles.value}>🌱 {item.crop}</Text>
        </View>
      </View>

      {/* STATUS */}
      <View style={styles.statusRow}>
        <Text style={styles.label}>
          {t("field_mapping.status")}:
        </Text>

        <View
          style={[
            styles.statusBadge,
            isGrowing ? styles.growing : styles.harvesting,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              isGrowing
                ? styles.growingText
                : styles.harvestingText,
            ]}
          >
            {t(`field_mapping.status_${item.status.toLowerCase()}`)}
          </Text>
        </View>
      </View>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

           {/* HEADER */}
<View style={styles.header}>
  <View style={styles.headerRow}>
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}
    >
      <Text style={styles.backIcon}>←</Text>
    </TouchableOpacity>

    <View>
      <Text style={styles.headerTitle}> {t("field_mapping.title")}</Text>
      <Text style={styles.headerSub}>{t("field_mapping.subtitle")}</Text>
    </View>
  </View>
</View>

      {/* LIST */}
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FieldCropMapping;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2563EB",
  },

header: {
  backgroundColor: "#2563EB",
  paddingHorizontal: 16,
  paddingVertical: 18,
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,
},

headerRow: {
  flexDirection: "row",
  alignItems: "center",
},

backBtn: {
  width: 36,
  height: 36,
  borderRadius: 18,
  backgroundColor: "rgba(255,255,255,0.2)",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

backIcon: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "600",
},

headerTitle: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "700",
},

headerSub: {
  color: "#E0E7FF",
  fontSize: 12,
  marginTop: 2,
},

  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
  },

  farmer: {
    fontSize: 14,
    fontWeight: "600",
  },
  field: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
    color: "#6B7280",
  },
  value: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusBadge: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  growing: {
    backgroundColor: "#DCFCE7",
  },
  growingText: {
    color: "#16A34A",
  },

  harvesting: {
    backgroundColor: "#E0F2FE",
  },
  harvestingText: {
    color: "#0284C7",
  },
});
