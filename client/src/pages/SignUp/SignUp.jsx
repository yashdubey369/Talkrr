import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js"; 

 const SignUp=() =>{
  const [input, setInput] = useState({
    name: "",
    phonenumber:0,
    password: "",
    confirmpassword: "",
  });
  const {loading,signUp}=useSignup();
  const handleSubmit=async (e)=>{
	  e.preventDefault();
	  // console.log(input);
    await signUp(input);
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-green-400"> Talkrr</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-10"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">PhoneNumber</span>
            </label>
            <input
              type="number"
              placeholder="+91 1234567890"
              className="w-full input input-bordered h-10"
              value={input.phonenumber}
              onChange={(e) =>
                setInput({ ...input, phonenumber: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
			  value={input.password}
              onChange={(e) =>
                setInput({ ...input, password: e.target.value })
			  }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
			  value={input.confirmpasswordpassword}
              onChange={(e) =>
                setInput({ ...input, confirmpassword: e.target.value })
			  }
            />
          </div>
		  {/* console.log(input); */}
          {/* <GenderCheckbox /> */}

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
