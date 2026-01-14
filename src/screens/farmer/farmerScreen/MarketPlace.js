import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Images from "../../../assets/Images/Images";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";



const MarketPlace = () => {
  const [cartCount, setCartCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
   const navigation = useNavigation();
  const { t } = useTranslation();


  const CATEGORIES = t("marketplace.categories", { returnObjects: true });
const PRODUCTS = t("marketplace.products", { returnObjects: true });

  // 🔹 Filter products (category + search)
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, search]);

 const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Text style={styles.productIcon}>{item.icon}</Text>
      </View>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.brand}>{item.brand}</Text>

      <Text style={styles.price}>
        {item.price} <Text style={styles.unit}>{item.unit}</Text>
      </Text>

      {/* <TouchableOpacity
        style={styles.cartBtn}
        onPress={() => setCartCount(prev => prev + 1)}
      >
        <Text style={styles.cartBtnText}>{t("marketplace.add_to_cart")}</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.backBtn}>
           <TouchableOpacity
            onPress={() => navigation.goBack()}
           >
             <Text style={styles.backIcon}>‹</Text>
           </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.headerTitle}>  {t("marketplace.title")}</Text>
            <Text style={styles.headerSub}>
             {t("marketplace.subtitle")}
            </Text>
          </View>

          <View style={styles.cartWrapper}>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartDot}>
                <Text style={styles.cartCount}>{cartCount}</Text>
              </View>
            )}
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Image
          style={styles.searchIcon}
          source={Images.Search}
          />
          <TextInput
            placeholder={t("marketplace.search")}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* CATEGORY TABS */}
    <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.categoryContainer}
>
  {CATEGORIES.map((item) => (
    <TouchableOpacity
      key={item}
      onPress={() => setSelectedCategory(item)}
      style={[
        styles.categoryChip,
        selectedCategory === item && styles.categoryActive,
      ]}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextActive,
        ]}
      >
         {t(`marketplace.category.${item.toLowerCase()}`)}
      </Text>
    </TouchableOpacity>
  ))}
</ScrollView>

<View>
  
</View>

      {/* PRODUCTS LIST */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MarketPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9F7",
  },

  /* HEADER */
  header: {
    backgroundColor: "#3A9D4F",
    padding: 16,
    paddingBottom: 26,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 22,
    color: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  headerSub: {
    fontSize: 12,
    color: "#E0F2E9",
    marginTop: 2,
  },

  cartWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cartIcon: {
    fontSize: 18,
    color: "#fff",
  },
  cartDot: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  cartCount: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },

  /* SEARCH */
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 25,
    marginTop: 16,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 8,
    color: "#000",
  },

  /* CATEGORY */
  categoryRow: {
    marginTop: 14,
    paddingLeft: 16,
  },
 /* CATEGORY */
categoryContainer: {
  flexDirection: "row",     // ⭐ required for horizontal
  paddingHorizontal: 16,
  paddingTop: 14,
   paddingBottom: 15,
},

categoryChip: {
  width: 80,               // ✅ SAME WIDTH
  height: 44,              // ✅ SAME HEIGHT
  backgroundColor: "#fff",
  marginRight: 10,

  borderRadius: 22,
  borderWidth: 1,
  borderColor: "#E0E0E0",

  justifyContent: "center",
  alignItems: "center",
},

categoryActive: {
  backgroundColor: "#3A9D4F",
  borderColor: "#3A9D4F",
},

categoryText: {
  fontSize: 12,
  color: "#555",
},

categoryTextActive: {
  color: "#fff",
  fontWeight: "600",
},


  /* PRODUCT CARD */
  card: {
    width: "47%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
  },
  imageBox: {
    backgroundColor: "#DDF1DF",
    height: 90,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  productIcon: {
    fontSize: 30,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222",
  },
  brand: {
    fontSize: 11,
    color: "#777",
    marginVertical: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },
  unit: {
    fontSize: 10,
    color: "#777",
  },
  cartBtn: {
    marginTop: 8,
    backgroundColor: "#2E7D32",
    borderRadius: 20,
    paddingVertical: 6,
    alignItems: "center",
  },
  cartBtnText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});
