import axios from "axios";
import React from 'react';
import { useSelector,useDispatch } from "react-redux";
import { onSignIn } from "../redux";

const AuthService = () => {
    const dispatch = useDispatch();
    const  user = useSelector((state) => state.user);
     const login= async (email,mdp)=>{
        try{
           
        const response=await  axios({
            method: 'post',
            url: 'http://localhost:5000/api/users/login',
            headers: {}, 
            data: {
                email: email,
                mdp:mdp 
            }
          });
          console.log(response);
     //     console.log(response.data.user_connected);
            if(response.status===201){

               const newUser={
                id:response.data.user_connected.id,
                email:response.data.user_connected.email,
                is_admin:response.data.user_connected.is_admin,
                token:response.data.token
               }
               dispatch(onSignIn(newUser))

          //    console.log(newUser);
            
                return{
                    status:"success",
                    message:""
                }
            }
           
        }catch(error){
            console.log(error)
            return {
                status:"error",
                message:JSON.stringify(error)
            }
        }
        
    }

    return{ login}
};

export default AuthService;
