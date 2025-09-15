import { axiosPrivate } from "@/libs/axios";


export async function getAllusers() {
  try {
    const res = await axiosPrivate.get("/auth/allusers");

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch users");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Not authorized");
  }
}
export async function userRegisterAfterLogin(payload) {
  try {
    const res = await axiosPrivate.post("/auth/admin-register",payload,{
        headers: { "Content-Type": "application/json" }
    });

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch users");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Not authorized");
  }
}
export async function deleteByIdusers(id) {
  try {
    const res = await axiosPrivate.delete(`/auth/deleteuser/${id}`);

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch users");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Not authorized");
  }
}