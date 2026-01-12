import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const FARMERS = [
  {
    id: "1",
    name: "Ramesh Kumar",
    phone: "+91 98765 43210",
    village: "Rajur Village",
    fields: 5,
    status: "verified",
  },
  {
    id: "2",
    name: "Suresh Patel",
    phone: "+91 98123 45678",
    village: "Mangala Village",
    fields: 3,
    status: "verified",
  },
  {
    id: "3",
    name: "Mahesh Singh",
    phone: "+91 97654 32109",
    village: "Keshav Village",
    fields: 4,
    status: "pending",
  },
  {
    id: "4",
    name: "Rajesh Yadav",
    phone: "+91 96543 21098",
    village: "Hari Village",
    fields: 6,
    status: "verified",
  },
  {
    id: "5",
    name: "Dinesh Sharma",
    phone: "+91 95432 10987",
    village: "Shiv Village",
    fields: 2,
    status: "pending",
  },
];

/* ---------------- SCREEN ---------------- */

const Visits = () => {
  const navigation = useNavigation();
     const { t } = useTranslation(); // 🌍

  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | verified | pending

  useEffect(() => {
    // Replace later with API call
    setFarmers(FARMERS);
  }, []);

  /* ---------------- FILTER LOGIC ---------------- */

  const filteredFarmers = useMemo(() => {
    return farmers.filter((f) => {
      const matchesSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.village.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : f.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [farmers, search, filter]);

  /* ---------------- RENDER ITEM ---------------- */

 const renderFarmer = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.name}>{item.name}</Text>

      <View
        style={[
          styles.statusBadge,
          item.status === "verified"
            ? styles.verified
            : styles.pending,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            item.status === "verified"
              ? styles.verifiedText
              : styles.pendingText,
          ]}
        >
          {t(`status.${item.status}`)}
        </Text>
      </View>
    </View>

    <Text style={styles.info}>📞 {item.phone}</Text>
    <Text style={styles.info}>📍 {item.village}</Text>

    <View style={styles.cardFooter}>
      <Text style={styles.fields}>
        {item.fields} {t("fields")}
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("FarmerDetails", { id: item.id })
        }
      >
        <Text style={styles.viewDetails}>
          {t("view_details")} →
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2563EB" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>←</Text>
            </TouchableOpacity>

            <View>
              <Text style={styles.headerTitle}>{t("farmer_management")}</Text>
              <Text style={styles.headerSub}>
              {t("farmer_management_sub")}
              </Text>
            </View>
          </View>

          {/* SEARCH */}
          <TextInput
            placeholder={t("search_farmers")}
            placeholderTextColor="#C7D2FE"
            value={search}
            onChangeText={setSearch}
            style={styles.search}
          />

          {/* FILTER TABS */}
          <View style={styles.tabs}>
          {["all", "verified", "pending"].map((type) => (
  <TouchableOpacity
    key={type}
    onPress={() => setFilter(type)}
    style={[styles.tab, filter === type && styles.activeTab]}
  >
    <Text
      style={[
        styles.tabText,
        filter === type && styles.activeTabText,
      ]}
    >
      {t(`filter.${type}`)}
    </Text>
  </TouchableOpacity>
))}

          </View>
        </View>

        {/* LIST */}
        <View style={styles.listContainer}>
          <FlatList
            data={filteredFarmers}
            keyExtractor={(item) => item.id}
            renderItem={renderFarmer}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Visits;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2563EB",
  },
  scrollContent: {
    paddingBottom: 24,
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
    gap: 12,
  },
  back: {
    color: "#fff",
    fontSize: 22,
    marginRight: 6,
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

  search: {
    backgroundColor: "#1D4ED8",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,
    color: "#fff",
  },

  tabs: {
    flexDirection: "row",
    marginTop: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1D4ED8",
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#C7D2FE",
    fontSize: 12,
  },
  activeTabText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  listContainer: {
    padding: 16,
    backgroundColor: "#F7F9FC",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  name: {
    fontWeight: "600",
    fontSize: 14,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  verified: {
    backgroundColor: "#DCFCE7",
  },
  pending: {
    backgroundColor: "#FFE4E6",
  },
  statusText: {
    fontSize: 10,
  },
  verifiedText: {
    color: "#16A34A",
  },
  pendingText: {
    color: "#DC2626",
  },

  info: {
    fontSize: 12,
    color: "#374151",
    marginTop: 4,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  fields: {
    fontSize: 12,
    color: "#6B7280",
  },
  viewDetails: {
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "600",
  },
});
