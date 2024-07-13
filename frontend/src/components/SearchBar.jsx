import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function SearchBar({
  value,
  onChange,
  handleSearch,
  OnClearSearch,
}) {
  return (
    <div className="md:w-80 flex items-center w-32 px-2 sm:w-48 sm:px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-[13px] bg-transparent py-[11px] outline-none text-xs xs:text-[13px]"
        value={value}
        onChange={onChange}
        onKeyUp={handleSearch}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={OnClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
}
