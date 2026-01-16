
"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { InputWithCount } from "../components/FormInput";
import MonthYearSelect from "../components/MonthYearSelect";
import MediaUpload from "../components/MediaUpload";
import { useDispatch } from "react-redux";
import { updateSection } from "../store/userSlice";
import { v4 as uuid } from "uuid";

const CertificationForm = forwardRef(({ initialData = null, onSave, onCancel }, ref) => {
  const dispatch = useDispatch();

  const empty = {
    id: null,
    name: "",
    certificateId: "",
    provider: "",
    issueDate: { month: "", year: "" },
    expiryDate: { month: "", year: "" },
    credentialUrl: "",
    media: null,
  };

  const [formData, setFormData] = useState(initialData || empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initialData || empty);
    setErrors({});
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    submit: () => handleSubmit(),
    reset: () => setFormData(initialData || empty),
  }));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleDateChange = (field, { type, value }) => {
    setFormData((prev) => ({ ...prev, [field]: { ...prev[field], [type]: value } }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Certification name is required.";
    if (!formData.certificateId.trim()) e.certificateId = "Certificate ID is required.";
    if (!formData.issueDate.month || !formData.issueDate.year) e.issueDate = "Issue date is required.";

    const sYear = parseInt(formData.issueDate.year || "0", 10);
    const eYear = parseInt(formData.expiryDate.year || "0", 10);
    if (formData.expiryDate.year && eYear < sYear) e.expiryDate = "Expiry cannot be before issue date.";

    return e;
  };

  const handleSubmit = (ev) => {
    ev?.preventDefault?.();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const dataToSave = {
      ...formData,
      media:
        formData.media instanceof File
          ? URL.createObjectURL(formData.media) // preview URL
          : formData.media,
    };


    dispatch(
      updateSection({
        section: "certifications",
        action: initialData?.id ? "update" : "add",
        id: initialData?.id,
        data: dataToSave,
      })
    );

    setFormData(empty);
    setErrors({});
    onSave?.(dataToSave);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="px-4 py-3 space-y-3">
        <InputWithCount
          label="Certification / Course Name *"
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
          maxLength={150}
          error={errors.name}
        />
        <InputWithCount
          label="Certificate ID *"
          value={formData.certificateId}
          onChange={(val) => handleChange("certificateId", val)}
          maxLength={60}
          error={errors.certificateId}
        />
        <InputWithCount
          label="Provider"
          value={formData.provider}
          onChange={(val) => handleChange("provider", val)}
        />
        <MonthYearSelect label="Issue Date *" value={formData.issueDate} onChange={(val) => handleDateChange("issueDate", val)} />
        {errors.issueDate && <p className="text-red-500 text-sm">{errors.issueDate}</p>}
        <MonthYearSelect label="Expiry Date" value={formData.expiryDate} onChange={(val) => handleDateChange("expiryDate", val)} />
        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
        <InputWithCount label="Credential URL" value={formData.credentialUrl} onChange={(val) => handleChange("credentialUrl", val)} />
        <MediaUpload label="Upload Certificate" accept="image/*" maxSizeMB={2} initialFile={formData.media} onFileSelect={(file) => setFormData((p) => ({ ...p, media: file }))} />
      </div>

      <div className="sticky bottom-0 bg-[#ffffff] py-3 border-t border-gray-600 flex justify-end gap-2 px-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-full bg-gray-600 text-white">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded-full bg-blue-600 text-white">Save</button>
      </div>
    </form>
  );
});

export default CertificationForm;

