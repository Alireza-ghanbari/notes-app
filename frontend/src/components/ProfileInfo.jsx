import React from "react";
import { getInitials } from "../utils/helper";

export default function ProfileInfo({ OnLogout, userInfo }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>

      <div className="">
        <p className="text-xs sm:text-sm md:text-[16px] font-medium">{userInfo?.fullName}</p>
        <button className="text-sm text-slate-700 underline hover:text-black" onClick={OnLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
