"use client";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { Plus, X } from "lucide-react";

const initialContact = {
  type: "Home",
  countryCode: "+91",
  phone: "",
  email: "",
  address: "",
  location: "",
  locationVisibility: "private",
};

export default function ContactInfoModal2({
  show,
  onClose,
  onSave,
  initialData,
}) {
  const [contact, setContact] = useState(initialContact);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) setContact(initialData);
  }, [initialData]);

  /* ---------------- VALIDATIONS ---------------- */

  const validatePhone = (num) =>
    num.replace(/\D/g, "").length === 10;

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAll = () => {
    const newErrors = {};

    if (!validatePhone(contact.phone))
      newErrors.phone = "Enter valid 10-digit number";

    if (contact.email && !validateEmail(contact.email))
      newErrors.email = "Invalid email address";

    if (contact.address.length > 250)
      newErrors.address = "Max 250 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- HANDLERS ---------------- */

  const updateField = useCallback((field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = () => {
    if (!validateAll()) return;
    onSave(contact);
    onClose();
    console.log("COntact saved", contact)
  };


  if (!show) return null;

  return (
    <Modal show={show} onClose={onClose} widthClass="max-w-xl">
      <div className="p-4 space-y-2 text-xs">

        {/* Type */}
        <select
          value={contact.type}
          onChange={(e) => updateField("type", e.target.value)}
          className="w-full !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400"
        >
          <option>Home</option>
          <option>Work</option>
        </select>

        {/* Phone */}
        <div className="flex gap-3">
          <input
            value={contact.countryCode}
            onChange={(e) => updateField("countryCode", e.target.value)}
            className="w-24 !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400"
            placeholder="+91"
          />
          <input
            value={contact.phone}
            onChange={(e) =>
              updateField("phone", e.target.value.replace(/\D/g, ""))
            }
            className="flex-1 !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400"
            placeholder="Contact Number"
          />
        </div>
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}

        {/* Email */}
        <input
          value={contact.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="Email"
          className="w-full !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400 "
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}

        {/* Address */}
        <div>
          <textarea
            value={contact.address}
            onChange={(e) => updateField("address", e.target.value)}
            maxLength={250}
            rows={4}
            placeholder="Add address"
            className="w-full !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400 resize-none"
          />
          <p className="text-xs text-gray-400 text-right">
            {contact.address.length}/250
          </p>
        </div>

        {/* Location + Visibility */}
        <div className="space-y-1">
          <input
            value={contact.location}
            onChange={(e) => updateField("location", e.target.value)}
            placeholder="Location"
            className="w-full !bg-[#f0f0f0] rounded-lg px-3 py-3 border border-gray-400"
          />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={contact.locationVisibility === "private"}
              onChange={(e) =>
                updateField(
                  "locationVisibility",
                  e.target.checked ? "private" : "public"
                )
              }
            />
            <span>Set visibility (confidential)</span>
          </div>
        </div>

        {/* Profile Link Preview */}
        <a
          href="#"
          className="text-blue-600 text-sm break-all mb-10"
        >
          www.spreadnext.com/in/yourprofile
        </a>

        {/* Add More */}
        <button
          type="button"
          className="flex items-center text-blue-600 font-medium gap-1 mt-10"
        >
          Add More <Plus size={18} />
        </button>

        {/* Footer */}
        <div className="flex border-t border-[#dedede] justify-end pt-4">
          <Button
            onClick={handleSave}
            buttonclass="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Save

          </Button>
        </div>
      </div>
    </Modal>
  );
}
