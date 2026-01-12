import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Images from "../../assets/Images/Images";
import { useTranslation } from "react-i18next";


const Getgovt = () => {
    const navigation = useNavigation()
     const { t } = useTranslation(); // 🌍

const handleNext = () => {
        navigation.navigate('Roll')
      };
    
  return (
    <View style={styles.container}>

      {/* APP NAME */}
      <Text style={styles.appName}>{t("app_name")}</Text>
      <Text style={styles.subTitle}>{t("get_govt_subtitle")}</Text>

      {/* IMAGE CARD */}
      <View style={styles.card}>
        <Image
          source={Images.forthScreen}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* DOT INDICATOR */}
      <View style={styles.dotContainer}>
        <View style={styles.dotInactive} />
        <View style={styles.dotActive} />
      </View>

      {/* NEXT BUTTON */}
      <TouchableOpacity
      onPress={()=> handleNext()}
      style={styles.nextButton}>
        <Text style={styles.nextText}>{t("next")}</Text>
      </TouchableOpacity>

      {/* SKIP BUTTON */}
      <TouchableOpacity style={styles.skipButton}  onPress={()=> handleNext()}>
        <Text style={styles.skipText}>{t("skip")}</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 22,
    paddingTop: 40,
  },

  appName: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },

  subTitle: {
    textAlign: "center",
    marginTop: 4,
    color: "gray",
    marginBottom: 20,
  },

  card: {
    width: "100%",
    backgroundColor: "#E8F5FB",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  mainImage: {
    width: "100%",
    height: 260,
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },

  dotInactive: {
    height: 7,
    width: 7,
    backgroundColor: "#C8C8C8",
    borderRadius: 10,
  },

  dotActive: {
    height: 7,
    width: 25,
    backgroundColor: "black",
    borderRadius: 10,
  },

  nextButton: {
    backgroundColor: "#1FA637",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 25,
  },

  nextText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  skipButton: {
    marginTop: 12,
  },

  skipText: {
    textAlign: "center",
    fontSize: 14,
    color: "gray",
  },
});

export default Getgovt;
