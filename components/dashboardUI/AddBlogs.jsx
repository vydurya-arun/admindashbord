"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { postBlogs } from "@/api_controller/blogsController";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, file: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.tag.trim()) newErrors.tag = "Tag is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.file) newErrors.file = "Image upload required";
    return newErrors;
  };

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
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("tag", formData.tag);
      payload.append("date", formData.date);
      payload.append("isActive", formData.isActive);
      if (formData.file) payload.append("file", formData.file);

      const data = await postBlogs(payload);
      if (onSuccess) onSuccess(data);

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
      alert("Failed to add blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white w-[95%] md:w-[90%] h-[90%] rounded-xl shadow-lg p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Blog</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-xl">&times;</button>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT SIDE: Blog Editor */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., AI Technology"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            {/* Description with ReactQuill (larger) */}
            <div className="h-[250px]">
              <label className="block mb-1">Description</label>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleDescriptionChange}
                placeholder="Write your blog content..."
                className="h-[190px] mb-2"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            {/* Tags */}
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
              {errors.tag && <p className="text-red-500 text-sm">{errors.tag}</p>}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1">Status</label>
              <select
                name="isActive"
                value={formData.isActive ? "Active" : "Inactive"}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "Active" })}
                className="w-full p-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Upload Image (no preview inside input, smaller) */}
            <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
              {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
            </div>

            {/* Buttons */}
            <div className="flex justify-center items-center gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Blog"}
              </button>
            </div>
          </form>

          {/* RIGHT SIDE: Live Preview */}
          <div className="border rounded-md p-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <p className="text-sm text-gray-500">Blog Title</p>
            <h2 className="text-xl font-bold">{formData.title || "Your Blog Title"}</h2>

            <p className="mt-2 text-sm text-gray-500">Blog Description</p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.description }}
            />

            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogs;
