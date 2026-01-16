// import InputFieldText from '../components/InputField'
import React, { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { MoveLeft, MapPin, Search, X } from 'lucide-react';
// import { InputFieldText } from "../components/InputField";
import {USERS} from "./CreatePostModal";
import { InputField } from '../components/InputField';
// import { Country, State, City } from "country-state-city";

const LOCATIONS = [
  "New Delhi, India",
  "Mumbai, India",
  "Bangalore, India",
  "Hyderabad, India",
  "Chennai, India",
  "Kolkata, India",
  "Pune, India",
  "Ahmedabad, India",
  "Jaipur, India",
  "Lucknow, India"
];

export  function CreatePostLocation({ 
  isOpen, 
  onClose, 
  onLocationSelect,
  selectedLocation 
}) {
  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState(LOCATIONS);

  useEffect(() => {
    if (locationSearchQuery.trim()) {
      const filtered = LOCATIONS.filter(loc =>
        loc.toLowerCase().includes(locationSearchQuery.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions(LOCATIONS);
    }
  }, [locationSearchQuery]);

  const handleLocationSelectClick = (location) => {
    onLocationSelect(location);
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={onClose} widthClass="!w-[700px] " >
      <div className="w-full">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <MoveLeft size={20} className="text-gray-600" />
          </button>
          <h3 className="font-bold text-lg text-gray-900">Choose a place</h3>
        </div>

        {/* Search */}
        <div className="relative">
          <InputField
            label="Search places"
            value={locationSearchQuery}
            // placeholder="Search places"
            // value={locationSearchQuery}
            onChange={(e) => setLocationSearchQuery(e.target.value)}
            // className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500"
            autoFocus
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto custom-scroll">
          {locationSuggestions.length > 0 ? (
            locationSuggestions.map((location, i) => (
              <button
                key={i}
                onClick={() => handleLocationSelectClick(location)}
                className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 border-b border-gray-200"
              >
                <MapPin size={18} className="text-gray-500" />
                <span className='text-gray-500'>{location}</span>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MapPin size={40} className="mx-auto mb-3 opacity-40" />
              No places found
            </div>
          )}
        </div>

        {selectedLocation && (
          <button
            onClick={() => onLocationSelect("")}
            className="w-full text-red-600 font-semibold mt-4 py-2"
          >
            Clear Location
          </button>
        )}
      </div>
    </Modal>
  );
}

export function TagPeopleModal({
  isOpen,
  onClose,
  USERS,
  selectedPeople,
  setSelectedPeople,
  handleAddPerson,
}) {
  const [query, setQuery] = useState("");

  // Clear search when modal opens
  useEffect(() => {
    if (isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter users

  const filteredUsers = USERS.filter(
  (user) =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.username.toLowerCase().includes(query.toLowerCase())
);
  return (
    <Modal show={isOpen} onClose={onClose} widthClass="!w-[700px] " >

      {/* Header */}
      <div className=" flex items-start gap-3 ">
         <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <MoveLeft size={20} className="text-gray-600" />
          </button>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Tag People</h2>
        </div>

      </div>
          <p className="text-sm p-1 text-gray-500">Who are you with?</p>

<div className="border-b relative border-gray-100">
  <InputField
    label="Search people"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
    <Search className=" absolute right-4 top-4 h-5 w-5 text-gray-400" />
  {/* </InputField> */}
</div>
 {/* tags people show this section  */}
  {selectedPeople.length > 0 && (
  <div className="flex flex-wrap gap-2 px-2 py-2">
    {selectedPeople.map((user) => (
      <div
        key={user.username}
        className="flex items-center gap-2  px-3 py-1 rounded-full"
      >
        <img
          src={user.avatar || "/default-user-profile.svg"}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-600">@{user.username}</span>

        <button
          onClick={() =>
            setSelectedPeople(
              selectedPeople.filter((p) => p.username !== user.username)
            )
          }
          className="text-gray-700 hover:text-red-500 hover:cursor-pointer"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}


      {/* List */}
      <div className="max-h-72 overflow-y-auto  py-2">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No people found</p>
        ) : (
          filteredUsers.map((user, index) => (

  <button
  key={index}
  onClick={() => handleAddPerson(user)}
  className={`w-full flex items-center gap-3 px-4 py-2 my-0.5 hover:bg-gray-50 transition-colors
    ${selectedPeople.some(p => p.username === user.username)
      ? "bg-[#d6faff]"
      : "bg-white"
    }
  `}
>
  <img
    src={user.avatar || "//default-user-profile.svg"}
    alt={user.username}
    className="w-9 h-9 rounded-full"
  />

  <div className="flex-1 text-left">
    <p className="font-semibold text-gray-900">{user.name}</p>
    <p className="text-sm text-gray-500">@{user.username}</p>
  </div>

  {selectedPeople.some((p) => p.username === user.username) && (
    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
      Selected
    </span>
  )}
</button>

          ))
        )}
      </div>

    </Modal>
  );
}