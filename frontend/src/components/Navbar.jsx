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
    <nav className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2 flex items-center gap-2">
        <span className="rotate-12">
          <GoNote size={18} />
        </span>
        Daily Notes
      </h2>

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
