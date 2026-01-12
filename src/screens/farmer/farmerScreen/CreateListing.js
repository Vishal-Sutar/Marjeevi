
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import {pick, types} from "@react-native-documents/picker";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const CreateListing = () => {
  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");

   const navigation = useNavigation();
  const { t } = useTranslation();

    const [fileData, setFileData] = useState(null);
  // 🔹 Image list (later connect backend / image picker)
  const [images, setImages] = useState([]);

    // 🔹 Document Picker Function
 const pickDocument = async () => {
    try {
      const result = await pick({
        allowMultiSelection: true,
        type: [types.images],
      });

      const formatted = result.map((file) => ({
        uri: file.fileCopyUri || file.uri,
        name: file.name,
        type: file.type,
        size: file.size,
      }));

      setImages((prev) => [...prev, ...formatted]); // append to list

      console.log("IMAGES => ", formatted);

    } catch (err) {
      if (err.code === "DOCUMENT_PICKER_CANCELED") {
        console.log("User cancelled");
      } else {
        console.log(err);
      }
    }
  };

  
  

  const renderImageItem = ({ item }) => {
    return (
      <View style={styles.imageItem}>
        <Text style={styles.imageIcon}>📷</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> {t("create_listing.title")}</Text>
      </View>

      {/* CROP INFORMATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> {t("create_listing.crop_info")}</Text>

        <TextInput
          placeholder={t("create_listing.crop_name")}
          value={cropName}
          onChangeText={setCropName}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <TextInput
          placeholder={t("create_listing.variety")}
          value={variety}
          onChangeText={setVariety}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <View style={styles.row}>
          <TextInput
            placeholder={t("create_listing.quantity")}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            placeholderTextColor="#9E9E9E"
          />

          <TextInput
            placeholder={t("create_listing.price")}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            placeholderTextColor="#9E9E9E"
          />
        </View>
      </View>

      {/* LOCATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("create_listing.location")}</Text>

        <TextInput
          placeholder={t("create_listing.enter_location")}
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}> {t("create_listing.use_location")}</Text>
        </TouchableOpacity>
      </View>

      {/* UPLOAD IMAGES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}> {t("create_listing.upload_images")}</Text>

        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ListHeaderComponent={
            <TouchableOpacity style={styles.uploadBox}
              onPress={() => pickDocument()}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}> {t("create_listing.add")}</Text>
            </TouchableOpacity>
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* SUBMIT */}
      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>{t("create_listing.submit")}</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default CreateListing;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F5",
  },

  /* HEADER */
  header: {
    backgroundColor: "#2E7D32",
    paddingVertical: 18,
    paddingHorizontal: 16,
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
    fontSize: 22,
    color: "#fff",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
  },

  /* INPUTS */
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222",
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },

  /* LOCATION */
  locationBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },

  /* UPLOAD */
  uploadBox: {
    width: 90,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8E6C9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  uploadIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 12,
    color: "#666",
  },
  imageItem: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  imageIcon: {
    fontSize: 26,
  },

  /* SUBMIT */
  submitBtn: {
    backgroundColor: "#2E7D32",
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
