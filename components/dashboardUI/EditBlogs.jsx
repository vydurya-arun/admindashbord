"use client";

import { useState, useEffect } from "react";
import {
  updateBlogs,
  getBlogsById,
} from "@/api_controller/blogsController";


const EditBlogs = ({ isOpen, onClose, onSuccess, locationId }) => {
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



  // ✅ fetch location details
  useEffect(() => {
    if (isOpen && locationId) {
      const fetchLocation = async () => {
        try {
          const data = await getBlogsById(locationId);

          setFormData({
            title: data.title || "",
            place: data.place || "",
            address: data.address || "",
            phone: data.phone || "",
            mapIframe: data.mapIframe || "",
            status: data.status,
            image: null,
          });

          if (data.imageUrl) {
            const fullImageUrl = data.imageUrl;
            setPreview(fullImageUrl);
          } else {
            setPreview(null);
          }
        } catch (err) {
          console.error("Failed to fetch location:", err.message);
          alert("Failed to fetch location data.");
        }
      };

      fetchLocation();
    }
  }, [isOpen, locationId]);

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      if (name === "state") {
        setFormData({ ...formData, state: value, district: "" }); // reset district
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

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
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          payload.append(key, formData[key]);
        }
      });

      const updatedData = await updateBlogs(locationId, payload);
      if (onSuccess) onSuccess(updatedData);

      onClose();
      setErrors({});
      window.location.reload();
    } catch (error) {
      console.error("Error updating location:", error.message);
      alert("Failed to update location. Please try again.");
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
          <h2 className="text-lg font-semibold">Edit Franchise Location</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Any edit or correction franchise location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Title */}
            <div>
              <label className="block mb-1">Title</label>
              <input
                type="text"
                name="title"
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
                value={formData.status ? "true" : "false"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value === "true",
                  })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* iFrame */}
            <div>
              <label className="block mb-1">iFrame Link</label>
              <input
                type="text"
                name="mapIframe"
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
                {loading ? "Updating..." : "Update Location"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogs;