// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   TextInput,
// // //   FlatList,
// // //   Alert,
// // //   ActivityIndicator,
// // //   PermissionsAndroid,
// // //   Platform,
// // // } from "react-native";
// // // import { useState } from "react";
// // // import { useNavigation } from "@react-navigation/native";
// // // import { useTranslation } from "react-i18next";
// // // import { addCropListing } from "../../../Redux/apiService";
// // // import Geolocation from '@react-native-community/geolocation';
// // // import { launchImageLibrary } from 'react-native-image-picker';

// // // const CreateListing = () => {
// // //   const [cropName, setCropName] = useState("");
// // //   const [variety, setVariety] = useState("");
// // //   const [quantity, setQuantity] = useState("");
// // //   const [price, setPrice] = useState("");
// // //   const [location, setLocation] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const [currentLocation, setCurrentLocation] = useState(null);
// // //   const [locationLoading, setLocationLoading] = useState(false);

// // //    const navigation = useNavigation();
// // //   const { t } = useTranslation();

// // //     const [fileData, setFileData] = useState(null);
// // //   // 🔹 Image list (later connect backend / image picker)
// // //   const [images, setImages] = useState([]);

// // //   const getCurrentLocation = async () => {
// // //     setLocationLoading(true);
// // //     try {
// // //       if (Platform.OS === 'android') {
// // //         const granted = await PermissionsAndroid.request(
// // //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// // //         );
// // //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// // //           Alert.alert('Permission denied', 'Location permission is required');
// // //           setLocationLoading(false);
// // //           return;
// // //         }
// // //       }

// // //       Geolocation.getCurrentPosition(
// // //         (position) => {
// // //           const { latitude, longitude } = position.coords;
// // //           setCurrentLocation({ latitude, longitude });
// // //           setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
// // //           setLocationLoading(false);
// // //         },
// // //         (error) => {
// // //           console.error('Location error:', error);
// // //           // Use default location on timeout or error
// // //           const defaultLat = 18.5089;
// // //           const defaultLng = 73.9259;
// // //           setCurrentLocation({ latitude: defaultLat, longitude: defaultLng });
// // //           setLocation(`${defaultLat}, ${defaultLng} (Default)`);
// // //           setLocationLoading(false);
// // //           // Don't show alert, just use default silently
// // //         },
// // //         { 
// // //           enableHighAccuracy: false, 
// // //           timeout: 10000, 
// // //           maximumAge: 60000 
// // //         }
// // //       );
// // //     } catch (error) {
// // //       console.error('Permission error:', error);
// // //       setLocationLoading(false);
// // //     }
// // //   };

// // //   const pickDocument = () => {
// // //     console.log('Opening image picker...');
    
// // //     // Add a small delay to ensure activity is ready
// // //     setTimeout(() => {
// // //       const options = {
// // //         mediaType: 'photo',
// // //         includeBase64: false,
// // //         maxHeight: 1200,
// // //         maxWidth: 1200,
// // //         quality: 0.9,
// // //         selectionLimit: 1,
// // //       };

// // //       launchImageLibrary(options, (response) => {
// // //         console.log('Image picker response:', response);
        
// // //         if (response.didCancel) {
// // //           console.log('User cancelled image picker');
// // //           return;
// // //         }
        
// // //         if (response.errorCode) {
// // //           console.log('Image picker error:', response.errorMessage);
// // //           Alert.alert('Error', `Failed to open image picker: ${response.errorMessage}`);
// // //           return;
// // //         }

// // //         if (response.assets && response.assets[0]) {
// // //           const asset = response.assets[0];
          
// // //           const imageData = {
// // //             uri: asset.uri,
// // //             name: asset.fileName || `crop_${Date.now()}.jpg`,
// // //             type: asset.type || 'image/jpeg',
// // //             size: asset.fileSize
// // //           };
// // //           setImages([imageData]);
// // //           console.log("Image selected successfully:", imageData);
// // //         } else {
// // //           console.log('No image selected');
// // //         }
// // //       });
// // //     }, 100);
// // //   };

// // //   const handleSubmit = async () => {
// // //     if (!cropName || !variety || !quantity || !price) {
// // //       console.log("Validation failed: missing fields");
// // //       setTimeout(() => Alert.alert("Error", "Please fill all required fields"), 100);
// // //       return;
// // //     }

// // //     if (images.length === 0) {
// // //       console.log("Validation failed: no image");
// // //       setTimeout(() => Alert.alert("Error", "Please select an image"), 100);
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     console.log("Starting submission...");
    
// // //     try {
// // //       const { getAccessToken } = require('../../../Redux/Storage');
// // //       const token = await getAccessToken();
      
// // //       if (!token) {
// // //         console.log("No token found");
// // //         setTimeout(() => Alert.alert("Error", "Please login again"), 100);
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const formData = new FormData();
// // //       formData.append('cropName', cropName.trim());
// // //       formData.append('variety', variety.trim());
// // //       formData.append('quantity', quantity.toString());
// // //       formData.append('price', price.toString());
// // //       formData.append('harvestDate', new Date().toISOString().split('T')[0]);
      
// // //       const coords = currentLocation ? 
// // //         [currentLocation.longitude, currentLocation.latitude] : 
// // //         [73.9259, 18.5089];
// // //       formData.append('location', JSON.stringify(coords));
      
// // //       formData.append('cropImages', {
// // //         uri: images[0].uri,
// // //         type: images[0].type,
// // //         name: images[0].name,
// // //       });
      
// // //       console.log('Uploading image...');
      
// // //       // Create timeout promise
// // //       const timeoutPromise = new Promise((_, reject) => 
// // //         setTimeout(() => reject(new Error('Upload timeout')), 30000)
// // //       );
      
// // //       const uploadPromise = fetch('https://marjeevi-fpo-backend.onrender.com/api/crop-listing/add', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Authorization': `Bearer ${token}`,
// // //         },
// // //         body: formData,
// // //       });
      
// // //       const response = await Promise.race([uploadPromise, timeoutPromise]);

// // //       console.log('Response status:', response.status);
// // //       const result = await response.json();
// // //       console.log('Response data:', result);
      
