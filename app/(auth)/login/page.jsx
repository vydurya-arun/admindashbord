import React from "react";

const page = () => {
  return (
    <div className="sign-bg w-screen h-dvh flex justify-center items-center">
      <form className="bg-white rounded-lg w-[500px] flex flex-col items-center gap-9 shadow-xl mx-2">
        <div className="mt-[60px]">
          <h1 className="text-2xl text-center font-bold mb-3">Login to Account</h1>
          <p className="text-center">
            Please enter your email and password to continue
          </p>
        </div>
        <div className="flex flex-col w-[80%] gap-3">
          <div className="flex flex-col">
            <label>Email address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              required
              autoComplete="off"
              className="bg-[#F1F4F9] h-10 rounded-lg outline-none px-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <p>error</p>
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              placeholder="* * * * * * *"
              required
              className="bg-[#F1F4F9] h-10 rounded-lg outline-none px-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <p>error</p>
          </div>
        </div>
        <div className="flex flex-col w-[80%] mb-[60px]">
          <button className="h-10 bg-[#4880FF] rounded-lg text-white">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default page;
