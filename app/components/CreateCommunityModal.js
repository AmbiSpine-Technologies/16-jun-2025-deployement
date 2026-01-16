"use client";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { createCommunity, getInviteLink } from "../utils/communityService";
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_VISIBILITY,
} from "../constents/constents";
import { InputWithCount } from "./FormInput";
import { Buttonborder } from "./Button";
import TextAreaField from "./TextAreaField";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import {
  createCommunitySuccess,
  setCurrentCommunity,
} from "../store/communitySlice";
import { createPortal } from "react-dom";

const CreateCommunityModal = ({ isOpen, onClose, onCommunityCreated }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: "",
    category: "",
    visibility: "Public",
    type: "public",
    bannerImage: null,
    community_image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdCommunity, setCreatedCommunity] = useState(null);
  const [showInviteSection, setShowInviteSection] = useState(false);
  const [bannerPreview, setBannerPreview] = useState("");
  const [iconPreview, setIconPreview] = useState("");
  const { currentUser } = useSelector((state) => state.users);

  const bannerInputRef = useRef(null);
  const iconInputRef = useRef(null);

  const visibilityInfo = {
    Public: "Anyone can see the community and its posts",
    Private: "Only members can see the posts, approval needed to join",
    Restricted: "Visible to all but only approved users can post or interact",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: "",
        rules: "",
        category: "",
        visibility: "Public",
        type: "public",
        bannerImage: null,
        community_image: null,
      });
      setCreatedCommunity(null);
      setShowInviteSection(false);
      setError("");
      setBannerPreview("");
      setIconPreview("");
    }
  }, [isOpen]);

  // Image Upload Handlers
  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({ ...prev, bannerImage: file }));

      const reader = new FileReader();
      reader.onload = (e) => setBannerPreview(e.target.result);
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("Icon size should be less than 2MB");
        return;
      }

      setFormData((prev) => ({ ...prev, community_image: file }));

      const reader = new FileReader();
      reader.onload = (e) => setIconPreview(e.target.result);
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const triggerBannerUpload = () => {
    bannerInputRef.current?.click();
  };

  const triggerIconUpload = () => {
    iconInputRef.current?.click();
  };

  const removeBanner = () => {
    setFormData((prev) => ({ ...prev, bannerImage: null }));
    setBannerPreview("");
    if (bannerInputRef.current) {
      bannerInputRef.current.value = "";
    }
  };

  const removeIcon = () => {
    setFormData((prev) => ({ ...prev, community_image: null }));
    setIconPreview("");
    if (iconInputRef.current) {
      iconInputRef.current.value = "";
    }
  };

  // Form Validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Community name is required";
    }
    if (formData.name.trim().length < 3) {
      return "Community name must be at least 3 characters";
    }
    if (!formData.category) {
      return "Please select a category";
    }
    // if (!formData.community_image) {
    //   return "Community icon is required";
    // }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!currentUser) {
      setError("Please login to create community");
      return;
    }

    setIsLoading(true);
    try {
      // Create FormData object
      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      submitData.append("description", formData.description);
      submitData.append("rules", formData.rules);
      submitData.append("category", formData.category);
      submitData.append("visibility", formData.visibility);
      submitData.append("type", formData.type);
      submitData.append("createdBy", currentUser.id);
      submitData.append("createdByName", currentUser.name || currentUser.email);
      submitData.append("creatorAvatar", currentUser.avatar);

      if (formData.bannerImage) {
        submitData.append("bannerImage", formData.bannerImage);
      }
      if (formData.community_image) {
        submitData.append("community_image", formData.community_image);
      }

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of submitData.entries()) {
        console.log(key + ": ", value);
      }

      const result = await createCommunity(submitData);

      console.log("API Response:", result);

      if (result.success) {
        const newCommunity = result.data;
        setCreatedCommunity(newCommunity);

        // Redux store mein community set karo
        dispatch(createCommunitySuccess(newCommunity));
        dispatch(setCurrentCommunity(newCommunity));

        onCommunityCreated?.(newCommunity);

        // Success message and close modal
        setTimeout(() => {
          onClose();
          router.push(`/community/${newCommunity.id}`);
        }, 1000);
      } else {
        setError(result.error || "Failed to create community");
      }
    } catch (error) {
      console.error("Error creating community:", error);
      setError("Error creating community");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const copyInviteLink = () => {
    if (createdCommunity) {
      const inviteLink = getInviteLink(createdCommunity.id);
      navigator.clipboard.writeText(inviteLink);
      alert("Invite link copied to clipboard!");
    }
  };

  const handleFinish = () => {
    onClose();
    if (createdCommunity) {
      router.push(`/community/${createdCommunity.id}`);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-white z-40 relative rounded-xl p-6 border mt-5 border-[#D1D9E6] w-[600px] max-w-full mx-4 max-h-[90vh] overflow-y-auto custom-scroll shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">
            {showInviteSection ? "Invite Members" : "Create Community"}
          </h2>
          <button
            onClick={handleFinish}
            className="text-gray-500 hover:text-gray-700 text-xl"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {/* Cover Image + Preview with Upload Option */}
        <div className="relative">
          {bannerPreview ? (
            <div className="w-full h-24 overflow-visible bg-gray-200 rounded-md relative group">
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={removeBanner}
                  className="opacity-0 group-hover:opacity-100 bg-[#585858c1] hover:cursor-pointer text-white px-1 py-0.5 rounded-md text-sm transition-opacity"
                >
                  <RxCross1 />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <button
                type="button"
                onClick={triggerBannerUpload}
                className="flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">Upload Banner</span>
              </button>
            </div>
          )}
          <input
            type="file"
            ref={bannerInputRef}
            onChange={handleBannerUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Community Icon */}
          <div className="absolute w-[70px] h-[70px] bg-gray-300 border-2 border-white rounded-md bottom-[-30px] left-6 z-20 shadow-md group">
            {iconPreview ? (
              <>
                <img
                  src={iconPreview}
                  alt="Icon preview"
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-opacity-0 rounded-md flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeIcon}
                    className="opacity-0 group-hover:opacity-100 hover:cursor-pointer text-white px-2 py-1 rounded text-xs transition-opacity"
                  >
                    <RxCross1 />
                  </button>
                </div>
              </>
            ) : (
              <button
                type="button"
                onClick={triggerIconUpload}
                className="w-full h-full flex items-center justify-center text-gray-500 hover:text-gray-700 rounded-md"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            )}
            <input
              type="file"
              ref={iconInputRef}
              onChange={handleIconUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-10">
          {/* Community Name */}
          <InputWithCount
            label="Community Name"
            InputWithCountClass="!border-[#58656B]"
            value={formData.name}
            onChange={(value) => handleChange("name", value)}
            placeholder="Enter community name"
            required
            disabled={isLoading}
            maxLength={50}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Description
            </label>
            <TextAreaField
              value={formData.description}
              onChange={(value) => handleChange("description", value)}
              placeholder="Write something about your community..."
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category *
            </label>
            <div className="space-y-2">
              {["Students", "College", "Recruiter", "Professional"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      className="custom-radio"
                      value={item}
                      checked={formData.category === item}
                      onChange={(e) => handleChange("category", e.target.value)}
                      required
                    />
                    <span className="text-gray-600 text-sm font-medium">
                      {item}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Visibility */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Visibility Settings
            </label>
            <div className="space-y-3">
              {["Public", "Private", "Restricted"].map((item) => (
                <label
                  key={item}
                  className="flex gap-3 cursor-pointer items-center"
                >
                  <input
                    type="radio"
                    name="visibility"
                    className="custom-radio mt-1"
                    value={item}
                    checked={formData.visibility === item}
                    onChange={(e) => handleChange("visibility", e.target.value)}
                  />
                  <div>
                    <span className="text-gray-800 text-sm font-medium">
                      {item}
                    </span>
                    <p className="text-gray-500 text-xs leading-tight">
                      {visibilityInfo[item]}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-gray-600 border-2 border-blue-700 rounded-full hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>

            <Buttonborder
              type="submit"
              disabled={
                isLoading || !formData.name.trim() || !formData.category
              }
              name={isLoading ? "Creating..." : "Create Community"}
            />
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateCommunityModal;
