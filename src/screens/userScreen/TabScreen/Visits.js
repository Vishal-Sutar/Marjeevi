import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";

/* ---------------- DUMMY DATA (API READY) ---------------- */

const FARMERS_DATA = [
  {
    id: "1",
    name: "Ramesh Kumar",
    village: "Rajpur Village",
    phone: "+91 98765 43210",
    fields: "5 fields",
    verified: true,
  },
  {
    id: "2",
    name: "Rajesh Thakur",
    village: "Nagpur ",
    phone: "+91 98765 43210",
    fields: "6 fields",
    verified: true,
  },
  {
    id: "3",
    name: "Kunal Mishra",
    village: "Bhihar ",
    phone: "+91 98765 43210",
    fields: "5 fields",
    verified: true,
  },
  {
    id: "4",
    name: "Ramesh Kumar",
    village: "Ratnagiri",
    phone: "+91 98765 43210",
    fields: "3 fields",
    verified: true,
  },
];

/* ---------------- SCREEN ---------------- */

const Visits = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
    const { t } = useTranslation();

  useEffect(() => {
    // Later replace with backend API
    setFarmers(FARMERS_DATA);
  }, []);

  /* ---------------- FILTER (API READY) ---------------- */

  const filteredFarmers = farmers.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- RENDER ITEM ---------------- */

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{item.name}</Text>

        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✔ {t("farmers.verified")}</Text>
          </View>
        )}
      </View>

      <Text style={styles.subText}>📍 {item.village}</Text>
      <Text style={styles.subText}>📞 {item.phone}</Text>
      <Text style={styles.fields}> {item.fields} {t("farmers.fields")}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>  {t("farmers.title")}</Text>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder={t("farmers.search")}
            placeholderTextColor="#FED7AA"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* LIST */}
      <View style={styles.container}>
        <FlatList
          data={filteredFarmers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Visits;

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
    marginBottom: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    color: "#fff",
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  card: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
  },

  verifiedBadge: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  verifiedText: {
    fontSize: 10,
    color: "#16A34A",
    fontWeight: "600",
  },

  subText: {
    fontSize: 12,
    color: "#374151",
    marginTop: 2,
  },

  fields: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },
});
