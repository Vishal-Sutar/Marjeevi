import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";


const Screen1 = () => {

    const navigation = useNavigation()
      const { t } = useTranslation(); // 🌍
 const [firstName, setfirstName] = useState("");
 const [lastName, setlastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [village, setVillage] = useState("");
  const [gender, setGender] = useState("Male");
  
const handleContinue = () => {
    if (!firstName || !mobile || !password || !village || !lastName) {
     Alert.alert(t("error"), t("fill_required_fields"));
      return;
    }

    navigation.navigate("Screen2", {
      screen1Data: {
        firstName,
        lastName,
        phone: mobile,
         password,
        village,
        gender: gender.toLowerCase(),
      },
    });
  };



  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.stepText}>{t("step_1_of_2")}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>👤</Text>
        </View>

        <Text style={styles.cardTitle}>{t("personal_details")}</Text>

        {/* FULL NAME */}
        <Text style={styles.label}>{t("first_name")} *</Text>
        <TextInput
          placeholder={t("enter_first_name")}
          style={styles.input}
          value={firstName}
          onChangeText={setfirstName}
        />

 {/* FULL NAME */}
        <Text style={styles.label}>{t("last_name")} *</Text>
        <TextInput
          placeholder={t("enter_last_name")}
          style={styles.input}
          value={lastName}
          onChangeText={setlastName}
        />

        {/* MOBILE */}
        <Text style={styles.label}>{t("mobile_number")} *</Text>
        <TextInput
          placeholder={t("mobile_placeholder_short")}
          keyboardType="numeric"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        {/* PASSWORD */}
<Text style={styles.label}>{t("password")} *</Text>
<TextInput
  placeholder={t("enter_password")}
  style={styles.input}
  value={password}
  onChangeText={setPassword}
/>

        {/* GENDER */}
        <Text style={styles.label}>{t("gender")} *</Text>
        <View style={styles.genderRow}>
          {["Male", "Female", "Other"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.genderBtn,
                gender === item && styles.genderBtnActive,
              ]}
              onPress={() => setGender(item)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === item && styles.genderTextActive,
                ]}
              >
                {t(item.toLowerCase())}
              </Text>
            </TouchableOpacity>
          ))}
          
        </View>

        {/* VILLAGE */}
        <Text style={styles.label}>{t("village")} *</Text>
        <TextInput
          placeholder={t("enter_village")}
          style={styles.input}
          value={village}
          onChangeText={setVillage}
        />
      </View>

      {/* CONTINUE */}
      <TouchableOpacity style={styles.continueBtn} onPress={()=> handleContinue()}>
        <Text style={styles.continueText}> {t("continue")} ›</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Screen1;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F5",
  },

  /* HEADER */
 header: {
  padding: 16,
  backgroundColor: "#F4F6F5",
},

headerTop: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

backBtn: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: "#EDEDED",
  justifyContent: "center",
  alignItems: "center",
},

backIcon: {
  fontSize: 22,
  color: "#333",
  lineHeight: 22,
},

stepText: {
  fontSize: 12,
  color: "#666",
  fontWeight: "500",
},

progressBarBg: {
  height: 4,
  width: "100%",
  backgroundColor: "#E0E0E0",
  borderRadius: 2,
},

progressBarFill: {
  height: 4,
  width: "14%", // Step 1 of 7
  backgroundColor: "#2E7D32",
  borderRadius: 2,
},

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  /* FORM */
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 10,
    color: "#333",
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color:"black"
  },

  /* GENDER */
  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  genderBtn: {
    width: "32%",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  genderBtnActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#2E7D32",
  },
  genderText: {
    fontSize: 13,
    color: "#555",
  },
  genderTextActive: {
    color: "#2E7D32",
    fontWeight: "600",
  },

  /* CONTINUE */
  continueBtn: {
    backgroundColor: "#2E7D32",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});




