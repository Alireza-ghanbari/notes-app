import React, { useState } from "react";
import { GoNote } from "react-icons/go";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ userInfo, onSearchNote, handleClearSearch }) {
  const [searchQuery, setsearchQuery] = useState("");

  const navigate = useNavigate();

  const OnLogout = async () => {
    try {
      const res = await fetch("/api/user/signout");
      const data = await res.json();

      if (data) {
        navigate("/signin");
        localStorage.clear();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };

  const OnClearSearch = () => {
    setsearchQuery("");
    handleClearSearch()
  };

  return (
    <nav className="bg-white flex items-center justify-between gap-3 xs:gap-0 px-3 sm:px-6 py-2 drop-shadow">
      <h2 className="sm:text-xl font-medium text-black py-2 items-center gap-2 hidden xs:flex">
        <span className="rotate-12 scale-90 sm:scale-100 hidden sm:inline-block">
          <GoNote size={18} />
        </span>
        <span className="inline-block xs:hidden sm:inline-block">Daily Notes</span>
        <span className="hidden xs:inline-block sm:hidden text-xl">Notes</span>
      </h2>

      <span className="flex xs:hidden">
          <GoNote size={22} />
        </span>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setsearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        OnClearSearch={OnClearSearch}
      />

      <ProfileInfo userInfo={userInfo} OnLogout={OnLogout} />
    </nav>
  );
}
