import { useNavigation,useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";


const StaffLogin = () => {
  const navigation = useNavigation()
  const { t } = useTranslation(); // 🌍
  const route = useRoute();
  const [loginType, setLoginType] = useState("PASSWORD"); // PASSWORD | OTP
  const [idType, setIdType] = useState("EMPLOYEE"); // EMPLOYEE | MOBILE

  const [employeeId, setEmployeeId] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const roleId = route.params?.roleId 
  

  /* ---------------- HANDLERS ---------------- */

  const handleLogin = () => {
    if (idType === "EMPLOYEE" && !employeeId.trim()) {
    Alert.alert(t("error"), t("enter_employee_id"));
    }

    if (idType === "MOBILE" && mobile.length !== 10) {
     Alert.alert(t("error"), t("enter_valid_mobile"));
    }

    if (loginType === "PASSWORD" && !password.trim()) {
    Alert.alert(t("error"), t("enter_password"));
      return;
    }

    // 🔹 TEMPORARY (replace with API)
   Alert.alert(
  t("login_success"),
  `${t("login_type")}: ${loginType}\n${t("id_type")}: ${idType}`
);

    // 🔹 FUTURE API
    /*
    dispatch(login({
      employeeId,
      mobile,
      password,
      loginType,
      idType,
    }))
    */
  };

  const handleSendOtp = () => {
    if (idType === "EMPLOYEE" && !employeeId.trim()) {
      Alert.alert("Error", "Please enter Employee ID");
      return;
    }

    if (idType === "MOBILE" && mobile.length !== 10) {
      Alert.alert("Error", "Please enter valid mobile number");
      return;
    }

   navigation.navigate("OTPData", { data: mobile, role: roleId });

    // 🔹 Navigate to OTP screen later
    // navigation.navigate("OtpVerify")
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF4E5" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>👜</Text>
          </View>
          <Text style={styles.title}>{t("employee_login")}</Text>
          <Text style={styles.subtitle}>
           {t("employee_login_sub")}
          </Text>
        </View>

        {/* LOGIN TYPE */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              loginType === "PASSWORD" && styles.activeToggle,
            ]}
            onPress={() => setLoginType("PASSWORD")}
          >
            <Text
              style={[
                styles.toggleText,
                loginType === "PASSWORD" && styles.activeToggleText,
              ]}
            >
            {t("password")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              loginType === "OTP" && styles.activeToggle,
            ]}
            onPress={() => setLoginType("OTP")}
          >
            <Text
              style={[
                styles.toggleText,
                loginType === "OTP" && styles.activeToggleText,
              ]}
            >
            {t("otp")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ID TYPE */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              idType === "EMPLOYEE" && styles.activeToggle,
            ]}
            onPress={() => setIdType("EMPLOYEE")}
          >
            <Text
              style={[
                styles.toggleText,
                idType === "EMPLOYEE" && styles.activeToggleText,
              ]}
            >
             {t("employee_id")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              idType === "MOBILE" && styles.activeToggle,
            ]}
            onPress={() => setIdType("MOBILE")}
          >
            <Text
              style={[
                styles.toggleText,
                idType === "MOBILE" && styles.activeToggleText,
              ]}
            >
             {t("mobile")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          {idType === "EMPLOYEE" ? (
            <>
              <Text style={styles.label}>{t("employee_id")}</Text>
              <TextInput
                placeholder={t("enter_employee_id_ph")}
                value={employeeId}
                onChangeText={setEmployeeId}
                style={styles.input}
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>{t("mobile")}</Text>
              <TextInput
                placeholder={t("enter_mobile_ph")}
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
                maxLength={10}
              />
            </>
          )}

          {loginType === "PASSWORD" && (
            <>
              <Text style={styles.label}>{t("password")}</Text>
              <TextInput
                placeholder={t("enter_password")}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </>
          )}

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.85}
            onPress={
              loginType === "OTP" ? handleSendOtp : handleLogin
            }
          >
            <Text style={styles.loginText}>
               {loginType === "OTP" ? t("login_with_otp") : t("login")}
            </Text>
          </TouchableOpacity>

          {loginType === "PASSWORD" && (
            <TouchableOpacity>
              <Text style={styles.forgot}>{t("forgot_password")}</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.register}>
            {t("no_account")}{" "}
            <TouchableOpacity onPress={()=> navigation.navigate('EmployeeRegistration')}>
            <Text style={styles.registerLink}>
               {t("register_employee")}
            </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StaffLogin;
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF4E5",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* ---------- HEADER ---------- */
  header: {
    alignItems: "center",
    paddingVertical: 32,
  },

  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF7A00",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 30,
    color: "#fff",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  /* ---------- TOGGLE ---------- */
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
    elevation: 1,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  activeToggle: {
    backgroundColor: "#FFF4E5",
  },

  toggleText: {
    fontSize: 13,
    color: "#6B7280",
  },

  activeToggleText: {
    color: "#FF7A00",
    fontWeight: "600",
  },

  /* ---------- FORM ---------- */
  form: {
    paddingHorizontal: 16,
    marginTop: 8,
  },

  label: {
    fontSize: 12,
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
    fontSize: 13,
  },

  /* ---------- LOGIN BUTTON ---------- */
  loginBtn: {
    backgroundColor: "#FF7A00",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  loginText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  /* ---------- EXTRA LINKS ---------- */
  forgot: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 12,
    color: "#FF7A00",
  },

  register: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 12,
    color: "#6B7280",
  },

  registerLink: {
    color: "#FF7A00",
    fontWeight: "600",
  },
});
