import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";


const LogIn = () => {

  const[show, setShow] = useState(false)
  const[username, setUsername]= useState("")
  const[password, setPassword]= useState("")
  const[loading, setLoading]= useState(false)
  
  const history = useNavigate();

  const {state:{dispatch}} = useContext(AppContext)


  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const response = await axios.post("http://localhost:4005/api/v1/auth/login", {username, password});
      if (response.status === 201){
        localStorage.getItem("pantone", JSON.stringify(response.data));
        dispatch({type: "LOGIN", payload: response.data})
        toast.success("Login successful")
        history("/")
      
      }
    }catch(error){
      toast.error(
        error.response.data.message ||
        error.response.data.error ||
        error.message
      )
    }finally{
      setLoading(false)
    }
  }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-cyan-500 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              value={username}
              name="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e)=> setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="flex justify-between w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <input className="outline-none text-black"
                type={show ? "text" : "password"}
                placeholder={show ? "password@123" : "***************"}
                onChange={setPassword}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <FaRegEye /> : <FaEyeSlash />}
            
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-200"
            
          >
            
            Login
          </button>
          <p className="text-xs ">
            Don't have an account? Register{" "}
            <Link className="text-cyan-500 hover:text-cyan-700" to="/register">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
