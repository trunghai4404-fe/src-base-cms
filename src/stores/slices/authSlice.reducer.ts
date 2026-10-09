import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
    isActive: boolean;
    sex: boolean | null;
    lastLoginAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    isDeleted: boolean;
    deletedAt: Date | null;
    roles: string[];
    permissions: string[];
}

interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
        }
    }
})

export const { setLoading, setUser, logout } = authSlice.actions;

export default authSlice.reducer
