import { axiosPrivate } from "@/libs/axios";

export async function postBlogs(payload) {
  try {
    const res = await axiosPrivate.post("/blog", payload, {});

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch blogs");
    }

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error("Not authorized");
  }
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

export async function getAllBlogsInpublic() {
  try {
    const res = await axiosPrivate.get("/blog/public");

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

export async function deleteBlogs(blogId) {
  try {
    const res = await axiosPrivate.delete(`/blog/${blogId}`);
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

export async function getBlogsById(blogId) {
  try {
    const res = await axiosPrivate.get(`/blog/${blogId}`);

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

export async function updateBlogs(blogId, payload) {
  try {
    const res = await axiosPrivate.put(`/blog/${blogId}`, payload);

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
