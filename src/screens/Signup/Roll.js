import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Images from "../../assets/Images/Images";
import { useNavigation } from "@react-navigation/native";
import { setUserData } from "../../Redux/Storage";
import { useTranslation } from "react-i18next";

const Roll = () => {
  const navigation = useNavigation();
       const { t } = useTranslation(); // 🌍
  const [selectedRole, setSelectedRole] = useState(null);
  
  
  const roles = [
    {
      id: "farmer",
      name: t("role_farmer"),
      desc: t("role_farmer_desc"),
      icon: "👨‍🌾",
      bgColor: "#16A34A",
    },
    {
      id: "staff",
      name: t("role_staff"),
      desc: t("role_staff_desc"),
      icon: "🚜",
      bgColor: "#F97316",
    },
    {
      id: "fpo",
      name: t("role_fpo"),
      desc: t("role_fpo_desc"),
      icon: "🏢",
      bgColor: "#2563EB",
    },
  ];
const handleContinue = async () => {
  if (!selectedRole) return;

  // save selected role
  await setUserData(selectedRole);

  // role-based navigation
  if (selectedRole === "farmer") {
    navigation.navigate("Login", { roleId: "farmer" });
    return;
  }

  if (selectedRole === "staff") {
    navigation.navigate("StafLogin", { roleId: "staff" });
    return;
  }

  if (selectedRole === "fpo") {
    navigation.navigate("FPOLogin", { roleId: "fpo" });
    return;
  }
};


// const handleContinue =
//  async () => {
//   if (!selectedRole) return;

//   // save selected role
//   await setUserData(selectedRole);

//   // ONLY ONE LOGIN SCREEN
//   navigation.navigate("Login", { roleId: selectedRole });
// };

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.title}>{t("role_welcome")}</Text>
      <Text style={styles.subtitle}>{t("role_subtitle")}</Text>

      {/* ROLE OPTIONS */}
      {roles.map((role) => (
        <TouchableOpacity
          key={role.id}
          style={[
            styles.optionBox,
            selectedRole === role.id && styles.selectedOptionBox,
          ]}
          onPress={() => handleRoleSelect(role.id)}
          activeOpacity={0.7}
        >
          <View style={styles.leftContent}>
            {/* ICON WITH COLOR BACKGROUND */}
            <View
              style={[
                styles.iconBox,
                { backgroundColor: role.bgColor },
              ]}
            >
              <Text style={styles.icon}>{role.icon}</Text>
            </View>

            <View>
              <Text
                style={[
                  styles.optionText,
                  selectedRole === role.id && styles.selectedOptionText,
                ]}
              >
                {role.name}
              </Text>
              <Text style={styles.optionDesc}>{role.desc}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* CONTINUE BUTTON */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedRole && styles.disabledContinueButton,
        ]}
        onPress={handleContinue}
        activeOpacity={selectedRole ? 0.7 : 1}
        disabled={!selectedRole}
      >
        <Text
          style={[
            styles.continueText,
            !selectedRole && styles.disabledContinueText,
          ]}
        >
          {t("continue")}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
         {t("role_footer")}
      </Text>
    </View>
  );
};

export default Roll;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 22,
    paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  optionBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
     elevation: 3,
  },

  selectedOptionBox: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    height: 48,
    width: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icon: {
    fontSize: 26,
  },

  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  selectedOptionText: {
    color: "#16A34A",
  },

  optionDesc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  continueButton: {
    backgroundColor: "#16A34A",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 24,
  },

  disabledContinueButton: {
    backgroundColor: "#D1D5DB",
  },

  continueText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  disabledContinueText: {
    color: "#9CA3AF",
  },

  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 12,
  },
});

