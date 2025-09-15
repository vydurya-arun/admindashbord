"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const SignIn = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form); // ✅ Calls login() from AuthProvider
      // Optionally redirect to dashboard
      window.location.href = "/user";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg w-[500px] flex flex-col items-center gap-9 shadow-xl mx-2"
    >
      <div className="mt-[60px]">
        <h1 className="text-2xl text-center font-bold mb-3">
          Login to Account
        </h1>
        <p className="text-center">
          Please enter your email and password to continue
        </p>
      </div>

      <div className="flex flex-col w-[80%] gap-3">
        <div className="flex flex-col">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
            className="bg-[#F1F4F9] h-10 rounded-lg outline-none px-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="* * * * * * *"
            value={form.password}
            onChange={handleChange}
            required
            className="bg-[#F1F4F9] h-10 rounded-lg outline-none px-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      <div className="flex flex-col w-[80%] mb-[60px]">
        <button
          className="h-10 bg-[#4880FF] rounded-lg text-white"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
