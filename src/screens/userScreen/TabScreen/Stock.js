import { useNavigation } from "@react-navigation/native";
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

/* ---------------- DUMMY DATA (API READY) ---------------- */

const SUMMARY = [
  { id: "1", key: "low_stock", value: "12" },
  { id: "2", key: "total_products", value: "234" },
  { id: "3", key: "near_expiry", value: "5" },
  { id: "4", key: "out_of_stock", value: "3" },
];


const STOCK_DATA = [
  {
    id: "1",
    name: "NPK Fertilizer 20:20:20",
    brand: "Aarti Agri Corp",
    price: "₹850",
    quantity: "45 bags",
    expiry: "2026-03-15",
    status: "In Stock",
  },
  {
    id: "2",
    name: "NPK Fertilizer 20:20:20",
    brand: "Aarti Agri Corp",
    price: "₹850",
    quantity: "10 bags",
    expiry: "2025-11-10",
    status: "Low Stock",
  },
];

/* ---------------- SCREEN ---------------- */

const Stock = () => {
  const [summary, setSummary] = useState([]);
  const [stocks, setStocks] = useState([]);
  // const navigation = useNavigation();
    const { t } = useTranslation();

  useEffect(() => {
    // Later replace with backend API
    setSummary(SUMMARY);
    setStocks(STOCK_DATA);
  }, []);

  /* ---------------- RENDERERS ---------------- */

  const renderSummary = ({ item }) => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{item.value}</Text>
      <Text style={styles.summaryLabel}>{t(`stock.summary.${item.key}`)}</Text>
    </View>
  );

 const renderStock = ({ item }) => {
  const status = item.status?.toLowerCase();

  const isInStock = status === "in stock";
  const isLowStock = status === "low stock";

  const badgeStyle = isInStock
    ? styles.inStock
    : isLowStock
    ? styles.lowStock
    : styles.outStock;

  const textStyle = isInStock
    ? styles.inStockText
    : isLowStock
    ? styles.lowStockText
    : styles.outStockText;

  return (
    <View style={styles.stockCard}>
      {/* HEADER */}
      <View style={styles.stockHeader}>
        <View style={styles.iconBox}>
          <Text>📦</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.stockName}>{item.name}</Text>
          <Text style={styles.stockBrand}>
            {t("stock.brand")}: {item.brand}
          </Text>
          <Text style={styles.stockPrice}>
            {t("stock.mrp")} {item.price}
          </Text>
        </View>
      </View>

      {/* INFO */}
      <View style={styles.stockInfo}>
        <View>
          <Text style={styles.infoLabel}>{t("stock.in_stock")}</Text>
          <Text style={styles.infoValue}>{item.quantity}</Text>
        </View>

        <View>
          <Text style={styles.infoLabel}>{t("stock.expiry")}</Text>
          <Text style={styles.infoValue}>{item.expiry}</Text>
        </View>

        <TouchableOpacity
          style={styles.updateBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.updateText}>
            {t("common.update")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* STATUS */}
      <View style={[styles.statusBadge, badgeStyle]}>
        <Text style={[styles.statusText, textStyle]}>
          {t(`stock.status.${status}`)}
        </Text>
      </View>
    </View>
  );
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#F97316" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}> {t("stock.title")}</Text>
        </View>

        <View style={styles.container}>
          {/* SUMMARY */}
          <FlatList
            data={summary}
            keyExtractor={(item) => item.id}
            renderItem={renderSummary}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            scrollEnabled={false}
          />

          {/* ADD PRODUCT */}
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.85}
            onPress={() => console.log("Add product")}
          >
            <Text style={styles.addText}>＋ {t("stock.add_product")}</Text>
          </TouchableOpacity>

          {/* STOCK LIST */}
          <FlatList
            data={stocks}
            keyExtractor={(item) => item.id}
            renderItem={renderStock}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stock;

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

  container: {
    backgroundColor: "#F7F9FC",
    padding: 16,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#FB923C",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 14,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#FFF7ED",
    marginTop: 4,
    textAlign: "center",
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

  stockCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
  },

  stockHeader: {
    flexDirection: "row",
    marginBottom: 12,
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

  stockName: {
    fontSize: 14,
    fontWeight: "600",
  },
  stockBrand: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  stockPrice: {
    fontSize: 12,
    color: "#16A34A",
    marginTop: 2,
  },

  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },

  updateBtn: {
    backgroundColor: "#F97316",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  updateText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },

  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  inStock: {
    backgroundColor: "#DCFCE7",
  },
  inStockText: {
    color: "#16A34A",
  },

  lowStock: {
    backgroundColor: "#FEF3C7",
  },
  lowStockText: {
    color: "#D97706",
  },

  outStock: {
    backgroundColor: "#FEE2E2",
  },
  outStockText: {
    color: "#DC2626",
  },
});
