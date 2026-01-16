"use client"
import { Plus, ChevronLeft, Bookmark, Briefcase, FileText } from "lucide-react";
import { useState } from "react";
import { Button2 } from "../components/button/Button2";
import Button, { Buttonborder } from "../components/Button";
export default function CollectionMenu({ collections, onSave, onCreate, close }) {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState("");

  const systemOptions = [
    { id: "system_saved", name: "Saved", icon: <Bookmark size={16} /> },
    { id: "system_jobs", name: "Jobs", icon: <Briefcase size={16} /> },
    { id: "system_post", name: "Post", icon: <FileText size={16} /> },
  ];

  return (
    <div className="bg-white w-full max-h-[300px] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b sticky top-0 bg-[#fff] border-[#cccccc] flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCreating && (
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Stop closing
                setIsCreating(false);
              }} 
              className="hover:bg-gray-100 hover:cursor-pointer p-1 rounded-full"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <span className="font-bold text-sm">
            {isCreating ? "New List" : "Save to..."}
          </span>
        </div>
        <button onClick={close} className="text-gray-400 hover:cursor-pointer hover:text-gray-600 text-xs">Close</button>
      </div>

      {!isCreating ? (
        <div className="p-2">
          {/* Quick Options */}
          {systemOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSave(opt.id)}
              className="w-full text-left p-3 hover:cursor-pointer hover:bg-blue-50 text-gray-700 rounded-xl flex items-center gap-3 transition-all group"
            >
              <div className="text-gray-400 group-hover:text-blue-600">{opt.icon}</div>
              <span className="text-sm font-medium">{opt.name}</span>
            </button>
          ))}

          <div className="border-t border-gray-50 my-2"></div>

          {/* User Collections */}
          <div className="max-h-48 overflow-y-auto custom-scroll px-1">
             {collections?.length > 0 && (
               <p className="text-[10px] font-bold text-gray-400 px-2 mb-1">YOUR LISTS</p>
             )}
            {collections?.map((folder) => (
              <button
                key={folder.id}
                onClick={() => onSave(folder.id)}
                className="w-full text-left p-3 hover:cursor-pointer hover:bg-gray-50 rounded-xl flex justify-between items-center"
              >
                <span className="text-sm">{folder.name}</span>
                <Plus size={14} className="text-gray-300" />
              </button>
            ))}
          </div>

          {/* This button triggers the Input view WITHOUT closing the modal */}
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setIsCreating(true);
            }}
            className="w-full sticky bottom-0 bg-[#fff] text-left p-4 mt-2 text-blue-600 font-bold text-sm border-t border-gray-100 flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus size={18} /> Create new List
          </button>
        </div>
      ) : (
        /* Create New View */
        <div className="p-4 space-y-2 animate-in slide-in-from-right-2 duration-200">
          <div>
            <label className="text-xs font-bold text-gray-500 ml-1 mb-4">List NAME</label>
            <input
              autoFocus
              className="w-full border border-gray-400 rounded-xl px-4  py-1.5 mt-4 text-sm outline-none focus:none ring-blue-500 transition-all"
              placeholder="e.g. Dream Companies"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter' && newName.trim()) onCreate(newName);
              }}
            />
          </div>
          <div className="flex justify-end gap-2">

            <Button 
             disabled={!newName.trim()}
             onClick={() => onCreate(newName)}
             >
              Create & Save
            </Button>

          </div>
        </div>
      )}
    </div>
  );
}