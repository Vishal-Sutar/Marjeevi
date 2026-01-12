import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";


/* ---------------- DUMMY DATA (API READY) ---------------- */

const STATES = [
  { id: "1", name: "Maharashtra" },
  { id: "2", name: "Gujarat" },
  { id: "3", name: "Madhya Pradesh" },
];

const DISTRICTS = [
  { id: "1", name: "Pune" },
  { id: "2", name: "Nashik" },
  { id: "3", name: "Nagpur" },
];

const VILLAGES = [
  { id: "1", name: "Village A" },
  { id: "2", name: "Village B" },
  { id: "3", name: "Village C" },
];

/* ---------------- SCREEN ---------------- */

const EmployeeRegistration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    state: "",
    district: "",
    village: "",
    joiningDate: "",
  });


  const [showState, setShowState] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [showVillage, setShowVillage] = useState(false);

  const navigation = useNavigation()
  const { t } = useTranslation(); // 🌍

  /* ---------------- HELPERS ---------------- */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleState = () => {
    setShowState((prev) => !prev);
    setShowDistrict(false);
    setShowVillage(false);
  };

  const toggleDistrict = () => {
    setShowDistrict((prev) => !prev);
    setShowState(false);
    setShowVillage(false);
  };

  const toggleVillage = () => {
    setShowVillage((prev) => !prev);
    setShowState(false);
    setShowDistrict(false);
  };

  const renderOption = (key, closeFn) => ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => {
        handleChange(key, item.name);
        closeFn(false);
      }}
    >
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.mobile || !form.email) {
     Alert.alert(t("error"), t("fill_required_fields"));
      return;
    }

    console.log("EMPLOYEE REGISTRATION DATA:", form);
    Alert.alert(t("success"), t("employee_registered_success"));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF7ED" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← {t("back_to_login")}</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{t("employee_registration")}</Text>
          <Text style={styles.subtitle}>{t("employee_registration_sub")}</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {/* FIRST NAME */}
          <Text style={styles.label}>{t("first_name")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>👤</Text>
            <TextInput
              placeholder={t("enter_first_name")}
              style={styles.input}
              value={form.firstName}
              onChangeText={(v) => handleChange("firstName", v)}
            />
          </View>

          {/* LAST NAME */}
          <Text style={styles.label}>{t("last_name")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>👤</Text>
            <TextInput
              placeholder={t("enter_last_name")}
              style={styles.input}
              value={form.lastName}
              onChangeText={(v) => handleChange("lastName", v)}
            />
          </View>

          {/* MOBILE */}
          <Text style={styles.label}>{t("mobile_number")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>📞</Text>
            <TextInput
              placeholder={t("enter_mobile_number")}
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              value={form.mobile}
              onChangeText={(v) => handleChange("mobile", v)}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>{t("email")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>✉️</Text>
            <TextInput
              placeholder={t("enter_email")}
              keyboardType="email-address"
              style={styles.input}
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
            />
          </View>

          {/* STATE */}
          <Text style={styles.label}>{t("state")}</Text>
          <TouchableOpacity style={styles.selectBox} onPress={toggleState}>
            <Text style={styles.selectText}>
               {form.state || t("select_state")}
            </Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>

          {showState && (
            <View style={styles.dropdown}>
              <FlatList
                data={STATES}
                keyExtractor={(item) => item.id}
                renderItem={renderOption("state", setShowState)}
                nestedScrollEnabled
              />
            </View>
          )}

          {/* DISTRICT */}
          <Text style={styles.label}>{t("district")}</Text>
          <TouchableOpacity style={styles.selectBox} onPress={toggleDistrict}>
            <Text style={styles.selectText}>
              {form.district || t("select_district")}
            </Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>

          {showDistrict && (
            <View style={styles.dropdown}>
              <FlatList
                data={DISTRICTS}
                keyExtractor={(item) => item.id}
                renderItem={renderOption("district", setShowDistrict)}
                nestedScrollEnabled
              />
            </View>
          )}

          {/* VILLAGE */}
          <Text style={styles.label}>{t("village")}</Text>
          <TouchableOpacity style={styles.selectBox} onPress={toggleVillage}>
            <Text style={styles.selectText}>
               {form.village || t("select_village")}
            </Text>
            <Text style={styles.arrow}>⌄</Text>
          </TouchableOpacity>

          {showVillage && (
            <View style={styles.dropdown}>
              <FlatList
                data={VILLAGES}
                keyExtractor={(item) => item.id}
                renderItem={renderOption("village", setShowVillage)}
                nestedScrollEnabled
              />
            </View>
          )}

          {/* JOINING DATE */}
          <Text style={styles.label}>{t("joining_date")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>📅</Text>
            <TextInput
              placeholder={t("joining_date_ph")}
              style={styles.input}
              value={form.joiningDate}
              onChangeText={(v) => handleChange("joiningDate", v)}
            />
          </View>

          {/* SUBMIT */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.submitText}>{t("register")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmployeeRegistration;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 30 },

  header: {
    backgroundColor: "#FFF7ED",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  back: { fontSize: 12, color: "#F97316", marginBottom: 12 },

  title: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  form: { paddingHorizontal: 16, marginTop: 20 },

  label: { fontSize: 12, marginBottom: 6, color: "#374151" },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 14,
  },

  icon: { marginRight: 8, fontSize: 14 },
  input: { flex: 1, fontSize: 13 },

  selectBox: {
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 14,
  },

  selectText: { fontSize: 13, color: "#6B7280" },
  arrow: { fontSize: 16, color: "#9CA3AF" },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    maxHeight: 160,
  },

  option: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: "#E5E7EB",
  },

  optionText: { fontSize: 13, color: "#111827" },

  submitBtn: {
    backgroundColor: "#F97316",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  submitText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
