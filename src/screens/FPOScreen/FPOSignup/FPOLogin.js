import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";

import { login } from "../../../Redux/AuthSlice";
import { useDispatch } from "react-redux";
import { getUserData } from "../../../Redux/Storage";
import { useTranslation } from "react-i18next";


const FPOLogin = () => {
  const navigation = useNavigation();
    const route = useRoute();
  const { t } = useTranslation(); // 🌍

  const dispatch = useDispatch();

  const [loginType, setLoginType] = useState("gst"); // gst | mobile
  const [gst, setGst] = useState("");
  const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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



  // 🔹 Validations
  const isValidGST =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
      gst.trim()
    );

  const isValidMobile = /^\d{10}$/.test(mobile.trim());

  const isFormValid =
    (loginType === "gst" && isValidGST) ||
    (loginType === "mobile" && isValidMobile);

  /* 🔹 LOGIN (NO OTP FOR FPO) */
  const handleLogin = async () => {
    if (!isFormValid || loading) return;

    const param = loginType === "gst" ? gst.trim() : mobile.trim();
  const roll = await getUserData()

    // try {
    //   setLoading(true);
    //    let data =   await dispatch(login({ param  , roll}));
    //         console.log(data)
    // } catch (error) {
    // Alert.alert(t("login_failed"), t("invalid_credentials"));

    //   console.log("FPO Login Error:", error);
    // }
     try {
          // 3️⃣ Dispatch login API
          const response = await dispatch(
            login({
              phone: mobile,
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
    
    finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🏢</Text>
        </View>
        <Text style={styles.title}>{t("fpo_login",{ role: roleName })}</Text>
        <Text style={styles.subtitle}>
        {t("fpo_login_subtitle")}
        </Text>
      </View>

      {/* TOGGLE */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            loginType === "gst" && styles.toggleActive,
          ]}
          onPress={() => {
            setLoginType("gst");
            setMobile("");
          }}
        >
          <Text
            style={[
              styles.toggleText,
              loginType === "gst" && styles.toggleTextActive,
            ]}
          >
             {t("gst_number")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            loginType === "mobile" && styles.toggleActive,
          ]}
          onPress={() => {
            setLoginType("mobile");
            setGst("");
          }}
        >
          <Text
            style={[
              styles.toggleText,
              loginType === "mobile" && styles.toggleTextActive,
            ]}
          >
            {t("mobile_number")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {loginType === "gst" ? (
          <>
            <Text style={styles.label}>{t("gst_number")}</Text>
            <TextInput
              placeholder={t("enter_gst")}
              autoCapitalize="characters"
              value={gst}
              onChangeText={setGst}
              style={[
                styles.input,
                gst.length > 0 && !isValidGST && styles.errorInput,
              ]}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>{t("mobile_number")}</Text>
            <TextInput
              placeholder={t("enter_mobile")}
              keyboardType="numeric"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
              style={[
                styles.input,
                mobile.length > 0 && !isValidMobile && styles.errorInput,
              ]}
            />
          </>
        )}

         <Text style={styles.label}>{t("password")}</Text>
            <TextInput
              placeholder={t("enter_password")}
              maxLength={10}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={[
            styles.loginBtn,
            (!isFormValid || loading) && styles.disabledBtn,
          ]}
          disabled={!isFormValid || loading}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>
          {loading ? t("please_wait") : t("login")}
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <View style={styles.registerRow}>
          <Text>{t("dont_have_account")} </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("FpoRegistration")}
          >
            <Text style={styles.registerText}>{t("register_as_fpo")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FPOLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "#EDF4FF",
    paddingVertical: 40,
    alignItems: "center",
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  icon: {
    fontSize: 26,
    color: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
  },

  toggleRow: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },

  toggleActive: {
    backgroundColor: "#fff",
    elevation: 2,
  },

  toggleText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  toggleTextActive: {
    color: "#2563EB",
  },

  form: {
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },

  errorInput: {
    borderColor: "red",
  },

  loginBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
  },

  disabledBtn: {
    backgroundColor: "#BFDBFE",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  registerText: {
    color: "#2563EB",
    fontWeight: "600",
  },
});
