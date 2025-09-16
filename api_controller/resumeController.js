import { axiosPrivate } from "@/libs/axios";

export async function getAllResumes() {
  try {
    const res = await axiosPrivate.get("/resume");

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch resumes");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error resumes blogs:", error);
    throw new Error(error);
  }
}

export async function deleteResumes(Id) {
  try {
    const res = await axiosPrivate.delete(`/resume/${Id}`);
    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to delete Resume");
    }

    return data; // 👈 only return the array
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error(error);
  }
}

export async function uploadResume(payload) {
  try {
    const res = await axiosPrivate.post("/resume", payload, {});

    const { success, data } = res.data;

    if (!success) {
      throw new Error("Failed to fetch resume");
    }

    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw new Error(error);
  }
}