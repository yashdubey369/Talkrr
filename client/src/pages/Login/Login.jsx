import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

function Login() {
  const [input, setInput] = useState({
    phonenumber:0,
    password: "",
  });
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);
    await login(input);
  }
    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding"> 
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-green-400"> Talkrr</span>
          </h1>

          <form onSubmit={handleSubmit}> 
            <div>
              <label className="label p-2">
                <span className="text-base label-text">Phone-Number</span>
              </label>
              <input
                type="number"
                placeholder="Enter PhoneNumber"
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
            <Link
              to="/signup"
              className="text-sm  hover:underline hover:text-green-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>

            <div>
              {!loading ? (
				  <button className="btn btn-block btn-sm mt-2">Login</button>
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  };
export default Login;
