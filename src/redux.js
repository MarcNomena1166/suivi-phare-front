import {configureStore, createSlice}from '@reduxjs/toolkit'
const initialUserstate={
    id:'',
    email:'',
    is_admin:'',
    token:''
}
const userSlice=createSlice({
    name:"user",
    initialState:{
        id:'',
        email:'',
        is_admin:'',
        token:''
    },
    reducers:{
        onSignIn:(state,action)=>state=action.payload,
        onSignOut:(state)=>state=initialUserstate,
    }
})

 export const store=configureStore({
    reducer:{
        user:userSlice.reducer
    }
})

export const {onSignIn,onSignOut}=userSlice.actions;
