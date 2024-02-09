import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "./empSlice";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage,
// }
// const persistedReducer = persistReducer(persistConfig, EmployeeReducer)




export const store = configureStore({
    reducer: EmployeeReducer
})
// export const persistor = persistStore(store)