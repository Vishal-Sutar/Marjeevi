import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";


const DATA = [
  {
    id: "1",
    name: "Tomato",
    type: "Hybrid",
    quantity: "500 kg",
    price: "₹25/kg",
    status: "approved",
  },
  {
    id: "2",
    name: "Rice",
    type: "Basmati",
    quantity: "1000 kg",
    price: "₹40/kg",
    status: "pending",
  },
  {
    id: "3",
    name: "Wheat",
    type: "Organic",
    quantity: "750 kg",
    price: "₹30/kg",
    status: "sold",
  },
];


const MyListing = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

const renderItem = ({ item }) => {
    const statusStyle = styles[`status${item.status}`];

    return (
      <View style={styles.card}>
        {/* TOP ROW */}
        <View style={styles.row}>
          <View style={styles.imageBox} />

          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subText}>{item.type}</Text>
            <Text style={styles.subText}>
              {item.quantity} • {item.price}
            </Text>
          </View>

          <View style={[styles.status, statusStyle]}>
            <Text style={styles.statusText}>
              {t(`listing.status.${item.status}`)}
            </Text>
          </View>
        </View>

        {/* ACTIONS */}
        {item.status !== "sold" && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editText}>
                ✏ {t("common.edit")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>
                🗑 {t("common.delete")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>  {t("listing.my_listings")}</Text>
          <Text style={styles.headerSub}>{DATA.length} {t("listing.total", { count: DATA.length })}</Text>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={()=> navigation.navigate('CreateListing')}
        >
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyListing;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9F7",
  },

  /* HEADER */
  header: {
    backgroundColor: "#3A9D4F",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 12,
    color: "#E0F2E9",
    marginTop: 4,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#CDEED9",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#DDF1DF",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  /* STATUS */
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusApproved: {
    backgroundColor: "#E8F5E9",
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
  },
  statusSold: {
    backgroundColor: "#E3F2FD",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  /* ACTIONS */
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  editBtn: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
  },
  deleteBtn: {
    backgroundColor: "#FDECEA",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  deleteText: {
    fontSize: 12,
    color: "#D32F2F",
    fontWeight: "600",
  },

  /* ADD BUTTON */
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    fontSize: 22,
    color: "#2E7D32",
    fontWeight: "700",
  },
});
