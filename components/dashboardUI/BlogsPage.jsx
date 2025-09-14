
"use client";

import React, { useState } from "react";
import Blogs from "./Blogs";
import AddBlogs from "./AddBlogs";
import EditBlogs from "./EditBlogs";

const BlogsPage = () => {
const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // store selected ID

  // handle form submit from Add Modal
  const handleAddRoute = () => {
    setIsAddModalOpen(false);
  };

  const handleEditClick = (id) => {
    setSelectedId(id);
    setIsEditModalOpen(true); 
  };

  return (
    <div className="p-3 flex flex-col gap-5">
      {/* Header + Add Button */}
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">Create Blogs</h1>
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
      <AddBlogs
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRoute={handleAddRoute}
      />

      <EditBlogs
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blogId={selectedId} // pass the ID to EditModal
      />

      {/* Franchise list */}
      <Blogs onEditClick={handleEditClick} />
    </div>
  );
};

export default BlogsPage