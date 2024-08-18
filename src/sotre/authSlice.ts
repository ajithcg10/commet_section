import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, firestore, googleProvider } from "../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { UserProps } from "../components/help/type";

interface AuthState {
    user: UserProps  | null;
    loading: boolean;
    error: string | null;
    isverified: boolean | undefined,
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isverified: false,
    
};

export const googleSigin = createAsyncThunk('auth/googleSignIn', async (_, { rejectWithValue }) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const isverified = true
    
        const userData :UserProps = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          providerId: user.providerData[0]?.providerId,
        
          // Add more fields as needed
        };
        localStorage.setItem('user',JSON.stringify(userData));
        // Set user data in Firestore
        await setDoc(doc(firestore, "users", user.uid), userData, { merge: true });
  
        return{ userData ,isverified};
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
    } catch (err: any) {
        return rejectWithValue(err.message);
    }
});

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userVerified: (state, action: PayloadAction<boolean>) => {
                state.isverified = action.payload;
               // Update localStorage
        }
    },
    extraReducers(builder) {
        builder
            .addCase(googleSigin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleSigin.fulfilled, (state, action) => {
                state.loading = false;
                state.user  = action.payload.userData;
                state.isverified = action.payload.isverified
               
            })
            .addCase(googleSigin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});
export const { userVerified }  = UserSlice.actions;
export default UserSlice.reducer;
