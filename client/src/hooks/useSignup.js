import React,{useState} from 'react'

import toast from 'react-hot-toast'
import { json } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const { setAuthUser } = useAuthContext();

    const signUp=async ({name,phonenumber, password,confirmpassword})=>{
        const success=handleInputErrors({name,phonenumber, password,confirmpassword})
        if(!success) return;
        setLoading(true);
        try {
            const res=await fetch("/api/user/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({name,phonenumber, password,confirmpassword})
            })

            const data=await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            // console.log(data);
            
            localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
            // console.log(data);
            
        } catch (error) {
            toast.error(error.message)   
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,signUp};
}

export default useSignup;


function handleInputErrors({name,phonenumber, password,confirmpassword}){
        if(!name||!phonenumber||!password||!confirmpassword) {
            toast.error('Please fill in all fields');
            return false;
        }
        if(password!==confirmpassword){
            toast.error('Password do not match')
            return false;
        }
        if(password.length<6){
            toast.error('Password must be atleast 6 characters')
        }
        return true;

}  