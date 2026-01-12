import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Images from "../../assets/Images/Images";

const BuyAndSell = () => {
  const { t } = useTranslation(); // 🌍
  const navigation = useNavigation()

  const handleNext = () => {
        navigation.navigate('Getgovt')
      };
  return (
    <View style={styles.container}>

      {/* APP NAME */}
      <Text style={styles.appName}>{t("app_name")}</Text>
      <Text style={styles.subTitle}>{t("buy_sell_subtitle")}</Text>

      {/* MAIN IMAGE CARD */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("buy_sell_title")}</Text>
        <Text style={styles.cardSubtitle}> {t("buy_sell_card_subtitle")}</Text>

        <Image
          source={Images.thirdScreen}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* DOT INDICATOR */}
      <View style={styles.dotContainer}>
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
  },

  card: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 25,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },

  mainImage: {
    width: "100%",
    height: 250,
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  dotActive: {
    height: 8,
    width: 25,
    borderRadius: 5,
    backgroundColor: "black",
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

export default BuyAndSell;