// // //       if (response.ok) {
// // //         console.log("Success! Listing created");
// // //         // Clear form
// // //         setCropName("");
// // //         setVariety("");
// // //         setQuantity("");
// // //         setPrice("");
// // //         setLocation("");
// // //         setImages([]);
        
// // //         // Show success and navigate back
// // //         Alert.alert("Success", "Crop listing created successfully!", [
// // //           { text: "OK", onPress: () => navigation.goBack() }
// // //         ]);
// // //       } else {
// // //         console.log("Server error:", result.message);
// // //         setTimeout(() => Alert.alert("Error", result.message || "Failed to create listing"), 100);
// // //       }
      
// // //     } catch (error) {
// // //       console.error("Network error:", error);
// // //       setTimeout(() => Alert.alert("Error", error.message || "Network error"), 100);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

  
  

// // //   const renderImageItem = ({ item }) => {
// // //     return (
// // //       <View style={styles.imageItem}>
// // //         <Text style={styles.imageIcon}>📷</Text>
// // //       </View>
// // //     );
// // //   };

// // //   return (
// // //     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
// // //       {/* HEADER */}
// // //       <View style={styles.header}>
// // //         <TouchableOpacity 
// // //           onPress={() => navigation.goBack()}
// // //         style={styles.backBtn}>
// // //           <Text style={styles.backIcon}>‹</Text>
// // //         </TouchableOpacity>
// // //         <Text style={styles.headerTitle}> {t("create_listing.title")}</Text>
// // //       </View>

// // //       {/* CROP INFORMATION */}
// // //       <View style={styles.card}>
// // //         <Text style={styles.cardTitle}> {t("create_listing.crop_info")}</Text>

// // //         <TextInput
// // //           placeholder={t("create_listing.crop_name")}
// // //           value={cropName}
// // //           onChangeText={setCropName}
// // //           style={styles.input}
// // //           placeholderTextColor="#9E9E9E"
// // //         />

// // //         <TextInput
// // //           placeholder={t("create_listing.variety")}
// // //           value={variety}
// // //           onChangeText={setVariety}
// // //           style={styles.input}
// // //           placeholderTextColor="#9E9E9E"
// // //         />

// // //         <View style={styles.row}>
// // //           <TextInput
// // //             placeholder={t("create_listing.quantity")}
// // //             value={quantity}
// // //             onChangeText={setQuantity}
// // //             keyboardType="numeric"
// // //             style={[styles.input, styles.halfInput]}
// // //             placeholderTextColor="#9E9E9E"
// // //           />

// // //           <TextInput
// // //             placeholder={t("create_listing.price")}
// // //             value={price}
// // //             onChangeText={setPrice}
// // //             keyboardType="numeric"
// // //             style={[styles.input, styles.halfInput]}
// // //             placeholderTextColor="#9E9E9E"
// // //           />
// // //         </View>
// // //       </View>

// // //       {/* LOCATION */}
// // //       <View style={styles.card}>
// // //         <Text style={styles.cardTitle}>{t("create_listing.location")}</Text>

// // //         <TextInput
// // //           placeholder={t("create_listing.enter_location")}
// // //           value={location}
// // //           onChangeText={setLocation}
// // //           style={styles.input}
// // //           placeholderTextColor="#9E9E9E"
// // //         />

// // //         <TouchableOpacity 
// // //           style={[styles.locationBtn, locationLoading && styles.locationBtnDisabled]} 
// // //           onPress={getCurrentLocation}
// // //           disabled={locationLoading}
// // //         >
// // //           {locationLoading ? (
// // //             <ActivityIndicator size="small" color="#2E7D32" />
// // //           ) : (
// // //             <Text style={styles.locationIcon}>📍</Text>
// // //           )}
// // //           <Text style={styles.locationText}>
// // //             {locationLoading ? ' Getting location...' : ' Use current location'}
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </View>

// // //       {/* UPLOAD IMAGES */}
// // //       <View style={styles.card}>
// // //         <Text style={styles.cardTitle}> {t("create_listing.upload_images")}</Text>

// // //         <FlatList
// // //           data={images}
// // //           renderItem={renderImageItem}
// // //           keyExtractor={(item, index) => index.toString()}
// // //           horizontal
// // //           ListHeaderComponent={
// // //             <TouchableOpacity style={styles.uploadBox}
// // //               onPress={() => pickDocument()}
// // //             >
// // //               <Text style={styles.uploadIcon}>📷</Text>
// // //               <Text style={styles.uploadText}> {t("create_listing.add")}</Text>
// // //             </TouchableOpacity>
// // //           }
// // //           showsHorizontalScrollIndicator={false}
// // //         />
// // //       </View>

// // //       {/* SUBMIT */}
// // //       <TouchableOpacity 
// // //         style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
// // //         onPress={handleSubmit}
// // //         disabled={loading}
// // //       >
// // //         {loading ? (
// // //           <ActivityIndicator color="#fff" />
// // //         ) : (
// // //           <Text style={styles.submitText}>{t("create_listing.submit")}</Text>
// // //         )}
// // //       </TouchableOpacity>

// // //       <View style={{ height: 40 }} />
// // //     </ScrollView>
// // //   );
// // // };

// // // export default CreateListing;
// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#F4F6F5",
// // //   },

// // //   /* HEADER */
// // //   header: {
// // //     backgroundColor: "#2E7D32",
// // //     paddingVertical: 18,
// // //     paddingHorizontal: 16,
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //   },
// // //   backBtn: {
// // //     width: 36,
// // //     height: 36,
// // //     borderRadius: 18,
// // //     backgroundColor: "rgba(255,255,255,0.2)",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 12,
// // //   },
// // //   backIcon: {
// // //     fontSize: 22,
// // //     color: "#fff",
// // //     marginBottom: 2,
// // //   },
// // //   headerTitle: {
// // //     fontSize: 18,
// // //     fontWeight: "700",
// // //     color: "#fff",
// // //   },

// // //   /* CARD */
// // //   card: {
// // //     backgroundColor: "#fff",
// // //     marginHorizontal: 16,
// // //     marginTop: 16,
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     shadowColor: "#000",
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 10,
// // //     elevation: 3,
// // //   },
// // //   cardTitle: {
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     color: "#222",
// // //     marginBottom: 12,
// // //   },

