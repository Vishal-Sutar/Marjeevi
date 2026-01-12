import React, { useState,useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Images from '../../assets/Images/Images';
import { useTranslation } from 'react-i18next';
import { useLanguage } from "../../context/LanguageProvider";
import i18n from '../../i18n'; 

const First = () => {
  const navigation = useNavigation();
    const { t } = useTranslation();
  // const { changeLanguage } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] = useState(null);

 const languages = useMemo(
    () => [
      { id: "en", name: "English", sub: t("lang_en_sub") },
      { id: "hi", name: "हिंदी", sub: t("lang_hi_sub") },
    ],
    [t]
  );

  const handleLanguageSelect = async (code) => {
    setSelectedLanguage(code);      // UI state
     await i18n.changeLanguage(code);   // i18n global change
  };

  const handleNext = () => {
    if (selectedLanguage) {
      navigation.navigate('BuyAndSell');
    }
  };

  return (
    <View style={styles.container}>
      {/* TITLE */}
      <Text style={styles.title}>{t("welcome")}</Text>
      <Text style={styles.subTitle}>{t("select_language")}</Text>

      {/* IMAGE */}
      <Image
        source={Images.secondScreen}
        style={styles.mainImage}
        resizeMode="contain"
      />

      {/* LANGUAGE OPTIONS */}
      {languages.map((language) => (
        <TouchableOpacity
          key={language.id}
          style={[
            styles.languageBox,
            selectedLanguage === language.id && styles.selectedLanguageBox,
          ]}
          onPress={() => handleLanguageSelect(language.id)}
          activeOpacity={0.7}
        >
          <View>
            <Text style={styles.languageText}>{language.name}</Text>
            <Text style={styles.languageSub}>{language.sub}</Text>
          </View>

          <View
            style={[
              styles.radioCircle,
              selectedLanguage === language.id && styles.selectedRadioCircle,
            ]}
          >
            {selectedLanguage === language.id && (
              <View style={styles.radioInnerCircle} />
            )}
          </View>
        </TouchableOpacity>
      ))}

      {/* CONTINUE BUTTON */}
      <TouchableOpacity
        onPress={handleNext}
        style={[
          styles.continueBtn,
          !selectedLanguage && styles.disabledContinueBtn,
        ]}
        disabled={!selectedLanguage}
      >
        <Text
          style={[
            styles.continueText,
            !selectedLanguage && styles.disabledContinueText,
          ]}
        >
          {t("continue")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default First;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
  },

  subTitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  mainImage: {
    width: "100%",
    height: 220,
    alignSelf: "center",
    marginBottom: 25,
  },

  languageBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CFCFCF",
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },

  selectedLanguageBox: {
    borderColor: "#1FA637",
    backgroundColor: "#F0F9F1",
  },

  languageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  languageSub: {
    fontSize: 12,
    color: "gray",
    marginTop: 3,
  },

  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CFCFCF",
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedRadioCircle: {
    borderColor: "#1FA637",
  },

  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#1FA637",
  },

  continueBtn: {
    backgroundColor: "#1FA637",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
  },

  disabledContinueBtn: {
    backgroundColor: "#E0E0E0",
  },

  continueText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  disabledContinueText: {
    color: "#9E9E9E",
  },
});
