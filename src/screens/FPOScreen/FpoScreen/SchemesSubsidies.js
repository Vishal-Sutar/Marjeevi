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

const SCHEMES_DATA = [
  {
    id: "1",
    name: "PM-KISAN",
    description: "Direct income support of ₹6000/year to farmers",
    enrolled: "187 farmers",
    amount: "₹6,000/year",
  },
  {
    id: "2",
    name: "PM-KISAN",
    description: "Direct income support of ₹6000/year to farmers",
    enrolled: "187 farmers",
    amount: "₹6,000/year",
  },
  {
    id: "3",
    name: "PM-KISAN",
    description: "Direct income support of ₹6000/year to farmers",
    enrolled: "187 farmers",
    amount: "₹6,000/year",
  },
  {
    id: "4",
    name: "PM-KISAN",
    description: "Direct income support of ₹6000/year to farmers",
    enrolled: "187 farmers",
    amount: "₹6,000/year",
  },
];

/* ---------------- SCREEN ---------------- */

const SchemesSubsidies = () => {
  const [schemes, setSchemes] = useState([]);
  
  const navigation = useNavigation()
  const { t } = useTranslation();


  useEffect(() => {
    // Later replace with backend API
    setSchemes(SCHEMES_DATA);
  }, []);

  /* ---------------- RENDER ITEM ---------------- */

const renderItem = ({ item }) => (
  <View style={styles.card}>
    {/* HEADER */}
    <View style={styles.cardHeader}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>🎁</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.schemeName}>{item.name}</Text>
        <Text style={styles.schemeDesc}>{item.description}</Text>
      </View>
    </View>

    <View style={styles.divider} />

    {/* FOOTER */}
    <View style={styles.footerRow}>
      <View>
        <Text style={styles.label}>
          {t("schemes.enrolled")}
        </Text>
        <Text style={styles.value}>{item.enrolled}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.label}>
          {t("schemes.amount")}
        </Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
    </View>
  </View>
);


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
      <Text style={styles.headerTitle}> {t("schemes.title")}</Text>
      <Text style={styles.headerSub}> {t("schemes.subtitle")}</Text>
    </View>
  </View>
</View>

      {/* LIST */}
      <View style={styles.container}>
        <FlatList
          data={schemes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SchemesSubsidies;

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
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
  },

  schemeName: {
    fontSize: 14,
    fontWeight: "600",
  },
  schemeDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 12,
  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  amount: {
    fontSize: 13,
    fontWeight: "600",
    color: "#16A34A",
    marginTop: 2,
  },
});
