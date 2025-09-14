


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

// ✅ Get locationDetails (Protected)
export async function getAllBlogs() {
  const res = await fetch('http://localhost:4010/api/blog/', {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authorized");
  }

  // wait for json
  const { success, data } = await res.json();

  if (!success) {
    throw new Error("Failed to fetch contacts");
  }

  return data; // 👈 only return the array
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

export async function getBlogsById(locationId) {
  const res = await fetch(`${'http://localhost:4010/api/blog/'}${locationId}`, {
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

export async function updateBlogs(id, payload) {
  const res = await fetch(`${'http://localhost:4010/api/blog/'}${id}`, {
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

