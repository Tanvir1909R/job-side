import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
  user:  { email: "", role: "" },
  isLoading: true,
  isError: false,
  error: "",
};

export const createAuth = createAsyncThunk(
  "auth/createAuth",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
  }
);
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (email) => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${email}`)
      const data = await res.json();
      if(data.status){
        return data
      }else{

        return email
      }
    }
  );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutAuth: (state) => {
      state.user.email = "";
    },
    setUser: (state, { payload }) => {
      state.user.email = payload;
      state.isLoading = false;
    },
    toggleLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAuth.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(createAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(loginAuth.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        if(payload.status){
          state.user = payload.data;
        }else{
          state.user.email = payload
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      });

  },
});

export const { logoutAuth, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
