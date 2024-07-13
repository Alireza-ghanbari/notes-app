import React from "react";

export default function EmptyCard({ message }) {
  return (
    <div className="flex flex-col
     items-center justify-center mt-20">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHqTwFcNu_QA4eJSSFJLCh2Y2B3XE05_xCBw&s"
        alt="image"
        className="w-64"
      />

      <p className="md:w-1/2 w-full px-4  text-md font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
}
