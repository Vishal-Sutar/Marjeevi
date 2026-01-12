import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const STATS = [
  { id: "1", key: "today_procurements", value: "24", icon: "🧾" },
  { id: "2", key: "pending_quality", value: "8", icon: "⏳" },
  { id: "3", key: "pending_payments", value: "12", icon: "₹" },
];

const RECENT_PROCUREMENTS = [
  {
    id: "1",
    farmer: "Ramesh Kumar",
    code: "PR001",
    crop: "Wheat",
    quantity: "450 kg",
    amount: "₹12,500",
    date: "24 Dec 2025",
    status: "Completed",
  },
  {
    id: "2",
    farmer: "Ramesh Kumar",
    code: "PR001",
    crop: "Wheat",
    quantity: "450 kg",
    amount: "₹12,500",
    date: "24 Dec 2025",
    status: "Completed",
  },
  {
    id: "3",
    farmer: "Ramesh Kumar",
    code: "PR001",
    crop: "Wheat",
    quantity: "450 kg",
    amount: "₹12,500",
    date: "24 Dec 2025",
    status: "Completed",
  },
];

/* ---------------- SCREEN ---------------- */

const Home = () => {
  const navigation = useNavigation()
    const { t } = useTranslation(); // 🌍
  const [stats, setStats] = useState([]);
  const [procurements, setProcurements] = useState([]);

  useEffect(() => {
    // Later replace with backend API
    setStats(STATS);
    setProcurements(RECENT_PROCUREMENTS);
  }, []);

  /* ---------------- RENDERERS ---------------- */


  const renderProcurement = ({ item }) => (
    <View style={styles.procCard}>
      <View style={styles.procHeader}>
        <Text style={styles.procName}>
          {item.farmer} <Text style={styles.procCode}>— {item.code}</Text>
        </Text>

        <View style={styles.completedBadge}>
          <Text style={styles.completedText}> {t(`status.${item.status.toLowerCase()}`)}</Text>
        </View>
      </View>

      <Text style={styles.procCrop}>
        {item.crop} • {item.quantity}
      </Text>

      <View style={styles.procFooter}>
        <View>
          <Text style={styles.procLabel}>{t("common.amount")}</Text>
          <Text style={styles.procAmount}>{item.amount}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.procLabel}>{t("common.date")}</Text>
          <Text style={styles.procDate}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("home.title")}</Text>
          <Text style={styles.headerSub}>{t("home.subtitle")}</Text>
        </View>

        <View style={styles.container}>
          {/* STATS */}
         <View style={styles.statsRow}>
  {stats.map((item) => (
    <View key={item.id} style={styles.statCard}>
      <View style={styles.statIcon}>
        <Text>{item.icon}</Text>
      </View>

      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statLabel}>
        {t(`stats.${item.key}`)}
      </Text>
    </View>
  ))}
</View>

          {/* ADD LISTING */}
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.85}
            onPress={() => console.log("Add Listing")}
          >
            <Text style={styles.addText}>＋ {t("home.add_listing")}</Text>
          </TouchableOpacity>

          {/* RECENT */}
          <Text style={styles.sectionTitle}>{t("home.recent_procurements")}</Text>

          <FlatList
            data={procurements}
            keyExtractor={(item) => item.id}
            renderItem={renderProcurement}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F97316",
  },

  header: {
    backgroundColor: "#F97316",
    padding: 16,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSub: {
    color: "#FFF7ED",
    fontSize: 12,
    marginTop: 4,
  },

  container: {
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    elevation: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFEDD5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
    color: "#6B7280",
  },

  addBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },

  procCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  procHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  procName: {
    fontWeight: "600",
    fontSize: 13,
  },
  procCode: {
    fontSize: 11,
    color: "#6B7280",
  },

  completedBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedText: {
    fontSize: 10,
    color: "#16A34A",
    fontWeight: "600",
  },

  procCrop: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 10,
  },

  procFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  procLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  procAmount: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
  procDate: {
    fontSize: 12,
    marginTop: 2,
  },
});
