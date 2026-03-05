import React, { useState } from "react";
import axios from 'axios'
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
const [email , setEmail] = useState('')
const [password , setpassword] = useState('')
    const onSubmitHandler = async(e) =>{
        try {
           e.preventDefault();
           const response = await axios.post(backendUrl + '/api/user/admin' , {email , password})
           if(response.data.success){
            setToken(response.data.token)
           }
           else{
            toast.error(response.data.message)
           }
            
        } catch (error) {
            console.log(error); 
            toast.error(error.message) 
        }
    }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm">

        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Admin Panel
        </h1>

        <form  onSubmit={onSubmitHandler} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email Address</label>
            <input
            onChange={(e)=>setEmail(e.target.value)} value={email}
              type="email"
              placeholder="your@email.com"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password</label>
            <input
            onChange={(e)=>setpassword(e.target.value)} value={password}
              type="password"
              placeholder="Enter password"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg mt-2 transition duration-200 shadow-sm"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
