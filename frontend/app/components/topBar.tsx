import React from "react";

const TopBar = () => {
  return (
    <main className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600">URL Shortener</h1>
      <div className="space-x-4">
        <button className=" px-4 py-2 rounded cursor-pointer">Login</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer shadow-md hover:bg-blue-600">
          Sign Up
        </button>
      </div>
    </main>
  );
};

export default TopBar;
