import React from "react";

export default function NavButton({ active, icon, label, onClick, full }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
        ${full ? "w-full" : ""}
        ${active ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
