
"use client";

import React, { useEffect, useMemo, useState,useRef } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getAllResumes,deleteResumes } from "@/api_controller/resumeController"; // adjust path
import Swal from "sweetalert2";


const Resume = () => {
  const [data, setData] = useState([]); // API data state
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  // Fetch contacts from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllResumes();
        setData(users); // assuming API returns array of objects
      } catch (err) {
        setError(err.message || "Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteResumes(id); // Call your API
        Swal.fire("Deleted!", "Location has been deleted.", "success");

        // Refetch and update the table
        const user = await getAllResumes();
        setData(user); // ✅ update state so table re-renders
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire("Error", "Failed to delete location", "error");
      }
    }
  };


  const columns = useMemo(
    () => [
      {
        header: "Si.No",
        size: 50,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "resumePdfUrl",
        header: "Resume File",
        size: 100,
        Cell: ({ row }) => (
          <a
            href={row.original.resumePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.original.title || "View Resume"}
          </a>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 100,
      },

      {
        header: "Actions",
        size: 100,
        Cell: ({ row }) => {
          const id = row.original._id; // or row.original.id (depends on your data)

          return (
            <>

              <button
                onClick={() => handleDelete(id)}
                className="p-2 rounded-md hover:bg-gray-200"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-red-500"
                >
                  <path d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z" />
                </svg>
              </button>
            </>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: { isLoading: loading },
    muiTableContainerProps: {
      sx: { maxHeight: "60vh" },
    },
    
  });

  if (error) return <p className="text-red-500">{error}</p>;

  return <MaterialReactTable table={table} />;
};

export default Resume;