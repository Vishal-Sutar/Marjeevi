import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setAccessToken, setUserData } from "./Storage";


// FOR TEST SERVER
export const pythonUrl = 'https://marjeevi-fpo-backend.onrender.com'

const initialState ={
    userData:null,
      registeredUser: null, 
    isLoading :false,
    isSuccess:false,
    isError:false,
}



// export const login = createAsyncThunk('login', async ({param, roll}) => {
// console.log("first",param)
//     try {
//       if (!param || !roll) {
//         throw new Error("Email and Password are required.");
//       }
//       let bodyContent = JSON.stringify({
//         "phone": param, 
//         "role" : roll
//      });
  
//       //   const response = await axios.post(`${pythonUrl}/api/auths/login`, bodyContent, {
//       //       headers: { 'Content-Type': 'application/json' }
//       //   });
//       //   console.log("first" , response.data)
//       //   await setUserData(response?.data?.user)
//       // await setAccessToken(response?.data?.token)
  
//         // return response.data

//      return bodyContent
  
//     } catch (error) {
//         console.error("Error occurred during login:", error);
//         throw error; // This ensures that any calling code can catch the error appropriately.
//     }
//   });



/**
 * Login user
 */
export const login = createAsyncThunk(
  "login",
  async ({ phone, role, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Validate input fields
      if (!phone || !role || !password) {
        return rejectWithValue("Phone, role and password are required");
      }

      // 2️⃣ Call login API
      const response = await axios.post(
        `${pythonUrl}/api/user/signin`,
        {
          phone: phone,
          role: role,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 3️⃣ Save user data to local storage
      if (role === 'farmer') {
        await setUserData('farmer');
      } else {
        await setUserData(response?.data?.user?.role || role);
      }

      // 4️⃣ Save access token
      await setAccessToken(response?.data?.token);

      // 5️⃣ Return API response
      return response.data;
    } catch (error) {
      // 6️⃣ Log error for debugging
      console.log(
        "Login API error:",
        error?.response?.data || error.message
      );

      // 7️⃣ Send readable error to reducer
      return rejectWithValue(
        error?.response?.data?.message || "Login failed"
      );
    }
  }
);



  export const logOut = createAsyncThunk('logout', async () => {
    try {
      await AsyncStorage.clear();
        return null; 
    } catch (error) {
        console.error("Error occurred during logout:", error);
        throw error;
    }
  });

  export const googleLoginrout = createAsyncThunk('googleLogin', async (googleData) => {
  try {
   
    // save into AsyncStorage
    // await setUserData(googleData);
    // await setAccessToken(googleData?.token); // optional, if you have token
    console.log("ABCDEFG", googleData);
    

    return googleData; // just return what you received
  } catch (error) {
    console.error("Error occurred during Google login:", error.message);
    throw error;
  }
});


  const AuthSlice = createSlice({
    name:"authSlice",
    initialState,
reducers: {
    // ✅ STORE REGISTER DATA (MOBILE NUMBER)
    saveRegisteredUser: (state, action) => {
      state.registeredUser = action.payload;
    },

    clearRegisteredUser: (state) => {
      state.registeredUser = null;
    },

    // ✅ REGISTER USER AFTER SUCCESSFUL REGISTRATION
    register: (state, action) => {
      state.userData = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
  },
    extraReducers: builder => {
   
        // getProfile 

        builder.addCase(login.pending, (state) => {
          state.isLoading = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userData = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
        });



        builder.addCase(logOut.fulfilled, (state, action) => {
          state.userData = null;
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = false;
      });

       builder.addCase(googleLoginrout.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.userData = action.payload;
        });
      },  
})

export const {
  saveRegisteredUser,
  clearRegisteredUser,
  register,
} = AuthSlice.actions;


export default AuthSlice.reducer