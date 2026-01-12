import axios from "axios";
// import { getAccessToken, getUserData } from "./Storage";
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

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 API services
const apiService = {

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
  console.log(finalPayload)

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
      documents = {}
    } = finalPayload;

  try {
    // Prepare data
    const userData = {
      role: "Farmer",
      firstName,
      lastName,
      phone:phone,
      gender:gender,
      password: password ,
      village: village ,
      district: district,
      state: state ,
      farmerCategory: farmerCategory,
     cropsGrown: [
    {
      cropName: "Wheat",
      season: "kharif",
      quantityProduced: "500 kg"
    }
  ],
  landDetails: [
    {
      plotId: "P001",
      area: 5,
      irrigationType: "well",
      soilType: "black"
    }
  ]

    };
   const response = await apiClient.post('api/user/register', userData);
   console.log("response...",response);
   
    return response?.data;

  } catch (error) {
    console.log("Registration error:", error);
    
    // Show user-friendly error
    const errorMsg = error.response?.data?.message || "Registration failed. Please try again.";
    Alert.alert('Error', errorMsg);
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

 updateProfile : async (userRole) => {
  try {
    // Base data common to all roles
    const baseData = {
      role: userRole,
      fistName: firstName,
      lastName: lastName,
      phone: contactNumber,
      gender: gender,
      village: village,
      district: district,
      state: state
    };

    // Add role-specific fields
    let requestData = { ...baseData };
    
    if (userRole === "Farmer") {
      requestData = {
        ...requestData,
        farmerCategory: farmerCategory,
        cropsGrown: cropsGrown || [],
        landDetails: landDetails || []
      };
    } else if (userRole === "Staff") {
      requestData = {
        ...requestData,
        emailId: emailId,
        joiningDate: joiningDate
      };
    } else if (userRole === "FPO") {
      requestData = {
        ...requestData,
        emailId: emailId,
        gstNumber: gstNumber,
        shopName: shopName
      };
    }

    // Add password only if provided
    if (password && password.trim() !== '') {
      requestData.password = password;
    }

    const userId = await getUserId();
    const response = await axios.put(
      `/api/user/update-profile/${userId}`,
      requestData
    );

    return response.data;
    
  } catch (error) {
    console.error('Update error:', error);
    throw error;
  }
},



};






// 🔹 Export APIs
export const { getProfile,FarmerRegister,StafRegister,FPORegister ,updateProfile,  } = apiService;
