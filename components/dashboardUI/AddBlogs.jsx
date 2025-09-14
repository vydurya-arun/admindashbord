"use client";

import { useState } from "react";
import { postBlogs } from "@/api_controller/blogsController";


const AddBlogs = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    address: "",
    phone: "",
    mapIframe: "",
    status: true,
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      // reset district if state changes
      if (name === "state") {
        setFormData({ ...formData, state: value, district: "" });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };


  // validation
  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.place.trim()) newErrors.place = "Place is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.mapIframe.trim())
      newErrors.mapIframe = "iFrame link required";
    if (!formData.image) newErrors.image = "Image upload required";

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

      const data = await postLocation(payload);
      if (onSuccess) onSuccess(data);

      // reset
      setFormData({
        title: "",
        place: "",
        address: "",
        phone: "",
        mapIframe: "",
        status: true,
        image: null,
      });
      setPreview(null);
      setErrors({});
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding location:", error.message);
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
          <h2 className="text-lg font-semibold">Add New Franchise Location</h2>
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
                placeholder="e.g., Madirasi Biriyani Restaurant"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>



            {/* Place */}
            <div>
              <label className="block mb-1">Place</label>
              <input
                type="text"
                name="place"
                placeholder="e.g., Kochi"
                value={formData.place}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.place && (
                <p className="text-red-500 text-sm">{errors.place}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g., Near Railway Station"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="e.g., 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block mb-1">Status</label>
              <select
                name="status"
                value={formData.status ? "Active" : "Inactive"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value === "Active" ? true : false,
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* iFrame */}
            <div>
              <label className="block mb-1">iFrame Link</label>
              <input
                type="text"
                name="mapIframe"
                placeholder="Embed map iframe link"
                value={formData.mapIframe}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.mapIframe && (
                <p className="text-red-500 text-sm">{errors.mapIframe}</p>
              )}
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
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
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
                className="px-4 py-2 bg-[#1d0309] text-white rounded-md disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add Location"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;