// // //   /* INPUTS */
// // //   input: {
// // //     height: 48,
// // //     borderWidth: 1,
// // //     borderColor: "#E0E0E0",
// // //     borderRadius: 12,
// // //     paddingHorizontal: 14,
// // //     fontSize: 14,
// // //     color: "#222",
// // //     marginBottom: 12,
// // //     backgroundColor: "#FAFAFA",
// // //   },
// // //   row: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //   },
// // //   halfInput: {
// // //     width: "48%",
// // //   },

// // //   /* LOCATION */
// // //   locationBtn: {
// // //     height: 44,
// // //     borderRadius: 12,
// // //     backgroundColor: "#E8F5E9",
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     justifyContent: "center",
// // //     marginTop: 6,
// // //   },
// // //   locationIcon: {
// // //     fontSize: 16,
// // //     marginRight: 6,
// // //   },
// // //   locationText: {
// // //     fontSize: 14,
// // //     color: "#2E7D32",
// // //     fontWeight: "600",
// // //   },

// // //   /* UPLOAD */
// // //   uploadBox: {
// // //     width: 90,
// // //     height: 90,
// // //     borderRadius: 14,
// // //     borderWidth: 1,
// // //     borderStyle: "dashed",
// // //     borderColor: "#C8E6C9",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 12,
// // //   },
// // //   uploadIcon: {
// // //     fontSize: 22,
// // //     marginBottom: 4,
// // //   },
// // //   uploadText: {
// // //     fontSize: 12,
// // //     color: "#666",
// // //   },
// // //   imageItem: {
// // //     width: 90,
// // //     height: 90,
// // //     borderRadius: 14,
// // //     backgroundColor: "#E8F5E9",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginRight: 12,
// // //   },
// // //   imageIcon: {
// // //     fontSize: 26,
// // //   },

// // //   /* SUBMIT */
// // //   submitBtn: {
// // //     backgroundColor: "#2E7D32",
// // //     marginHorizontal: 16,
// // //     marginTop: 24,
// // //     borderRadius: 14,
// // //     paddingVertical: 14,
// // //     alignItems: "center",
// // //   },
// // //   submitText: {
// // //     color: "#fff",
// // //     fontSize: 16,
// // //     fontWeight: "600",
// // //   },
// // //   submitBtnDisabled: {
// // //     backgroundColor: "#A5D6A7",
// // //   },
// // //   locationBtnDisabled: {
// // //     backgroundColor: "#F0F0F0",
// // //   },
// // // });
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   TextInput,
// //   FlatList,
// //   Alert,
// //   ActivityIndicator,
// //   PermissionsAndroid,
// //   Platform,
// // } from "react-native";
// // import { useState } from "react";
// // import { useNavigation } from "@react-navigation/native";
// // import { useTranslation } from "react-i18next";
// // import { addCropListing } from "../../../Redux/apiService";
// // import Geolocation from '@react-native-community/geolocation';
// // import { launchImageLibrary } from 'react-native-image-picker';

// // const CreateListing = () => {
// //   const [cropName, setCropName] = useState("");
// //   const [variety, setVariety] = useState("");
// //   const [quantity, setQuantity] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [location, setLocation] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const [currentLocation, setCurrentLocation] = useState(null);
// //   const [locationLoading, setLocationLoading] = useState(false);

// //   const [fileData, setFileData] = useState(null);
// //   const [images, setImages] = useState([]);

// //   const navigation = useNavigation();
// //   const { t } = useTranslation();

// //   const getCurrentLocation = async () => {
// //     setLocationLoading(true);
// //     try {
// //       if (Platform.OS === 'android') {
// //         const granted = await PermissionsAndroid.request(
// //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
// //         );
// //         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
// //           Alert.alert('Permission denied', 'Location permission is required');
// //           setLocationLoading(false);
// //           return;
// //         }
// //       }

// //       Geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords;
// //           setCurrentLocation({ latitude, longitude });
// //           setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
// //           setLocationLoading(false);
// //         },
// //         (error) => {
// //           console.error('Location error:', error);
// //           const defaultLat = 18.5089;
// //           const defaultLng = 73.9259;
// //           setCurrentLocation({ latitude: defaultLat, longitude: defaultLng });
// //           setLocation(`${defaultLat}, ${defaultLng} (Default)`);
// //           setLocationLoading(false);
// //         },
// //         { 
// //           enableHighAccuracy: false, 
// //           timeout: 10000, 
// //           maximumAge: 60000 
// //         }
// //       );
// //     } catch (error) {
// //       console.error('Permission error:', error);
// //       setLocationLoading(false);
// //     }
// //   };

// //   const pickDocument = () => {
// //     console.log('Opening image picker...');
    
// //     setTimeout(() => {
// //       const options = {
// //         mediaType: 'photo',
// //         includeBase64: false,
// //         maxHeight: 1200,
// //         maxWidth: 1200,
// //         quality: 0.9,
// //         selectionLimit: 1,
// //       };

// //       launchImageLibrary(options, (response) => {
// //         console.log('Image picker response:', response);
        
// //         if (response.didCancel) {
// //           console.log('User cancelled image picker');
// //           return;
// //         }
        
// //         if (response.errorCode) {
// //           console.log('Image picker error:', response.errorMessage);
// //           Alert.alert('Error', `Failed to open image picker: ${response.errorMessage}`);
// //           return;
// //         }

// //         if (response.assets && response.assets[0]) {
// //           const asset = response.assets[0];
          
// //           // FIX: Properly format the image data for FormData
// //           let uri = asset.uri;
          
// //           // Handle Android content:// URIs
// //           if (Platform.OS === 'android' && uri.startsWith('content://')) {
// //             // Keep the URI as is for Android
// //             uri = uri;
// //           } else if (Platform.OS === 'ios' && !uri.startsWith('file://')) {
// //             // Add file:// prefix for iOS if missing
// //             uri = 'file://' + uri;
// //           }
          
