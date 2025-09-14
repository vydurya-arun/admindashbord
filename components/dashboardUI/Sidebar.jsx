"use client";

import { sidebarConstants } from "@/constants/sidebarConstants";
import { LogOut, Settings, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ closeSidebar }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col items-center w-full gap-5">
        {/* Logo + Close Button */}
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl text-blue-500 font-bold">
            HIMSREE<span className="text-gray-600">HARI</span>
          </p>
          <button
            onClick={closeSidebar}
            className="rounded-full bg-gray-200 p-2"
          >
            <X />
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col w-full gap-3">
          {sidebarConstants.map((item) => {
            const isActive = pathname === item.link;

            return (
              <Link key={item.id} href={item.link} onClick={closeSidebar}>
                <li
                  className={`flex justify-start items-center gap-2 h-10 px-2 py-1 rounded-lg 
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:text-white hover:bg-blue-500"
                  }`}
                >
                  <item.icon
                    className={`w-7 h-7 ${
                      isActive ? "text-white" : "text-blue-500"
                    }`}
                  />
                  <p>{item.title}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Settings Link */}
      {/* <div className="w-full ">
        {(() => {
          const isActive = pathname === "/settings";
          return (
            <Link href="/settings" onClick={closeSidebar}>
              <div
                className={`flex justify-start items-center gap-2 h-10 px-2 py-1 rounded-lg 
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-500 hover:text-white"
                }`}
              >
                <Settings
                  className={`w-7 h-7 ${
                    isActive ? "text-white" : "text-blue-500"
                  }`}
                />
                <p>Settings</p>
              </div>
            </Link>
          );
        })()}
      </div> */}

      <div className="w-full">
        <button className="group flex justify-start items-center gap-2 h-10 px-2 py-1 rounded-lg hover:bg-blue-500 hover:text-white w-full">
         <LogOut className="w-7 h-7 text-red-500 group-hover:text-white"/>
         <p className="group-hover:text-white">Logout</p>
        </button>

      </div>
    </>
  );
};

export default Sidebar;
