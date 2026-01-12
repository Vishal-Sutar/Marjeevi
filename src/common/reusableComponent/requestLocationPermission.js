import { PermissionsAndroid } from "react-native";
// import Geolocation from "react-native-geolocation-service";

export const getLocation = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "I wants your Location Permission",
        message:
          'App needs access to your location ' +
          'so you can use the app properly.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
           
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      });
    } else {
      console.log('Location permission denied');
      return null;
    }
  } catch (err) {
    console.warn(err);
    return null;
  }
};