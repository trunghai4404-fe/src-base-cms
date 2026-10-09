import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    sidebarCollapsed: boolean;
}

const initialState: UIState = {
    sidebarCollapsed: false,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },
    },
})

export default uiSlice.reducer
export const { toggleSidebar } = uiSlice.actions
