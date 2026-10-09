import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "@/stores/slices/UiSlice.reducer"
import authReducer from "@/stores/slices/authSlice.reducer"

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