// //           const imageData = {
// //             uri: uri,
// //             name: asset.fileName || `crop_${Date.now()}.jpg`,
// //             type: asset.type || 'image/jpeg',
// //             size: asset.fileSize
// //           };
          
// //           setImages([imageData]);
// //           console.log("Image selected successfully:", imageData);
// //         } else {
// //           console.log('No image selected');
// //         }
// //       });
// //     }, 100);
// //   };

// //   const handleSubmit = async () => {
// //     if (!cropName || !variety || !quantity || !price) {
// //       console.log("Validation failed: missing fields");
// //       setTimeout(() => Alert.alert("Error", "Please fill all required fields"), 100);
// //       return;
// //     }

// //     if (images.length === 0) {
// //       console.log("Validation failed: no image");
// //       setTimeout(() => Alert.alert("Error", "Please select an image"), 100);
// //       return;
// //     }

// //     setLoading(true);
// //     console.log("Starting submission...");
    
// //     try {
// //       const { getAccessToken } = require('../../../Redux/Storage');
// //       const token = await getAccessToken();
      
// //       if (!token) {
// //         console.log("No token found");
// //         setTimeout(() => Alert.alert("Error", "Please login again"), 100);
// //         setLoading(false);
// //         return;
// //       }

// //       const formData = new FormData();
// //       formData.append('cropName', cropName.trim());
// //       formData.append('variety', variety.trim());
// //       formData.append('quantity', quantity.toString());
// //       formData.append('price', price.toString());
// //       formData.append('harvestDate', new Date().toISOString().split('T')[0]);
      
// //       const coords = currentLocation ? 
// //         [currentLocation.longitude, currentLocation.latitude] : 
// //         [73.9259, 18.5089];
// //       formData.append('location', JSON.stringify(coords));
      
// //       // FIX: Properly append the image to FormData
// //       const imageFile = {
// //         uri: images[0].uri,
// //         type: images[0].type,
// //         name: images[0].name,
// //       };
      
// //       // Log the image data being sent
// //       console.log('Image being uploaded:', imageFile);
      
// //       formData.append('cropImages', imageFile);
      
// //       console.log('Uploading image...');
      
// //       const timeoutPromise = new Promise((_, reject) => 
// //         setTimeout(() => reject(new Error('Upload timeout')), 30000)
// //       );
      
// //       const uploadPromise = fetch('https://marjeevi-fpo-backend.onrender.com/api/crop-listing/add', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           // FIX: Don't set Content-Type header - let fetch set it automatically with boundary
// //           // 'Content-Type': 'multipart/form-data', // REMOVE THIS LINE
// //         },
// //         body: formData,
// //       });
      
// //       const response = await Promise.race([uploadPromise, timeoutPromise]);

// //       console.log('Response status:', response.status);
// //       const result = await response.json();
// //       console.log('Response data:', result);
      
// //       if (response.ok) {
// //         console.log("Success! Listing created");
// //         setCropName("");
// //         setVariety("");
// //         setQuantity("");
// //         setPrice("");
// //         setLocation("");
// //         setImages([]);
// //         setCurrentLocation(null);
        
// //         Alert.alert("Success", "Crop listing created successfully!", [
// //           { text: "OK", onPress: () => navigation.goBack() }
// //         ]);
// //       } else {
// //         console.log("Server error:", result.message);
// //         setTimeout(() => Alert.alert("Error", result.message || "Failed to create listing"), 100);
// //       }
      
// //     } catch (error) {
// //       console.error("Network error:", error);
// //       setTimeout(() => Alert.alert("Error", error.message || "Network error"), 100);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderImageItem = ({ item }) => {
// //     return (
// //       <View style={styles.imageItem}>
// //         <Text style={styles.imageIcon}>📷</Text>
// //       </View>
// //     );
// //   };

// //   return (
// //     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
// //       {/* HEADER */}
// //       <View style={styles.header}>
// //         <TouchableOpacity 
// //           onPress={() => navigation.goBack()}
// //           style={styles.backBtn}>
// //           <Text style={styles.backIcon}>‹</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>{t("create_listing.title")}</Text>
// //       </View>

// //       {/* CROP INFORMATION */}
// //       <View style={styles.card}>
// //         <Text style={styles.cardTitle}>{t("create_listing.crop_info")}</Text>

// //         <TextInput
// //           placeholder={t("create_listing.crop_name")}
// //           value={cropName}
// //           onChangeText={setCropName}
// //           style={styles.input}
// //           placeholderTextColor="#9E9E9E"
// //         />

// //         <TextInput
// //           placeholder={t("create_listing.variety")}
// //           value={variety}
// //           onChangeText={setVariety}
// //           style={styles.input}
// //           placeholderTextColor="#9E9E9E"
// //         />

// //         <View style={styles.row}>
// //           <TextInput
// //             placeholder={t("create_listing.quantity")}
// //             value={quantity}
// //             onChangeText={setQuantity}
// //             keyboardType="numeric"
// //             style={[styles.input, styles.halfInput]}
// //             placeholderTextColor="#9E9E9E"
// //           />

// //           <TextInput
// //             placeholder={t("create_listing.price")}
// //             value={price}
// //             onChangeText={setPrice}
// //             keyboardType="numeric"
// //             style={[styles.input, styles.halfInput]}
// //             placeholderTextColor="#9E9E9E"
// //           />
// //         </View>
// //       </View>

// //       {/* LOCATION */}
// //       <View style={styles.card}>
// //         <Text style={styles.cardTitle}>{t("create_listing.location")}</Text>

// //         <TextInput
// //           placeholder={t("create_listing.enter_location")}
// //           value={location}
// //           onChangeText={setLocation}
// //           style={styles.input}
// //           placeholderTextColor="#9E9E9E"
// //         />

// //         <TouchableOpacity 
// //           style={[styles.locationBtn, locationLoading && styles.locationBtnDisabled]} 
// //           onPress={getCurrentLocation}
// //           disabled={locationLoading}
// //         >
// //           {locationLoading ? (
// //             <ActivityIndicator size="small" color="#2E7D32" />
// //           ) : (
// //             <Text style={styles.locationIcon}>📍</Text>
// //           )}
// //           <Text style={styles.locationText}>
// //             {locationLoading ? ' Getting location...' : ' Use current location'}
// //           </Text>
// //         </TouchableOpacity>
// //       </View>

