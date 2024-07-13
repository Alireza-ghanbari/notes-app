import React, { useState } from "react";
import { getInitials } from "../utils/helper";
import { PiSignOutThin } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

export default function ProfileInfo({ OnLogout, userInfo }) {
  const [userModal, setUserModal] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <div className="sm:w-12 sm:h-12 w-9 h-9 items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100 xs:flex hidden text-sm sm:text-lg">
        {getInitials(userInfo?.fullName)}
      </div>

      <div className="">
        <p className="text-xs sm:text-sm md:text-[16px] font-medium text-center xs:flex hidden">
          {userInfo?.fullName}
        </p>
        <button
          className="text-sm text-slate-700 underline hover:text-black hidden xs:inline-block"
          onClick={OnLogout}
        >
          Logout
        </button>
        <span className="xs:hidden flex gap-2">
          <FiUser
            size={21}
            className="cursor-pointer"
            onMouseOver={() => setUserModal(true)}
            onMouseLeave={() => setUserModal(false)}
          />
          <PiSignOutThin
            size={22}
            className="cursor-pointer"
            onClick={OnLogout}
          />
        </span>
        {/* user modal */}
        {userModal && (
          <div className="absolute top-[55px] right-6 bg-slate-100 drop-shadow-lg rounded-lg px-2 py-1">
            <p className="text-sm font-light tracking-tight">{userInfo?.fullName}</p>
            <p className="text-sm font-light tracking-tight">{userInfo?.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
