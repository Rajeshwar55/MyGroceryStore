import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
  const navigate = useNavigate();
  const { isSeller, setIsSeller } = useAppContext();
  const[email,setEmail]=useState('');
  const[password,setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // After successful login
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 p-12 min-w-[300px] rounded-lg shadow-xl border border-gray-200">
        <p className="text-xl font-medium text-primary text-center">
          Seller Login
        </p>

        <div className="w-full">
          <input
          onChange={(e)=>setEmail(e.target.value) } value={email}
            type="email"
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        <div className="w-full">
          <input
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white rounded w-full p-2 mt-2"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;