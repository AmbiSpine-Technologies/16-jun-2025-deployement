"use client";
import ProfessionalTemplate from "../template/ProfessionalTemplate";
import ModernTemplate from "../template/ModernTemplate";
import ExecutiveTemplate from "../template/ExecutiveTemplate";
import CreativeTemplate from "../template/CreativeTemplate";
import ClassicTemplate from "../template/ClassicTemplate";

export default function ResumePreview({
  data,
  profileImage,
  template = "classic",
  currentFont = "inter",
  currentColor = "#2563eb",
  onImageUpdate,
}) {
  console.log("ResumePreview - Current Template:", template); // Debug log

  const templateProps = {
    data,
    profileImage,
    currentFont,
    currentColor,
    onImageUpdate,
  };

  const renderTemplate = () => {
    console.log("Rendering template:", template); // Debug log

    switch (template) {
      case "modern":
        return <ModernTemplate {...templateProps} />;
      case "executive":
        return <ExecutiveTemplate {...templateProps} />;
      case "creative":
        return <CreativeTemplate {...templateProps} />;
      case "classic":
        return <ClassicTemplate {...templateProps} />;
      case "professional":
      default:
        return <ProfessionalTemplate {...templateProps} />;
    }
  };

  return (
    <div
      className="overflow-y-auto custom-scroll w-full max-w-3xl rounded-xl"
      style={{ maxHeight: "90vh" }}
    >
      {renderTemplate()}
    </div>
  );
}
