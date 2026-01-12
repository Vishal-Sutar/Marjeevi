import AsyncStorage from "@react-native-async-storage/async-storage";


export const getAccessToken = async () => {
    const Token = await AsyncStorage.getItem("accessToken");
    return JSON.parse(Token);
  };
  
  export const setAccessToken = async (Token) => {
    await AsyncStorage.setItem("accessToken", JSON.stringify(Token));
  };


  export const setUserData = async (user) => {
    await AsyncStorage.setItem("userData" , JSON.stringify(user))
  }
  
  export const getUserData = async () => {
    const user = await AsyncStorage.getItem("userData");
    return JSON.parse(user);
  };