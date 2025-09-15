import { axiosPrivate } from "@/libs/axios";


export async function postBlogs(payload) {
  const res = await fetch('http://localhost:4010/api/blog/', {
    method: "POST",
    credentials: "include",
    body: payload, // ✅ send FormData directly
  });

  if (!res.ok) {
    throw new Error("Failed to post contact");
  }

  const { success, data } = await res.json();

  if (!success) {
    throw new Error("Contact creation failed");
  }

  return data; // 👈 return saved location object
}


// ✅ Get all blogs (Protected)
export async function getAllBlogs() {
  try {
    const res = await axiosPrivate.get("/blog");

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch blogs");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Not authorized");
  }
}


export async function deleteBlogs(locationId) {
  const res = await fetch(`${"http://localhost:4010/api/blog/"}${locationId}`, {
    method: "DELETE",
    credentials: "include", // send cookies for authentication
  });

  if (!res.ok) {
    // You can customize error based on status code
    throw new Error(res.status === 401 ? "Not authorized" : "Failed to delete location");
  }

  const { success, message } = await res.json();

  if (!success) {
    throw new Error(message || "Failed to delete location");
  }
}

export async function getBlogsById(blogId) {
  const res = await fetch(`${'http://localhost:4010/api/blog/'}${blogId}`, {
    method: "GET",
    credentials: "include", // send cookies for authentication
  });

  if (!res.ok) {
    // You can customize error based on status code
    throw new Error(res.status === 401 ? "Not authorized" : "Failed to get location by Id");
  }

  const { success, data } = await res.json();

  if (!success) {
    throw new Error("Failed to fetch contacts");
  }

  return data; // 👈 only return the array
}

export async function updateBlogs(blogId, payload) {
  const res = await fetch(`${'http://localhost:4010/api/blog/'}${blogId}`, {
    method: "PUT",          
    credentials: "include", // include cookies if any
    body: payload,          // FormData for file upload
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error || "Failed to update location");
  }

  const { success, data } = await res.json();

  if (!success) {
    throw new Error("Location update failed");
  }

  return data; // return updated location object
}

