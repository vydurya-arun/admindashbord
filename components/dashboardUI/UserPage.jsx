"use client";

import { useState } from "react";
import Users from "./Users";
import AddAdminModel from "./AddAdminModel";

const UserPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  // handle form submit from Add Modal
  const handleAddRoute = () => {
    setIsAddModalOpen(false);
  };


  return (
    <div className="p-3 flex flex-col gap-5">
      {/* Header + Add Button */}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-lg md:text-3xl font-bold">Admin User Details</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white font-semibold text-lg px-4 py-1 rounded-md flex gap-2 items-center cursor-pointer"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white"
          >
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          <p>Add</p>
        </button>
      </div>

      {/* Modals */}
      <AddAdminModel
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRoute={handleAddRoute}
      />



      {/* <Franchise onEditClick={handleEditClick} /> */}
      <Users />
    </div>
  );
};

export default UserPage;