// //       {/* UPLOAD IMAGES */}
// //       <View style={styles.card}>
// //         <Text style={styles.cardTitle}>{t("create_listing.upload_images")}</Text>

// //         <FlatList
// //           data={images}
// //           renderItem={renderImageItem}
// //           keyExtractor={(item, index) => index.toString()}
// //           horizontal
// //           ListHeaderComponent={
// //             <TouchableOpacity 
// //               style={styles.uploadBox}
// //               onPress={() => pickDocument()}
// //             >
// //               <Text style={styles.uploadIcon}>📷</Text>
// //               <Text style={styles.uploadText}>{t("create_listing.add")}</Text>
// //             </TouchableOpacity>
// //           }
// //           showsHorizontalScrollIndicator={false}
// //         />
// //       </View>

// //       {/* SUBMIT */}
// //       <TouchableOpacity 
// //         style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
// //         onPress={handleSubmit}
// //         disabled={loading}
// //       >
// //         {loading ? (
// //           <ActivityIndicator color="#fff" />
// //         ) : (
// //           <Text style={styles.submitText}>{t("create_listing.submit")}</Text>
// //         )}
// //       </TouchableOpacity>

// //       <View style={{ height: 40 }} />
// //     </ScrollView>
// //   );
// // };

// // export default CreateListing;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F4F6F5",
// //   },

// //   /* HEADER */
// //   header: {
// //     backgroundColor: "#2E7D32",
// //     paddingVertical: 18,
// //     paddingHorizontal: 16,
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   backBtn: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 18,
// //     backgroundColor: "rgba(255,255,255,0.2)",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginRight: 12,
// //   },
// //   backIcon: {
// //     fontSize: 22,
// //     color: "#fff",
// //     marginBottom: 2,
// //   },
// //   headerTitle: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //     color: "#fff",
// //   },

// //   /* CARD */
// //   card: {
// //     backgroundColor: "#fff",
// //     marginHorizontal: 16,
// //     marginTop: 16,
// //     borderRadius: 16,
// //     padding: 16,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.05,
// //     shadowRadius: 10,
// //     elevation: 3,
// //   },
// //   cardTitle: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#222",
// //     marginBottom: 12,
// //   },

// //   /* INPUTS */
// //   input: {
// //     height: 48,
// //     borderWidth: 1,
// //     borderColor: "#E0E0E0",
// //     borderRadius: 12,
// //     paddingHorizontal: 14,
// //     fontSize: 14,
// //     color: "#222",
// //     marginBottom: 12,
// //     backgroundColor: "#FAFAFA",
// //   },
// //   row: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //   },
// //   halfInput: {
// //     width: "48%",
// //   },

// //   /* LOCATION */
// //   locationBtn: {
// //     height: 44,
// //     borderRadius: 12,
// //     backgroundColor: "#E8F5E9",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 6,
// //   },
// //   locationIcon: {
// //     fontSize: 16,
// //     marginRight: 6,
// //   },
// //   locationText: {
// //     fontSize: 14,
// //     color: "#2E7D32",
// //     fontWeight: "600",
// //   },

// //   /* UPLOAD */
// //   uploadBox: {
// //     width: 90,
// //     height: 90,
// //     borderRadius: 14,
// //     borderWidth: 1,
// //     borderStyle: "dashed",
// //     borderColor: "#C8E6C9",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginRight: 12,
// //   },
// //   uploadIcon: {
// //     fontSize: 22,
// //     marginBottom: 4,
// //   },
// //   uploadText: {
// //     fontSize: 12,
// //     color: "#666",
// //   },
// //   imageItem: {
// //     width: 90,
// //     height: 90,
// //     borderRadius: 14,
// //     backgroundColor: "#E8F5E9",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginRight: 12,
// //   },
// //   imageIcon: {
// //     fontSize: 26,
// //   },

// //   /* SUBMIT */
// //   submitBtn: {
// //     backgroundColor: "#2E7D32",
// //     marginHorizontal: 16,
// //     marginTop: 24,
// //     borderRadius: 14,
// //     paddingVertical: 14,
// //     alignItems: "center",
// //   },
// //   submitText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //   },
// //   submitBtnDisabled: {
// //     backgroundColor: "#A5D6A7",
// //   },
// //   locationBtnDisabled: {
// //     backgroundColor: "#F0F0F0",
// //   },
// // });

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Alert,
//   ActivityIndicator,
//   PermissionsAndroid,
//   Platform,
// } from "react-native";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useTranslation } from "react-i18next";
// import { addCropListing } from "../../../Redux/apiService";
// import Geolocation from '@react-native-community/geolocation';
// import { launchImageLibrary } from 'react-native-image-picker';

// const CreateListing = () => {
//   const [cropName, setCropName] = useState("");
//   const [variety, setVariety] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(false);

//   const [fileData, setFileData] = useState(null);
//   const [images, setImages] = useState([]);

//   const navigation = useNavigation();
//   const { t } = useTranslation();

//   const getCurrentLocation = async () => {
//     setLocationLoading(true);
//     try {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission denied', 'Location permission is required');
//           setLocationLoading(false);
//           return;
//         }
//       }

//       Geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ latitude, longitude });
//           setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
//           setLocationLoading(false);
//         },
//         (error) => {
//           console.error('Location error:', error);
//           const defaultLat = 18.5089;
//           const defaultLng = 73.9259;
//           setCurrentLocation({ latitude: defaultLat, longitude: defaultLng });
//           setLocation(`${defaultLat}, ${defaultLng} (Default)`);
//           setLocationLoading(false);
//         },
//         { 
//           enableHighAccuracy: false, 
//           timeout: 10000, 
//           maximumAge: 60000 
//         }
//       );
//     } catch (error) {
//       console.error('Permission error:', error);
//       setLocationLoading(false);
//     }
//   };

//   const pickDocument = () => {
//     console.log('Opening image picker...');
    
