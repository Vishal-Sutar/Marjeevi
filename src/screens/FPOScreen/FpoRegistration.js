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
  FlatList
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation,useRoute  } from "@react-navigation/native";
import { FPORegister } from "../../Redux/apiService";


/* ---------------- DUMMY DROPDOWN DATA ---------------- */




const toggleState = () => {
  setShowState(!showState);
  setShowDistrict(false);
  setShowVillage(false);
};

const toggleDistrict = () => {
  setShowDistrict(!showDistrict);
  setShowState(false);
  setShowVillage(false);
};

const toggleVillage = () => {
  setShowVillage(!showVillage);
  setShowState(false);
  setShowDistrict(false);
};



const FpoRegistration = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password:"",
  //   gender: "",
  //  shopName: "",
    state: "",
    district: "",
    village: "",
    gst: "",
  });

  const navigation = useNavigation();
  const { t } = useTranslation(); // 🌍
  const [showState, setShowState] = useState(false);
const [showDistrict, setShowDistrict] = useState(false);
const [showVillage, setShowVillage] = useState(false);

const STATES = t("states", { returnObjects: true });
const DISTRICTS = t("districts", { returnObjects: true });
const VILLAGES = t("villages", { returnObjects: true });



  const toggleState = () => {
    setShowState(prev => !prev);
    setShowDistrict(false);
    setShowVillage(false);
  };

  const toggleDistrict = () => {
    setShowDistrict(prev => !prev);
    setShowState(false);
    setShowVillage(false);
  };

  const toggleVillage = () => {
    setShowVillage(prev => !prev);
    setShowState(false);
    setShowDistrict(false);
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
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


  const handleSubmit = async() => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password) {
     Alert.alert(t("error"), t("fill_required_fields"));
      return;
    }
    try {
       const response = await FPORegister(form);
           console.log("BACKEND SUCCESS RESPONSE 👉", response);
           if (response) {
        navigation.reset({
          index: 0,
          routes: [{ name: "FPOLogin" }],
        });
      }
    } catch (error) {
      
    }

  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
       {/* HEADER */}
<View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text style={styles.back}>← {t("back_to_login")}</Text>
  </TouchableOpacity>

  <Text style={styles.title}>{t("fpo_registration")}</Text>
  <Text style={styles.subtitle}>{t("fpo_registration_sub")}</Text>
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
              onChangeText={v => handleChange("firstName", v)}
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
              onChangeText={v => handleChange("lastName", v)}
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
              onChangeText={v => handleChange("email", v)}
            />
          </View>

          {/* PHONE */}
          <Text style={styles.label}>{t("phone_number")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>📞</Text>
            <TextInput
              placeholder={t("enter_phone")}
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              value={form.phone}
              onChangeText={v => handleChange("phone", v)}
            />
          </View>

          {/* password */}
          <Text style={styles.label}>{t("password")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}></Text>
            <TextInput
              placeholder={t("enter_password")}
               secureTextEntry
              maxLength={8}
              style={styles.input}
              value={form.password}
              onChangeText={v => handleChange("password", v)}
            />
          </View>

          {/* STATE */}
       <Text style={styles.label}>{t("state")}</Text>
<TouchableOpacity
  style={styles.selectBox}
  onPress={toggleState}
>
  <Text style={styles.selectText}>
  {form.state || t("select_state")}
  </Text>
  <Text style={styles.arrow}>⌄</Text>
</TouchableOpacity>

{showState && (
  <View style={styles.dropdown}>
    <FlatList
      data={STATES}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setForm(prev => ({
              ...prev,
              state: item,
              district: "",
              village: "",
            }));
            setShowState(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}


         <Text style={styles.label}>{t("district")}</Text>
<TouchableOpacity
  style={styles.selectBox}
  onPress={toggleDistrict}
>
  <Text style={styles.selectText}>
  {form.district || t("select_district")}
  </Text>
  <Text style={styles.arrow}>⌄</Text>
</TouchableOpacity>

{showDistrict && (
  <View style={styles.dropdown}>
    <FlatList
      data={DISTRICTS}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setForm(prev => ({
              ...prev,
              district: item,
              village: "",
            }));
            setShowDistrict(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}

          {/* VILLAGE */}
     <Text style={styles.label}>{t("village")}</Text>
<TouchableOpacity
  style={styles.selectBox}
  onPress={toggleVillage}
>
  <Text style={styles.selectText}>
   {form.village || t("select_village")}
  </Text>
  <Text style={styles.arrow}>⌄</Text>
</TouchableOpacity>

{showVillage && (
  <View style={styles.dropdown}>
    <FlatList
      data={VILLAGES}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setForm(prev => ({ ...prev, village: item }));
            setShowVillage(false);
          }}
        >
          <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
)}


          {/* GST */}
          <Text style={styles.label}>{t("gst_number")}</Text>
          <View style={styles.inputBox}>
            <Text style={styles.icon}>🧾</Text>
            <TextInput
              placeholder={t("enter_gst")}
              style={styles.input}
              value={form.gst}
              onChangeText={v => handleChange("gst", v)}
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

export default FpoRegistration;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffffff" },
  scrollContent: { paddingBottom: 30 },

  header: {
  backgroundColor: "#dae6f5ff",   // ✅ Light blue (same as screenshot)
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 16,
},

  back: { fontSize: 12, color: "#2563EB", marginBottom: 12,  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },

  form: { paddingHorizontal: 16, marginTop: 20 },

  label: {
    fontSize: 12,
    marginBottom: 6,
    color: "#374151",
  },

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

  icon: {
    marginRight: 8,
    fontSize: 14,
  },

  input: {
    flex: 1,
    fontSize: 13,
  },

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

  selectText: {
    fontSize: 13,
    color: "#6B7280",
  },

  arrow: {
    fontSize: 16,
    color: "#9CA3AF",
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
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

optionText: {
  fontSize: 13,
  color: "#111827",
},

});
