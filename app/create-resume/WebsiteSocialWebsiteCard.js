"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { InputWithCount } from "../components/FormInput";
import SelectField from "../components/FormSelect";
import { validateUrl } from "../utils/validation";

export default function WebsiteSocialWebsiteCard({ value = {}, onChange, onRemove }) {
  const [selectedPlatform, setSelectedPlatform] = useState(value.platform || "Portfolio");
  const [customName, setCustomName] = useState(value.customName || "");
  const [url, setUrl] = useState(value.url || "");
  const [urlError, setUrlError] = useState("");

  const platforms = [
    { label: "Portfolio", value: "Portfolio" },
    { label: "LinkedIn Profile", value: "LinkedIn" },
    { label: "Twitter", value: "Twitter" },
    { label: "GitHub", value: "GitHub" },
    { label: "Other", value: "Other" },
  ];

  const handlePlatformChange = (e) => {
    const val = e.target.value;
    setSelectedPlatform(val);
    if (val !== "Other") setCustomName("");
    onChange?.({ platform: val, customName: val === "Other" ? customName : "", url });
  };

  const handleCustomNameChange = (val) => {
    setCustomName(val);
    onChange?.({ platform: selectedPlatform, customName: val, url });
  };

  const handleUrlChange = (val) => {
    setUrl(val);
    const error = validateUrl(val);
    setUrlError(error);
    onChange?.({ platform: selectedPlatform, customName, url: val });
  };

  return (
    <div className=" bg-white space-y-2 relative">
      <button
        onClick={onRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-400 p-2 rounded-lg"
      >
        <FiTrash2 />
      </button>

      <SelectField
        label="Select Platform"
        value={selectedPlatform}
        onChange={handlePlatformChange}
        options={platforms}
      />

      {selectedPlatform === "Other" && (
        <InputWithCount
          label="Custom Platform Name *"
          value={customName}
          onChange={handleCustomNameChange}
          maxLength={50}
          placeholder="e.g., GitHub, Behance"
        />
      )}

      <InputWithCount
        label="Profile URL"
        value={url}
        onChange={handleUrlChange}
        maxLength={200}
        placeholder="https://your-profile.com"
        error={urlError}
      />
    </div>
  );
}