//     setTimeout(() => {
//       const options = {
//         mediaType: 'photo',
//         includeBase64: false,
//         maxHeight: 1200,
//         maxWidth: 1200,
//         quality: 0.9,
//         selectionLimit: 1,
//       };

//       launchImageLibrary(options, (response) => {
//         console.log('Image picker response:', response);
        
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//           return;
//         }
        
//         if (response.errorCode) {
//           console.log('Image picker error:', response.errorMessage);
//           Alert.alert('Error', `Failed to open image picker: ${response.errorMessage}`);
//           return;
//         }

//         if (response.assets && response.assets[0]) {
//           const asset = response.assets[0];
          
//           // Get the proper URI for the file
//           let fileUri = asset.uri;
          
//           // For Android, handle content:// URIs
//           if (Platform.OS === 'android') {
//             // Remove any file:// prefix if it exists
//             fileUri = fileUri.replace('file://', '');
//           }
          
//           const imageData = {
//             uri: fileUri,
//             name: asset.fileName || `crop_${Date.now()}.jpg`,
//             type: asset.type || 'image/jpeg',
//             size: asset.fileSize
//           };
          
//           setImages([imageData]);
//           console.log("Image selected successfully:", imageData);
//         } else {
//           console.log('No image selected');
//         }
//       });
//     }, 100);
//   };

//   const handleSubmit = async () => {
//     if (!cropName || !variety || !quantity || !price) {
//       console.log("Validation failed: missing fields");
//       setTimeout(() => Alert.alert("Error", "Please fill all required fields"), 100);
//       return;
//     }

//     if (images.length === 0) {
//       console.log("Validation failed: no image");
//       setTimeout(() => Alert.alert("Error", "Please select an image"), 100);
//       return;
//     }

//     setLoading(true);
//     console.log("Starting submission...");
    
//     try {
//       const { getAccessToken } = require('../../../Redux/Storage');
//       const token = await getAccessToken();
      
//       if (!token) {
//         console.log("No token found");
//         setTimeout(() => Alert.alert("Error", "Please login again"), 100);
//         setLoading(false);
//         return;
//       }

//       // Create FormData
//       const formData = new FormData();
//       formData.append('cropName', cropName.trim());
//       formData.append('variety', variety.trim());
//       formData.append('quantity', quantity.toString());
//       formData.append('price', price.toString());
//       formData.append('harvestDate', new Date().toISOString().split('T')[0]);
      
//       const coords = currentLocation ? 
//         [currentLocation.longitude, currentLocation.latitude] : 
//         [73.9259, 18.5089];
//       formData.append('location', JSON.stringify(coords));
      
//       // Append image with proper format
//       const image = images[0];
//       const imageFile = {
//         uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
//         type: image.type,
//         name: image.name,
//       };
      
//       console.log('Image being uploaded:', imageFile);
//       formData.append('cropImages', imageFile);
      
//       console.log('Uploading to server...');
      
//       // Use XMLHttpRequest for better compatibility with file uploads
//       const xhr = new XMLHttpRequest();
      
//       const uploadPromise = new Promise((resolve, reject) => {
//         xhr.timeout = 30000; // 30 second timeout
        
//         xhr.onload = () => {
//           console.log('Response status:', xhr.status);
//           console.log('Response text:', xhr.responseText);
          
//           if (xhr.status >= 200 && xhr.status < 300) {
//             try {
//               const result = JSON.parse(xhr.responseText);
//               resolve(result);
//             } catch (e) {
//               resolve({ success: true });
//             }
//           } else {
//             try {
//               const error = JSON.parse(xhr.responseText);
//               reject(new Error(error.message || 'Upload failed'));
//             } catch (e) {
//               reject(new Error(`Server error: ${xhr.status}`));
//             }
//           }
//         };
        
//         xhr.onerror = () => {
//           console.error('XHR Error');
//           reject(new Error('Network error - Please check your internet connection'));
//         };
        
//         xhr.ontimeout = () => {
//           console.error('XHR Timeout');
//           reject(new Error('Upload timeout - Please try again'));
//         };
        
//         xhr.upload.onprogress = (event) => {
//           if (event.lengthComputable) {
//             const percentComplete = (event.loaded / event.total) * 100;
//             console.log(`Upload progress: ${percentComplete.toFixed(0)}%`);
//           }
//         };
        
//         xhr.open('POST', 'https://marjeevi-fpo-backend.onrender.com/api/crop-listing/add');
//         xhr.setRequestHeader('Authorization', `Bearer ${token}`);
//         // Don't set Content-Type - let XHR set it with boundary
        
//         xhr.send(formData);
//       });
      
//       const result = await uploadPromise;
      
//       console.log("Success! Listing created");
//       console.log('Response data:', result);
      
//       // Clear form
//       setCropName("");
//       setVariety("");
//       setQuantity("");
//       setPrice("");
//       setLocation("");
//       setImages([]);
//       setCurrentLocation(null);
      
//       // Show success and navigate back
//       Alert.alert("Success", "Crop listing created successfully!", [
//         { text: "OK", onPress: () => navigation.goBack() }
//       ]);
      
//     } catch (error) {
//       console.error("Upload error:", error);
//       setTimeout(() => {
//         Alert.alert(
//           "Error", 
//           error.message || "Failed to upload. Please check your internet connection and try again."
//         );
//       }, 100);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderImageItem = ({ item }) => {
//     return (
//       <View style={styles.imageItem}>
//         <Text style={styles.imageIcon}>📷</Text>
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* HEADER */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}>
//           <Text style={styles.backIcon}>‹</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>{t("create_listing.title")}</Text>
//       </View>

//       {/* CROP INFORMATION */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("create_listing.crop_info")}</Text>

//         <TextInput
//           placeholder={t("create_listing.crop_name")}
//           value={cropName}
//           onChangeText={setCropName}
//           style={styles.input}
//           placeholderTextColor="#9E9E9E"
//         />

//         <TextInput
//           placeholder={t("create_listing.variety")}
//           value={variety}
//           onChangeText={setVariety}
//           style={styles.input}
//           placeholderTextColor="#9E9E9E"
//         />

