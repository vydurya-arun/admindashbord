"use client";

import { useState } from "react";
import { postBlogs } from "@/api_controller/blogsController";


const AddBlogs = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tag: "",
    date: "",
    isActive: true,
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (files) {
    setFormData({ ...formData, file: files[0] });
    setPreview(URL.createObjectURL(files[0]));
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  // validation
  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "description is required";
    if (!formData.tag.trim()) newErrors.tag = "tag is required";
    if (!formData.date) newErrors.date = "date is required";
    if (!formData.file) newErrors.file = "Image upload required";

    return newErrors;
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      const data = await postBlogs(payload);
      if (onSuccess) onSuccess(data);

      // reset
      setFormData({
        title: "",
        description: "",
        tag: "",
        date: "",
        isActive: true,
        file: null,
      });
      setPreview(null);
      setErrors({});
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding blogs:", error.message);
      alert("Failed to add location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white w-[95%] md:w-[650px] rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Blog</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Ai technology"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>



            {/* Description */}
            <div>
              <label className="block mb-1">Description</label>
              <input
                type="text"
                name="description"
                placeholder="e.g., ai is future"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* tags */}
            <div>
              <label className="block mb-1">Tags</label>
              <input
                type="text"
                name="tag"
                placeholder="e.g., News"
                value={formData.tag}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                placeholder="e.g., Date-month-year"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1">Status</label>
              <select
                name="isActive"
                value={formData.isActive ? "Active" : "Inactive"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === "Active" ? true : false,
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>


            {/* Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400"
                    >
                      <path
                        d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 15.01L9.41 16.42L11 14.84V19H13V14.84L14.59 16.43L16 15.01L12.01 11L8 15.01Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-sm">Click to upload or drag & drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG (max 5MB)</p>
                  </div>
                )}
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {errors.file && (
                <p className="text-red-500 text-sm">{errors.file}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Blogs"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;