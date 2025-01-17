import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify"

const personInfo ={
  first_name:"",
  last_name:"",
  username:"",
  email:"",
  password:"",
}



const SignUp = () => {

  const[show, setShow]= useState(false);
  const[formData, setFormData]= useState(personInfo);
  const history = useNavigate()


  const handleChange = (e)=>{
    const {name, value}= e.target;
    setFormData({ ...formData, [name]: value});
  }

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:4005/api/v1/auth/signup", formData)

      if(res.status === 201){
        localStorage.setItem("pantone", JSON.stringify(res.data))
        console.log(res.data)
        toast.success("Registration sucessful");
        history("/")
        
      }
    }catch(error){
      toast.error(
        error.response.data.message ||
        error.response.data.error ||
        error.message
      )
    }
  }


  return (
    <div className="flex justify-center items-center h-90vh bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 h-90vh m-5">
        <h2 className="text-2xl font-bold text-center text-cyan-500 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              first name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              last name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="username"
              value={formData.username}
              onChange={handleChange}
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
              <input
                className="outline-none text-black"
                type={show ? "text" : "password"}
                placeholder={show ? "password@123" : "***************"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? <FaRegEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-200"
          >
          Register
          </button>
          <p className="text-xs ">
            Already have an account?{" "}
            <Link className="text-cyan-500 hover:text-cyan-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