//         <View style={styles.row}>
//           <TextInput
//             placeholder={t("create_listing.quantity")}
//             value={quantity}
//             onChangeText={setQuantity}
//             keyboardType="numeric"
//             style={[styles.input, styles.halfInput]}
//             placeholderTextColor="#9E9E9E"
//           />

//           <TextInput
//             placeholder={t("create_listing.price")}
//             value={price}
//             onChangeText={setPrice}
//             keyboardType="numeric"
//             style={[styles.input, styles.halfInput]}
//             placeholderTextColor="#9E9E9E"
//           />
//         </View>
//       </View>

//       {/* LOCATION */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("create_listing.location")}</Text>

//         <TextInput
//           placeholder={t("create_listing.enter_location")}
//           value={location}
//           onChangeText={setLocation}
//           style={styles.input}
//           placeholderTextColor="#9E9E9E"
//         />

//         <TouchableOpacity 
//           style={[styles.locationBtn, locationLoading && styles.locationBtnDisabled]} 
//           onPress={getCurrentLocation}
//           disabled={locationLoading}
//         >
//           {locationLoading ? (
//             <ActivityIndicator size="small" color="#2E7D32" />
//           ) : (
//             <Text style={styles.locationIcon}>📍</Text>
//           )}
//           <Text style={styles.locationText}>
//             {locationLoading ? ' Getting location...' : ' Use current location'}
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* UPLOAD IMAGES */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>{t("create_listing.upload_images")}</Text>

//         <FlatList
//           data={images}
//           renderItem={renderImageItem}
//           keyExtractor={(item, index) => index.toString()}
//           horizontal
//           ListHeaderComponent={
//             <TouchableOpacity 
//               style={styles.uploadBox}
//               onPress={() => pickDocument()}
//             >
//               <Text style={styles.uploadIcon}>📷</Text>
//               <Text style={styles.uploadText}>{t("create_listing.add")}</Text>
//             </TouchableOpacity>
//           }
//           showsHorizontalScrollIndicator={false}
//         />
//       </View>

//       {/* SUBMIT */}
//       <TouchableOpacity 
//         style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
//         onPress={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.submitText}>{t("create_listing.submit")}</Text>
//         )}
//       </TouchableOpacity>

//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// };

// export default CreateListing;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F4F6F5",
//   },

//   /* HEADER */
//   header: {
//     backgroundColor: "#2E7D32",
//     paddingVertical: 18,
//     paddingHorizontal: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   backBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   backIcon: {
//     fontSize: 22,
//     color: "#fff",
//     marginBottom: 2,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#fff",
//   },

//   /* CARD */
//   card: {
//     backgroundColor: "#fff",
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     padding: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#222",
//     marginBottom: 12,
//   },

//   /* INPUTS */
//   input: {
//     height: 48,
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     borderRadius: 12,
//     paddingHorizontal: 14,
//     fontSize: 14,
//     color: "#222",
//     marginBottom: 12,
//     backgroundColor: "#FAFAFA",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   halfInput: {
//     width: "48%",
//   },

//   /* LOCATION */
//   locationBtn: {
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: "#E8F5E9",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 6,
//   },
//   locationIcon: {
//     fontSize: 16,
//     marginRight: 6,
//   },
//   locationText: {
//     fontSize: 14,
//     color: "#2E7D32",
//     fontWeight: "600",
//   },

//   /* UPLOAD */
//   uploadBox: {
//     width: 90,
//     height: 90,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: "#C8E6C9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   uploadIcon: {
//     fontSize: 22,
//     marginBottom: 4,
//   },
//   uploadText: {
//     fontSize: 12,
//     color: "#666",
//   },
//   imageItem: {
//     width: 90,
//     height: 90,
//     borderRadius: 14,
//     backgroundColor: "#E8F5E9",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   imageIcon: {
//     fontSize: 26,
//   },

