import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
 View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
   PermissionsAndroid,
   Platform,
     Alert,
  Linking
} from "react-native";
// import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
// import {getLocation} from "../../common/reusableComponent/requestLocationPermission";
import {getLocation} from '../../../common/reusableComponent/requestLocationPermission';
import { useTranslation } from "react-i18next";
import { Country, State, City } from 'country-state-city';


const Screen2 = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  // Get Indian states and cities
  const indianStates = State.getStatesOfCountry('IN');
  const [availableDistricts, setAvailableDistricts] = useState([]);
  
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [showStates, setShowStates] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showDistricts, setShowDistricts] = useState(false);

  const route = useRoute();
  const { screen1Data } = route.params || {};
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  // Handle state selection
  const handleStateSelect = (state) => {
    setSelectedState(state.name);
    setSelectedStateCode(state.isoCode);
    setSelectedDistrict(""); // Reset district when state changes
    setShowStates(false);
    
    // Get districts/cities for selected state
    const districts = City.getCitiesOfState('IN', state.isoCode);
    setAvailableDistricts(districts);
  };

useEffect(() => {
    const initLocation = async () => {
      try {
       let locationData = await getLocation();
setLocation(locationData);
convertToAddress(locationData.latitude, locationData.longitude);
        console.log("Location data:", locationData);
        
        // Only show alert if location data exists
        // if (locationData) {
        //   Alert.alert(
        //     "Location",
        //     `Lat: ${locationData.latitude}, Long: ${locationData.longitude}`
        //   );
        // }
      } catch (error) {
        console.log("❌ Error in useEffect location:", error);
         Alert.alert(t("error"), t("location_failed"));
      }
    };

    initLocation();
  }, []);


  
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "PropTech wants your Location Permission",
        message:
          "PropTech App needs access to your location so you can use app properly.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");

      // Geolocation.getCurrentPosition(
      //   (position) => {
      //     console.log("Live Location:", position.coords);

      //     // ✅ optional: store in state
      //     setLocation({
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //     });

      //     // ✅ convert to address
      //     convertToAddress(
      //       position.coords.latitude,
      //       position.coords.longitude
      //     );
      //   },
      //   (error) => {
      //     console.log("Location Error:", error);
      //     // Alert.alert("Error", "Unable to get location");
      //   },
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 15000,
      //     maximumAge: 10000,
      //   }
      // );

      return true;
    } else {
      console.log("Location permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};


  // 📌 GPS
const detectGPS = async () => {
  const granted = await requestLocationPermission();

  if (!granted) {
    Alert.alert(t("permission_denied"), t("location_permission_required"));
    return;
  }

  Geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      convertToAddress(latitude, longitude);
    },
    (error) => {
      console.log("GPS error:", error);
      Alert.alert(
          t("location_error"),
          t("turn_on_location"),
          [{ text: t("open_settings"), onPress: () => Linking.openSettings() }]
        );
    },
    {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 10000,
    }
  );
};


 const convertToAddress = async (lat, lng) => {
  try {
    const geo = await Geocoder.from(lat, lng);

    if (
      geo &&
      geo.results &&
      geo.results.length > 0 &&
      geo.results[0].formatted_address
    ) {
      setAddress(geo.results[0].formatted_address);
    } else {
      setAddress("");
      Alert.alert(t("location_found"), t("address_not_available"));
    }
  } catch (error) {
    console.log("Geocode error:", error);
    // Alert.alert("Error", "Unable to fetch address");
  }
};


  // ✅ CONTINUE
  const handleContinue = () => {
    if (!selectedState) {
      Alert.alert(t("error"), t("select_state"));
    }

    if (!selectedDistrict) {
     Alert.alert(t("error"), t("select_district"));
  return;
}
    // if (!address) {
    //   Alert.alert("Error", "Please detect GPS location");
    //   return;
    // }

    // ✅ merge data
    const screen2Data = {
  ...screen1Data,
  state: selectedState,
  district: selectedDistrict, // ✅ final
  //  address: address || "", // optional         // optional (if backend needs)
};

    navigation.navigate("Screen3", { screen2Data });
  };


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
  {/* TOP ROW */}
  <View style={styles.headerTop}>
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.backIcon}>‹</Text>
    </TouchableOpacity>

    <Text style={styles.stepText}>{t("step_2_of_3")}</Text>
  </View>

  {/* PROGRESS BAR */}
  <View style={styles.progressBarBg}>
    <View style={styles.progressBarFill} />
  </View>
