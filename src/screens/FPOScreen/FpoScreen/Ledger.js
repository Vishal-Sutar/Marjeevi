import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const SUMMARY = [
  { id: "1", key: "pending_payments", value: "₹1.8L", sub: "23 items", color: "#F97316" },
  { id: "2", key: "completed_today", value: "₹45K", sub: "8 items", color: "#22C55E" },
  { id: "3", key: "paid_this_month", value: "₹12.5L", sub: "287 items", color: "#2563EB" },
];

const PENDING_PAYMENTS = [
  {
    id: "1",
    name: "Ramesh Kumar",
    code: "PAY001",
    crop: "Wheat - 450 kg",
    amount: "₹12,500",
    due: "today",
    urgent: true,
  },
];


/* ---------------- SCREEN ---------------- */

const Ledger = () => {
  const [summary, setSummary] = useState([]);
  const [payments, setPayments] = useState([]);

  const navigation = useNavigation()
    const { t } = useTranslation(); // 🌍

  useEffect(() => {
    // Replace later with API calls
    setSummary(SUMMARY);
    setPayments(PENDING_PAYMENTS);
  }, []);

  /* ---------------- RENDER ITEMS ---------------- */

const renderSummary = useCallback(({ item }) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIcon, { backgroundColor: item.color }]} />
    <Text style={styles.summaryValue}>{item.value}</Text>
    <Text style={styles.summaryTitle}>{t(item.key)}</Text>
    <Text style={styles.summarySub}>{item.sub}</Text>
  </View>
), [t]);


const renderPayment = useCallback(({ item }) => (
  <View style={styles.paymentCard}>
    <View style={styles.paymentHeader}>
      <View>
        <View style={styles.nameRow}>
          <Text style={styles.payName}>{item.name}</Text>
          {item.urgent && <Text style={styles.urgent}>{t("urgent")}</Text>}
        </View>
        <Text style={styles.payCode}>{item.code}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.due}>{t("due")}: {t(item.due)}</Text>
      </View>
    </View>

    <Text style={styles.crop}>{item.crop}</Text>

    <TouchableOpacity style={styles.payBtn}>
      <Text style={styles.payBtnText}>✓ {t("mark_paid")}</Text>
    </TouchableOpacity>
  </View>
), [t]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />
      <ScrollView showsVerticalScrollIndicator={false}>
       {/* HEADER */}
<View style={styles.header}>
  <View style={styles.headerRow}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.back}>←</Text>
    </TouchableOpacity>

    <Text style={styles.headerTitle}>{t("ledger")}</Text>
  </View>

  <Text style={styles.headerSub}> {t("ledger_date", { date: "December 24, 2025" })}</Text>
</View>


        <View style={styles.container}>
          {/* SUMMARY */}
          <FlatList
            data={summary}
            keyExtractor={(item) => item.id}
            renderItem={renderSummary}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />

          {/* DOWNLOAD */}
          <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.85}>
            <Text style={styles.downloadText}>⬇ {t("download_ledger")}</Text>
          </TouchableOpacity>

          {/* PENDING */}
          <Text style={styles.sectionTitle}>{t("pending_payments")}</Text>

          <FlatList
            data={payments}
            keyExtractor={(item) => item.id}
            renderItem={renderPayment}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ledger;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2563EB",
  },
  container: {
    backgroundColor: "#F7F9FC",
    padding: 16,
  },
header: {
  backgroundColor: "#2563EB",
  padding: 16,
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,
},

headerRow: {
  flexDirection: "row",
  alignItems: "center",
},

back: {
  color: "#fff",
  fontSize: 22,
  marginRight: 10,
},

headerTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "600",
},

headerSub: {
  color: "#E0E7FF",
  fontSize: 14,
  marginTop: 4,
},


  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerSub: {
    color: "#E0E7FF",
    marginTop: 4,
  },

  summaryCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginRight: 12,
    elevation: 2,
  },
  summaryIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: "700",
    fontSize: 16,
  },
  summaryTitle: {
    fontSize: 12,
    marginTop: 4,
  },
  summarySub: {
    fontSize: 11,
    color: "#6B7280",
  },

  downloadBtn: {
    backgroundColor: "#15803D",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 16,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: 12,
  },

  paymentCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  payName: {
    fontWeight: "600",
    marginRight: 8,
  },
  urgent: {
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
    fontSize: 10,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  payCode: {
    fontSize: 11,
    color: "#6B7280",
  },
  amount: {
    fontWeight: "700",
  },
  due: {
    fontSize: 11,
    color: "#DC2626",
  },
  crop: {
    fontSize: 12,
    marginVertical: 8,
    color: "#374151",
  },
  payBtn: {
    backgroundColor: "#22C55E",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  payBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