//   /* SUBMIT */
//   submitBtn: {
//     backgroundColor: "#2E7D32",
//     marginHorizontal: 16,
//     marginTop: 24,
//     borderRadius: 14,
//     paddingVertical: 14,
//     alignItems: "center",
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   submitBtnDisabled: {
//     backgroundColor: "#A5D6A7",
//   },
//   locationBtnDisabled: {
//     backgroundColor: "#F0F0F0",
//   },
// });
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { addCropListing, updateCropListing } from "../../../Redux/apiService";
import Geolocation from '@react-native-community/geolocation';
import { launchImageLibrary } from 'react-native-image-picker';

const CreateListing = () => {
  const [cropName, setCropName] = useState("");
  const [variety, setVariety] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [fileData, setFileData] = useState(null);
  const [images, setImages] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  
  // Check if we're editing an existing listing
  const editingListing = route.params?.listing;
  const isEditMode = !!editingListing;

  useEffect(() => {
    if (isEditMode && editingListing) {
      // Pre-populate form with existing data
      setCropName(editingListing.cropName || "");
      setVariety(editingListing.variety || "");
      setQuantity(editingListing.quantity?.toString() || "");
      setPrice(editingListing.price?.toString() || "");
      
      // Handle location - convert array to readable string
      let locationStr = "";
      if (editingListing.location) {
        if (Array.isArray(editingListing.location)) {
          locationStr = `${editingListing.location[1]}, ${editingListing.location[0]}`;
        } else if (typeof editingListing.location === 'string') {
          locationStr = editingListing.location;
        }
      }
      setLocation(locationStr);
      
      // Handle existing images
      if (editingListing.cropImages && editingListing.cropImages.length > 0) {
        const existingImages = editingListing.cropImages.map(img => ({
          uri: img.url || img.uri,
          name: img.name || 'existing_image.jpg',
          type: img.type || 'image/jpeg',
          isExisting: true
        }));
        setImages(existingImages);
      }
    }
  }, [isEditMode, editingListing]);

  const getCurrentLocation = async () => {
    setLocationLoading(true);
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied', 'Location permission is required');
          setLocationLoading(false);
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocationLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          const defaultLat = 18.5089;
          const defaultLng = 73.9259;
          setCurrentLocation({ latitude: defaultLat, longitude: defaultLng });
          setLocation(`${defaultLat}, ${defaultLng} (Default)`);
          setLocationLoading(false);
        },
        { 
          enableHighAccuracy: false, 
          timeout: 10000, 
          maximumAge: 60000 
        }
      );
    } catch (error) {
      console.error('Permission error:', error);
      setLocationLoading(false);
    }
  };

  const pickDocument = () => {
    console.log('Opening image picker...');
    
    setTimeout(() => {
      const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 1200,
        maxWidth: 1200,
        quality: 0.9,
        selectionLimit: 1,
      };

      launchImageLibrary(options, (response) => {
        console.log('Image picker response:', response);
        
        if (response.didCancel) {
          console.log('User cancelled image picker');
          return;
        }
        
        if (response.errorCode) {
          console.log('Image picker error:', response.errorMessage);
          Alert.alert('Error', `Failed to open image picker: ${response.errorMessage}`);
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          
          const imageData = {
            uri: asset.uri, // Keep original URI exactly as provided
            name: asset.fileName || `crop_${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg',
            size: asset.fileSize
          };
          
          setImages([imageData]);
          console.log("Image selected successfully:", imageData);
        } else {
          console.log('No image selected');
        }
      });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!cropName || !variety || !quantity || !price) {
      console.log("Validation failed: missing fields");
      setTimeout(() => Alert.alert("Error", "Please fill all required fields"), 100);
      return;
    }

    if (images.length === 0) {
      console.log("Validation failed: no image");
      setTimeout(() => Alert.alert("Error", "Please select an image"), 100);
      return;
    }

    setLoading(true);
    console.log("Starting submission...");
    
    try {
      if (isEditMode) {
        // Update existing listing
        const updateData = {
          cropName: cropName.trim(),
          variety: variety.trim(),
          quantity: parseInt(quantity),
          price: parseFloat(price),
          location: location ? location.trim() : ""
        };
        
        console.log('Updating listing with ID:', editingListing._id);
        const result = await updateCropListing(editingListing._id, updateData);
        
        console.log("Success! Listing updated");
        Alert.alert("Success", "Crop listing updated successfully!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        // Create new listing
        const formData = new FormData();
        formData.append('cropName', cropName.trim());
        formData.append('variety', variety.trim());
        formData.append('quantity', quantity.toString());
        formData.append('price', price.toString());
        formData.append('harvestDate', new Date().toISOString().split('T')[0]);
        
        const coords = currentLocation ? 
          [currentLocation.longitude, currentLocation.latitude] : 
          [73.9259, 18.5089];
        formData.append('location', JSON.stringify(coords));
        
        const image = images[0];
        formData.append('cropImages', {
          uri: image.uri,
          type: image.type,
          name: image.name,
        });
        
        console.log('Creating new listing...');
        const result = await addCropListing(formData);
        
        console.log("Success! Listing created");
        Alert.alert("Success", "Crop listing created successfully!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      }
      
      // Clear form
      setCropName("");
      setVariety("");
      setQuantity("");
      setPrice("");
      setLocation("");
      setImages([]);
      setCurrentLocation(null);
      
    } catch (error) {
      console.error("Submit error:", error);
      setTimeout(() => {
        Alert.alert(
          "Error", 
          error.message || "Failed to save listing. Please try again."
        );
      }, 100);
    } finally {
      setLoading(false);
    }
  };

  const renderImageItem = ({ item }) => {
    return (
      <View style={styles.imageItem}>
        <Image source={{ uri: item.uri }} style={styles.selectedImage} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? "Edit Listing" : t("create_listing.title")}</Text>
      </View>

      {/* CROP INFORMATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("create_listing.crop_info")}</Text>

        <TextInput
          placeholder={t("create_listing.crop_name")}
          value={cropName}
          onChangeText={setCropName}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <TextInput
          placeholder={t("create_listing.variety")}
          value={variety}
          onChangeText={setVariety}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <View style={styles.row}>
          <TextInput
            placeholder={t("create_listing.quantity")}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            placeholderTextColor="#9E9E9E"
          />

          <TextInput
            placeholder={t("create_listing.price")}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            placeholderTextColor="#9E9E9E"
          />
        </View>
      </View>

      {/* LOCATION */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("create_listing.location")}</Text>

        <TextInput
          placeholder={t("create_listing.enter_location")}
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholderTextColor="#9E9E9E"
        />

        <TouchableOpacity 
          style={[styles.locationBtn, locationLoading && styles.locationBtnDisabled]} 
          onPress={getCurrentLocation}
          disabled={locationLoading}
        >
          {locationLoading ? (
            <ActivityIndicator size="small" color="#2E7D32" />
          ) : (
            <Text style={styles.locationIcon}>📍</Text>
          )}
          <Text style={styles.locationText}>
            {locationLoading ? ' Getting location...' : ' Use current location'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* UPLOAD IMAGES */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t("create_listing.upload_images")}</Text>

        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ListHeaderComponent={
            <TouchableOpacity 
              style={styles.uploadBox}
              onPress={() => pickDocument()}
            >
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>{t("create_listing.add")}</Text>
            </TouchableOpacity>
          }
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* SUBMIT */}
      <TouchableOpacity 
        style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>{isEditMode ? "Update Listing" : t("create_listing.submit")}</Text>
        )}
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default CreateListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F5",
  },

  /* HEADER */
  header: {
    backgroundColor: "#2E7D32",
    paddingVertical: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backIcon: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 12,
  },

  /* INPUTS */
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#222",
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },

  /* LOCATION */
  locationBtn: {
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  locationText: {
    fontSize: 14,
    color: "#2E7D32",
    fontWeight: "600",
  },

  /* UPLOAD */
  uploadBox: {
    width: 90,
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C8E6C9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  uploadIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  uploadText: {
    fontSize: 12,
    color: "#666",
  },
  imageItem: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  imageIcon: {
    fontSize: 26,
  },
  selectedImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },

  /* SUBMIT */
  submitBtn: {
    backgroundColor: "#2E7D32",
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitBtnDisabled: {
    backgroundColor: "#A5D6A7",
  },
  locationBtnDisabled: {
    backgroundColor: "#F0F0F0",
  },
});