</View>


      {/* CARD */}
      <View style={styles.card}>
        {/* ICON */}
        <View style={styles.iconWrapper}>
          <Text style={styles.icon}>📍</Text>
        </View>

        <Text style={styles.cardTitle}>{t("address_details")}</Text>

         {/* STATE */}
        <Text style={styles.label}>{t("state")} *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowStates(!showStates)}
        >
          <Text style={styles.dropdownText}>
            {selectedState || t("select_state")}
          </Text>
          <Text style={styles.dropdownIcon}>⌄</Text>
        </TouchableOpacity>

        {/* STATE LIST */}
        {showStates && (
          <View style={styles.dropdownList}>
            <FlatList
              data={indianStates}
              keyExtractor={(item) => item.isoCode}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleStateSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        )}

        {/* DISTRICT */}
        <Text style={styles.label}>{t("district")} *</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowDistricts(!showDistricts)}
        >
          <Text style={styles.dropdownText}>
            {selectedDistrict || t("select_district")}
          </Text>
          <Text>⌄</Text>
        </TouchableOpacity>

        {showDistricts && (
          <View style={styles.dropdownList}>
            <FlatList
              data={availableDistricts}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedDistrict(item.name);
                    setShowDistricts(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            />
          </View>
        )}


      {/* 🏠 GPS ADDRESS */}
<Text style={styles.label}>{t("gps_address")}</Text>

<View style={styles.addressBox}>
  <Text
    style={[
      styles.addressText,
      !address && { color: "#999" },
    ]}
  >
    {address ||  t("no_address_detected")}
  </Text>
</View>


        {/* 📍 CURRENT LOCATION */}
{location && (
  <View style={styles.locationBox}>
    <Text style={styles.locationTitle}>{t("current_location")}</Text>

    <Text style={styles.locationValue}>
      {t("latitude")}: {location.latitude?.toFixed(4)}
    </Text>

    <Text style={styles.locationValue}>
     {t("longitude")}: {location.longitude?.toFixed(4)}
    </Text>
  </View>
)}


        {/* GPS BUTTON */}
        <TouchableOpacity style={styles.gpsBtn} onPress={detectGPS}>
          <Text style={styles.gpsIcon}>📍</Text>
          <Text style={styles.gpsText}>{t("detect_gps")}</Text>
        </TouchableOpacity>
      </View>

      {/* CONTINUE BUTTON */}
      <TouchableOpacity style={styles.continueBtn}
      onPress={()=> handleContinue()}
      >
        <Text style={styles.continueText}>{t("continue")} ›</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default Screen2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F5",
  },

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
  width: "28%", // Step 2 of 7
  backgroundColor: "#2E7D32",
  borderRadius: 2,
},


  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    elevation: 3,
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

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },

  dropdown: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 14,
    color: "#555",
  },

  dropdownIcon: {
    fontSize: 16,
    color: "#777",
  },

  dropdownList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginTop: 6,
    backgroundColor: "#fff",
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },

  gpsBtn: {
    marginTop: 16,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EAF4EA",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gpsIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  gpsText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },

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
  addressBox: {
  minHeight: 50,
  borderWidth: 1,
  borderColor: "#E0E0E0",
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 10,
  backgroundColor: "#FAFAFA",
  justifyContent: "center",
},

addressText: {
  fontSize: 14,
  color: "#333",
  lineHeight: 20,
},

locationBox: {
  backgroundColor: "#F4F8FF",
  borderRadius: 12,
  padding: 14,
  marginTop: 12,
  borderWidth: 1,
  borderColor: "#D6E4FF",
},

locationTitle: {
  fontSize: 14,
  fontWeight: "600",
  color: "#1E3A8A",
  marginBottom: 6,
},

locationValue: {
  fontSize: 13,
  color: "#333",
  marginTop: 2,
},

});


