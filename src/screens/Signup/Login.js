import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { login } from "../../Redux/AuthSlice";
import Images from "../../assets/Images/Images";

const Login = () => {
  // 🔹 Hooks
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();

  // 🔹 Role handling
  const roleId = route.params?.roleId || "farmer";

  const roleName =
    roleId === "farmer"
      ? t("role_farmer")
      : roleId === "staff"
      ? t("role_staff")
      : roleId === "fpo"
      ? t("role_fpo")
      : t("role_user");

  // 🔹 State
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Mobile number validation (India – 10 digits)
  const isValidMobile = /^\d{10}$/.test(phone);

  /**
   * Handle Login
   */
  const handleContinue = async () => {
    // 1️⃣ Validate mobile number
    if (!isValidMobile) {
      Alert.alert(
        t("invalid_mobile_title"),
        t("invalid_mobile_message")
      );
      return;
    }

    // 2️⃣ Validate password
    if (!password) {
      Alert.alert(t("error"), t("password_required"));
      return;
    }

    try {
      // 3️⃣ Dispatch login API
      const response = await dispatch(
        login({
          phone: phone,
          role: roleId, // ✅ IMPORTANT
          password: password,
        })
      ).unwrap(); // 🔥 unwrap throws error automatically

      console.log("Login success:", response);

      // 4️⃣ Navigate after successful login
      // navigation.navigate("Home");

    } catch (error) {
      console.log("Login failed:", error);

      Alert.alert(
        t("error"),
        error || t("something_went_wrong")
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>📱</Text>
        </View>

        <Text style={styles.headerTitle}>
          {t("login_title", { role: roleName })}
        </Text>

        <Text style={styles.headerSubtitle}>
          {t("login_subtitle")}
        </Text>
      </View>

      {/* 🔹 FORM */}
      <View style={styles.form}>
        {/* MOBILE */}
        <Text style={styles.label}>{t("mobile_number")}</Text>

        <TextInput
          placeholder={t("mobile_placeholder")}
          keyboardType="number-pad"
          maxLength={10}
          value={phone}
          onChangeText={setPhone}
          style={[
            styles.input,
            phone.length > 0 && !isValidMobile && styles.errorInput,
          ]}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>{t("password")}</Text>

        <TextInput
          placeholder={t("enter_password")}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[
            styles.input,
            password.length > 0 && styles.errorInput,
          ]}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[
            styles.loginBtn,
            !isValidMobile && styles.disabledBtn,
          ]}
          disabled={!isValidMobile}
          onPress={handleContinue}
        >
          <Text style={styles.loginText}>
            {t("login_with_otp")}
          </Text>
        </TouchableOpacity>

        {/* GOOGLE LOGIN */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image
            source={Images.GoogleScreen}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleText}>
            {t("login_with_google")}
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <View style={styles.registerRow}>
          <Text>{t("no_account")} </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Screen1")}
          >
            <Text style={styles.registerText}>
              {t("register_as", { role: roleName })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#E9F9F1",
    paddingVertical: 40,
    alignItems: "center",
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 26,
    color: "#fff",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#065F46",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#047857",
    marginTop: 4,
  },

  form: {
    padding: 22,
  },

  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    padding: 14,
    marginBottom: 16,
    color: "#000",
  },

  errorInput: {
    borderColor: "red",
  },

  loginBtn: {
    backgroundColor: "#16A34A",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
     marginBottom: 16,
     
  },

  disabledBtn: {
    backgroundColor: "#A7F3D0",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  orRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  orText: {
    marginHorizontal: 10,
    color: "#9CA3AF",
  },

  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingVertical: 14,
  },

  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },

  googleText: {
    fontSize: 15,
    fontWeight: "500",
  },

  checkboxRow: {
    flexDirection: "row",
    marginTop: 18,
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#9CA3AF",
    marginRight: 10,
  },

  checkboxChecked: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },

  checkMark: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 3,
  },

  checkboxText: {
    fontSize: 12,
    color: "#6B7280",
    flex: 1,
    lineHeight: 18,
  },

  link: {
    color: "#16A34A",
    fontWeight: "600",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  registerText: {
    color: "#16A34A",
    fontWeight: "600",
  },
});

