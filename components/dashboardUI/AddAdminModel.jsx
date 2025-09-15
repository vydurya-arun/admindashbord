"use client";

import { useState } from "react";
import { userRegisterAfterLogin } from "@/api_controller/authController"; 

const AddAdminModel = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "User Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password.trim())
      newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

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

      // ✅ Prepare payload (no file upload here, so plain JSON is fine)
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      console.log(payload,'last test')

      const data = await userRegisterAfterLogin(payload); 

      if (onSuccess) onSuccess(data);

      // reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding admin:", error.message);
      alert("Failed to add admin. Please try again.");
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
          <h2 className="text-lg font-semibold">Add New Admin User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Create the details for the new Admin User.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* userName */}
            <div>
              <label className="block mb-1">User Name</label>
              <input
                type="text"
                name="username"
                placeholder="Enter user name"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            {/* email */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="e.g., example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* password */}
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* confirm password */}
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-2 pt-2">
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
              {loading ? "Adding..." : "Add Admin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModel;