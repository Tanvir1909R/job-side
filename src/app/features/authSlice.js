import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import auth from '../../firebase/firebase.config'

const initialState = {
    email:"",
    role:"",
    isLoading:true,
    isError:false,
    error:""
}

export const createAuth = createAsyncThunk("auth/createAuth", async({email, password})=>{
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data.user.email
})
export const loginAuth = createAsyncThunk("auth/loginAuth", async({email, password})=>{
    const data = await signInWithEmailAndPassword(auth, email, password)
    return data.user.email
})

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logoutAuth:(state)=>{
            state.email = ""
        },
        setUser:(state, {payload})=>{
            state.email = payload
            state.isLoading = false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createAuth.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.error = ""
        })
        .addCase(createAuth.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.error = ""
            state.email = action.payload
        })
        .addCase(createAuth.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.error = action.error.message
            state.email = ""
        }).addCase(loginAuth.pending, (state)=>{
            state.isLoading = true
            state.isError = false
            state.error = ""
        })
        .addCase(loginAuth.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isError = false
            state.error = ""
            state.email = action.payload
        })
        .addCase(loginAuth.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.error = action.error.message
            state.email = ""
        })
    }
})

export const  { logoutAuth, setUser } = authSlice.actions

export default authSlice.reducer