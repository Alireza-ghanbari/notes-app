import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

export default function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div
      className="border rounded p-4 bg-white hover:shadow-lg transition-all ease-in"
    >
      <div className="flex items-center justify-between">
        <div className="w-5/6">
          <h6 className="text-sm font-medium tracking-tight xs:tracking-normal">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2 tracking-tight xs:tracking-normal">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags.map(e=> `#${e}  `)}</div>

        <div className="flex items-center gap-2 mt-3">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
}
