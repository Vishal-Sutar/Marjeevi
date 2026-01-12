import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'




const reducers = combineReducers({
    
    auth:AuthSlice,
    // Product:productSlice
  })


  const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    whitelist : ['auth' , ]
  }
  
  const persistedReducer = persistReducer(persistConfig, reducers)
  
   const store = configureStore({
    reducer: persistedReducer , 
    middleware : getDefaultMiddleware => 
      getDefaultMiddleware({serializableCheck : false})
    }
  )
  
  const persistor = persistStore(store);
  
  export {store , persistor }