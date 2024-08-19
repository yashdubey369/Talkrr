import React, { useState } from "react";
import { useAuthContext } from "../context/authContext";
import toast from "react-hot-toast";
// toast
// useState
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ phonenumber, password }) => {
    const success = handleInputErrors({ phonenumber, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phonenumber, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

const handleInputErrors = ({ phonenumber, password }) => {
  if (!phonenumber || !password) {
    toast.error("Invalid PhoneNumber or Password");
    return false;
  }
  return true;
};
