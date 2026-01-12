import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/AuthSlice";
import { getUserData } from "../../Redux/Storage";
import BackHeader from "../../common/reusableComponent/BackHeader";
import { useTranslation } from "react-i18next";


const OTPData = ({ route }) => {
  const navigation = useNavigation();
   const { t } = useTranslation();
  const dispatch = useDispatch();

  const param = route?.params?.data;
 

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const submitOtp = async () => {
    const enteredOtp = otp.join("");
    const roll = await getUserData()
    console.log(roll)

    if (enteredOtp.length !== 4) {
       alert(t("enter_4_digit_otp"));
      return;
    }

     try {
       let data =   await dispatch(login({ param  , roll}));
      console.log(data)
     } catch (error) {
      console.log(error)
     }

      

  };

  return (
    <View style={{ flex: 1, marginTop:10 }}>
      <BackHeader/>
      {/* <Image
        source={Images.LawtechfullImg}
        style={{ height: 100, width: "80%", alignSelf: "center", marginTop: "10%" }}
        resizeMode="cover"
      /> */}
      <Text style={styles.title}>{t("verify_email")}</Text>
      <Text style={styles.subTitle}>{t("otp_sent_to")}</Text>
      <Text style={styles.emailText}>{param}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={submitOtp}>
        <Text style={styles.submitTxt}>{t("submit")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert(t("otp_resent"))}>
        <Text style={styles.resendText}>{t("resend_otp")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OTPData;

const styles = StyleSheet.create({
  title: { textAlign: "center", fontSize: 22, fontWeight: "bold", color: "black" },
  subTitle: { textAlign: "center", marginTop: 5, color: "black" },
  emailText: { textAlign: "center", fontWeight: "bold", marginTop: 3, color: "black" },
  otpContainer: { flexDirection: "row", justifyContent: "center", marginTop: 25 },
  otpInput: {
    borderWidth: 1,
    borderColor: "#fbcf24",
    width: 45,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 8,
    textAlign: "center",
    fontSize: 18,
    color: "black",
  },
  submitBtn: {
    backgroundColor: "green",
    padding: 10,
    width: 120,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  submitTxt: { textAlign: "center", fontWeight: "700", color: "white" },
  resendText: { textAlign: "center", fontSize: 16, color: "black", marginTop: 15 },
});
