import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";

const Screen6 = () => {
  const navigation = useNavigation();
    const { t } = useTranslation(); // 🌍
  const route = useRoute();

  // ✅ data from Screen5
  const { finalPayload } = route.params || {};

  const [bankName, setBankName] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const hasBankData = bankName || ifsc || accountNumber;

  const handleContinue = () => {
    const bankDetails = hasBankData
      ? {
          bankName,
          ifsc,
          accountNumber,
        }
      : undefined;

    const payloadWithBank = {
      ...finalPayload,
      // ...(bankDetails && { bankDetails }),
    };

    navigation.navigate("Screen7", { payload: payloadWithBank });
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

          <Text style={styles.stepText}>{t("step_6_of_7")}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={styles.progressBarFill} />
        </View>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>💳</Text>
        </View>

        <Text style={styles.cardTitle}>{t("bank_details")}</Text>
        <Text style={styles.cardSub}>{t("bank_optional_note")}</Text>

        <Text style={styles.label}>{t("bank_name")}</Text>
        <TextInput
          placeholder={t("bank_name_placeholder")}
          style={styles.input}
          value={bankName}
          onChangeText={setBankName}
        />

        <Text style={styles.label}>{t("ifsc_code")}</Text>
        <TextInput
          placeholder={t("ifsc_placeholder")}
          style={styles.input}
          value={ifsc}
          onChangeText={setIfsc}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>{t("account_number")}</Text>
        <TextInput
          placeholder={t("account_placeholder")}
          style={styles.input}
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
      </View>

      {/* CONTINUE (OPTIONAL STEP) */}
      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>{t("continue")} ›</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Screen6;

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
  width: "85%", // Step 6 of 7
  backgroundColor: "#2E7D32",
  borderRadius: 2,
},

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
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
  },
  cardSub: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
  },

  /* FORM */
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
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
  continueBtnDisabled: {
  opacity: 0.5,
},
});
