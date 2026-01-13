import axios from "axios";
import {pythonUrl} from '../Redux/AuthSlice';
import { getAccessToken, getUserData } from "./Storage";
import { Alert } from "react-native";

// 🔹 Axios instance
const apiClient = axios.create({
  baseURL: pythonUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Get User ID from storage
const getUserId = async () => {
  const user = await getUserData();
  return user?.id;
};

// 🔹 Request interceptor (attach token)
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log('Interceptor token:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 API services
const apiService = {
  getUserDetails: async () => {
    try {
      const token = await getAccessToken();
      console.log('🔍 getUserDetails - Token:', token ? 'EXISTS' : 'MISSING');
      
      const response = await apiClient.get('/api/user/getUserDetails', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('🔍 getUserDetails - Full Response:', JSON.stringify(response.data, null, 2));
      console.log('🔍 getUserDetails - Response Structure:', {
        hasData: !!response.data?.data,
        directData: !!response.data?.firstName,
        keys: Object.keys(response.data || {})
      });
      return response.data;
    } catch (error) {
      console.error('🔍 getUserDetails - Error:', error.response?.data || error.message);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const userId = await getUserId();
      const response = await apiClient.get(`/api/user/update-profile/${id}`);

      return response.data;
    } catch (error) {
      console.error("Get Profile Error:", error);
      throw error;
    }
  },

FarmerRegister : async (finalPayload) => {
  console.log('FarmerRegister payload:', finalPayload)

  const {
      firstName,
      lastName,
      phone,
      password,
      gender,
      village,
      district,
      state,
      farmerCategory,
      cropsGrown = [],
      landDetails = [],
      bankName,
      ifscCode,
      accountNumber,
      documents = {}
    } = finalPayload;

  try {
    // Prepare data
    const userData = {
      role: "Farmer",
      firstName,
      lastName,
      phone: phone,
      gender: gender,
      password: password,
      village: village,
      district: district,
      state: state,
      farmerCategory: farmerCategory,
      cropsGrown: cropsGrown.length > 0 ? cropsGrown : [
        {
          cropName: "Wheat",
          season: "kharif",
          quantityProduced: "500 kg"
        }
      ],
      landDetails: landDetails.length > 0 ? landDetails : [
        {
          plotId: "P001",
          area: 5,
          irrigationType: "well",
          soilType: "black"
        }
      ],
      bankName: bankName || null,
      ifscCode: ifscCode || null,
      accountNumber: accountNumber || null
    };
    
    console.log('Sending userData to server:', userData);
    
   const response = await apiClient.post('api/user/register', userData);
   console.log("Registration response:", response.data);
   
    return response?.data;

  } catch (error) {
    console.log("Registration error:", error.response?.data || error.message);
    throw error; // Re-throw the error instead of showing Alert
  }
},


StafRegister : async (stafPayload) => {
  console.log("stafPayload", stafPayload)

  const {
      firstName,
      lastName,
      mobile,
       gender,
      // password,
      village,
      district,
      state,
      email,
      joiningDate
    } = stafPayload;

  try {
    // Prepare data
    const EmployeeData = {
      role: "Staff",
      firstName,
      lastName,
      phone:mobile,
      gender:gender,
      // password: password ,
      village: village ,
      district: district,
      state: state ,
      emailId:email,
      joiningDate: joiningDate,
    };
   const response = await apiClient.post('api/user/register', EmployeeData);
   console.log("response...",response);
   
    return response?.data;

  } catch (error) {
    console.log("Registration error:", error);
    
    // Show user-friendly error
    const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
    Alert.alert('Error', errorMsg);
  }
},


 FPORegister : async (FPOPayload) => {
  console.log("FPOPayload", FPOPayload);
  
  const {
      firstName,
      lastName,
      email,
      phone,
      password,
      state,
      district,
      village,
      gst
    } = FPOPayload;

  try {
    // Prepare data
    const FPOData = {
      role: "FPO",
      firstName,
      lastName,
      phone:phone,
      // gender:gender,
      password: password ,
      village: village ,
      district: district,
      state: state ,
      gstNumber:gst,
      emailId:email,
    };

   const response = await apiClient.post('api/user/register', FPOData);
   console.log("response...",response);
   
    return response.data;;

  } catch (error) {
    console.log("Registration error:", error);
    
    // Show user-friendly error
    const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
    Alert.alert('Error', errorMsg);
  }
},

 updateProfile : async (profileData) => {
  try {
    const token = await getAccessToken();
    console.log('🔄 updateProfile - Sending data:', JSON.stringify(profileData, null, 2));
    console.log('🔄 updateProfile - Token exists:', !!token);
    
    const response = await apiClient.put('/api/user/update-profile', profileData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('🔄 updateProfile - Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('🔄 updateProfile - Error:', error.response?.data || error.message);
    throw error;
  }
},

// Crop Listing APIs
// addCropListing: async (listingData) => {
//   try {
//     const token = await getAccessToken();
//     console.log('API URL:', `${pythonUrl}/api/crop-listing/add`);
//     console.log('Token:', token);
//     console.log('FormData keys:', Array.from(listingData._parts.map(part => part[0])));
    
//     const response = await axios({
//       method: 'POST',
//       url: `${pythonUrl}/api/crop-listing/add`,
//       data: listingData,
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//       timeout: 60000,
//     });
    
//     return response.data;
//   } catch (error) {
//     console.error('Full error object:', error);
//     console.error('Error response:', error.response?.data);
//     console.error('Error status:', error.response?.status);
//     console.error('Error message:', error.message);
    
//     if (error.code === 'ECONNABORTED') {
//       throw new Error('Request timeout. Please try again.');
//     }
//     if (error.message === 'Network Error') {
//       throw new Error('Network connection failed. Check your internet connection.');
//     }
//     throw error;
//   }
// },

addCropListing: async (listingData) => {
  try {
    const token = await getAccessToken();

    console.log('Uploading crop listing...');
    console.log('API:', `${pythonUrl}/api/crop-listing/add`);
    console.log('Token exists:', !!token);

    // Log FormData contents for debugging
    if (listingData._parts) {
      console.log('FormData contents:');
      listingData._parts.forEach(([key, value]) => {
        if (key === 'cropImages') {
          console.log(`${key}:`, {
            uri: value.uri,
            type: value.type,
            name: value.name,
            size: value.size || 'unknown'
          });
        } else {
          console.log(`${key}:`, value);
        }
      });
    }

    // Use fetch with the original FormData
    const response = await fetch(`${pythonUrl}/api/crop-listing/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for multipart/form-data
      },
      body: listingData,
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Response body:', responseText.substring(0, 500));

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Bad Request - Check if all required fields are provided correctly');
      }
      throw new Error(`Server error: ${response.status} - ${response.statusText}`);
    }

    try {
      return JSON.parse(responseText);
    } catch (e) {
      console.log('Response is not JSON, treating as success');
      return { success: true, message: 'Upload successful' };
    }
  } catch (error) {
    console.error("Crop Listing Upload Error");
    console.error("Error message:", error.message);
    
    if (error.name === 'TypeError' && error.message.includes('Network request failed')) {
      throw new Error('Network connection failed. Please check your internet connection.');
    }
    
    throw error;
  }
},


updateCropListing: async (id, listingData) => {
  try {
    const userId = await getUserId();
    const dataWithUserId = { ...listingData, userId };
    const response = await apiClient.put(`/api/crop-listing/update/${id}`, dataWithUserId);
    return response.data;
  } catch (error) {
    console.error('Update Crop Listing Error:', error);
    throw error;
  }
},

deleteCropListing: async (id) => {
  try {
    const userId = await getUserId();
    const response = await apiClient.delete(`/api/crop-listing/delete/${id}`, {
      data: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Delete Crop Listing Error:', error);
    throw error;
  }
},

getCropListings: async () => {
  try {
    const response = await apiClient.get('/api/crop-listing/getListings');
    return response.data;
  } catch (error) {
    console.error('Get Crop Listings Error:', error);
    throw error;
  }
},



};






// 🔹 Export APIs
export const { 
  getUserDetails, 
  getProfile, 
  FarmerRegister, 
  StafRegister, 
  FPORegister, 
  updateProfile, 
  addCropListing, 
  updateCropListing, 
  deleteCropListing, 
  getCropListings 
} = apiService;
