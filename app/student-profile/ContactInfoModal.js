"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RiCameraAiLine } from "react-icons/ri";
import { Plus, X } from "lucide-react";
import { InputWithCount } from "../components/FormInput";
import Button from "../components/Button";
import Modal from "../components/Modal";
import ContactInfoModal2 from "./ContactInfoModal2";
import { InputWithCount2 } from "../components/FormInput2";

const initialFormData = {
  name: "",
  headline: "",
  location: "",
  email: "",
  phone: [],
  socialLinks: { github: "", website: "" },
  cover: "",
  avatar: "",
};

const initialErrors = {
  name: "",
  location: "",
  phone: [],
  website: "",
  github: "",
  cover: "",
  avatar: "",
};

export default function ContactInfoModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorMode, setEditorMode] = useState("cover");
  // const [editorImage, setEditorImage] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);


  useEffect(() => {
    if (!user || !isOpen) return;

    setFormData({
      name: user?.name || "",
      headline: user?.headline || "",
      location: user?.location || "",
      email: user?.email || "",
      phone: user?.phone || [],
      socialLinks: {
        github: user?.socialLinks?.github || "",
        website: user?.socialLinks?.website || "",
      },
      cover: user?.cover || "",
      avatar: user?.avatar || "",
    });

    setErrors(prev => ({
      ...prev,
      phone: (user?.phone || []).map(() => ""),
    }));
  }, [user, isOpen]);

  const validatePhone = useCallback((value) => {
    if (!value) return false;
    const trimmed = value.trim();
    if (trimmed.startsWith("+")) {
      return trimmed.replace(/\D/g, "").length >= 10 && trimmed.replace(/\D/g, "").length <= 15;
    }
    return trimmed.replace(/\D/g, "").length === 10;
  }, []);

  const isValidWebsite = useCallback((url) => {
    if (!url) return true;
    const pattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return pattern.test(url.trim());
  }, []);

  const isValidGithub = useCallback((input) => {
    if (!input) return false;
    const pattern = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+$/;
    return pattern.test(input.trim());
  }, []);

  const updateFormField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (value.trim() && ["name", "location"].includes(field)) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  }, []);

  const handlePhoneChange = useCallback((index, value) => {
    const cleanValue = value.replace(/[^0-9+\-\s()]/g, "");
    setFormData(prev => {
      const updated = [...prev.phone];
      updated[index] = cleanValue;
      return { ...prev, phone: updated };
    });

    setErrors(prev => {
      const phoneErrs = [...prev.phone];
      phoneErrs[index] = cleanValue ? (validatePhone(cleanValue) ? "" : "Invalid phone number") : "";
      return { ...prev, phone: phoneErrs };
    });
  }, [validatePhone]);

  const addPhoneNumber = useCallback(() => {
    if (formData.phone.length >= 2) return;
    setFormData(prev => ({ ...prev, phone: [...prev.phone, ""] }));
    setErrors(prev => ({ ...prev, phone: [...prev.phone, ""] }));
  }, [formData.phone.length]);

  const handleSocialChange = useCallback((platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  }, []);

  const handleFileChange = useCallback((e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, [type]: "Please upload a valid image file." }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [type]: "File too large (max 5MB)." }));
      return;
    }

    setErrors(prev => ({ ...prev, [type]: "" }));

    const reader = new FileReader();
    reader.onload = () => {
      setEditorMode(type);
      setEditorImage(reader.result);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleEditorSave = useCallback((result) => {
    if (!result?.url) {
      setEditorOpen(false);
      setEditorImage(null);
      return;
    }
    setFormData(prev => ({ ...prev, [editorMode]: result.url }));
    setEditorOpen(false);
    setEditorImage(null);
    setErrors(prev => ({ ...prev, [editorMode]: "" }));
  }, [editorMode]);

  const removeImage = useCallback((type) => {
    setFormData(prev => ({ ...prev, [type]: "" }));
    setErrors(prev => ({ ...prev, [type]: "" }));
  }, []);

  const validateAll = useCallback(() => {
    const newErrors = { ...initialErrors };

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name is too short.";

    if (!formData.location.trim()) newErrors.location = "Location is required.";

    newErrors.phone = formData.phone.map(p =>
      p ? (validatePhone(p) ? "" : "Invalid phone number") : ""
    );

    if (formData.socialLinks.website && !isValidWebsite(formData.socialLinks.website)) {
      newErrors.website = "Enter a valid website (must start with http/https).";
    }

    if (formData.socialLinks.github && !isValidGithub(formData.socialLinks.github)) {
      newErrors.github = "Enter a valid GitHub username or URL.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).flat().some(err => err);
  }, [formData, validatePhone, isValidWebsite, isValidGithub]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!validateAll()) return;

    onSave(formData);
    onClose();
  }, [formData, validateAll, onSave, onClose]);

  const inputConfigs = useMemo(() => [
    { key: "name", placeholder: "Full Name", maxLength: 50, error: errors.name },
    { key: "headline", placeholder: "Headline", maxLength: 200 },
    { key: "location", placeholder: "Location", maxLength: 120, error: errors.location },
  ], [errors.name, errors.location]);

  if (!isOpen) return null;

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      title="Edit profile"
      widthClass="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="px-4 py-2 text-sm ">

        {/* First Name */}
        <InputWithCount2
          placeholder="First Name*"
          value={formData.firstName}
          onChange={(val) => updateFormField("firstName", val)}
          maxLength={50}
          error={errors.firstName}
          className="!bg-[#f0f0f0] !rounded-full border border-gray-200"
        />

        {/* Last Name */}
        <InputWithCount2
          placeholder="Last Name*"
          value={formData.lastName}
          onChange={(val) => updateFormField("lastName", val)}
          maxLength={50}
          error={errors.lastName}
          className="!bg-[#f0f0f0] rounded-full border border-gray-200"
        />

        {/* Verification note */}
        <p className="text-xs text-gray-500 mb-5">
          Note: You have to verify your name. In case you change your name,
          you may have to re-verify in order to keep your verification.
        </p>

        {/* Headline */}
        <InputWithCount2
          placeholder="Headline"
          value={formData.headline}
          onChange={(val) => updateFormField("headline", val)}
          maxLength={250}
          className="!bg-[#f0f0f0] rounded-full border border-gray-200"
        />

        {/* Location */}
        <InputWithCount2
          placeholder="Location"
          value={formData.location}
          onChange={(val) => updateFormField("location", val)}
          maxLength={120}
          error={errors.location}
          className="!bg-[#f0f0f0] rounded-full border border-gray-200"
        />

        {/* Website */}
        <InputWithCount2
          placeholder="Add Website"
          value={formData.socialLinks.website}
          onChange={(val) => handleSocialChange("website", val)}
          maxLength={120}
          error={errors.website}
          className="!bg-[#f0f0f0] rounded-full border border-gray-200"
        />

        {/* Custom Link Text */}
        <InputWithCount2
          placeholder="Link text (add custom link)"
          value={formData.customLinkText}
          onChange={(val) => updateFormField("customLinkText", val)}
          maxLength={60}
          className="!bg-[#f0f0f0] rounded-full border border-gray-200"
        />

        {/* Add Contact Info */}
        <button
          type="button"
          onClick={() => setContactModalOpen(true)}
          className="flex items-center justify-between w-full text-blue-600 font-medium pt-2"
        >
          Add Contact Info
          <Plus size={18} />
        </button>

        {/* Footer */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            buttonclass="px-8 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </form>
      <ContactInfoModal2
        show={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onSave={(contactData) => {
          setFormData(prev => ({
            ...prev,
            contactInfo: contactData,
          }));
        }}
      />

    </Modal>
  );
}