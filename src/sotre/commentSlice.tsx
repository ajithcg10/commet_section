import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../components/help/type";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

interface CommentData {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentData = {
  comments: [], // Initialize as an empty array
  loading: false,
  error: null,
};

export const addComment = createAsyncThunk(
  "comments/addComment", // Renamed for clarity
  async (data: Comment, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(firestore, "Comments"), data);
      return data; // Return data for use in fulfilled case
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.loading = false;
          state.comments.push(action.payload);
        }
      )
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
