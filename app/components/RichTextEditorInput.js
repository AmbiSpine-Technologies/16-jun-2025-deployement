"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const RichTextEditorInput = ({
  value = "",
  onChange,
  placeholder,
  minWords = 0,
  maxWords = 200,
}) => {
  const [tempValue, setTempValue] = useState(value || "");
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");
  const quillRef = useRef(null);

  const countWords = (text) => {
    const cleanText = text.replace(/<[^>]*>/g, " ").trim();
    return cleanText.split(/\s+/).filter((word) => word.length > 0).length;
  };

  useEffect(() => {
    setTempValue(value);
    if (value) {
      setWordCount(countWords(value));
    }
  }, [value]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }], // Toolbar configuration is correct
    ],
  };

  const handleQuillChange = (content, delta, source, editor) => {
    const plainText = editor.getText().trim();
    const wordsArray = plainText.split(/\s+/).filter((word) => word.length > 0);
    const currentWordCount = wordsArray.length;

    setWordCount(currentWordCount);
    setTempValue(content);

    if (currentWordCount > maxWords) {
      setError(`Maximum ${maxWords} words allowed`);
    } else {
      if (error.includes("Maximum")) {
        setError("");
      }
    }

    if (onChange) {
      onChange(content);
    }
  };

  const handleFocus = () => {
    if (error.includes("Minimum")) {
      setError("");
    }
  };

  const handleBlur = () => {
    if (wordCount > 0 && wordCount < minWords) {
      setError(`Minimum ${minWords} words required`);
    }
  };

  return (
    <div className="bg-white text-gray-700 w-full">
      <div
        className={`custom-quill-container w-full rounded-2xl overflow-hidden transition-all bg-white
        ${
          error
            ? "border border-red-500 ring-1 ring-red-500"
            : "border border-[#cccccc]"
        }`}
      >
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={tempValue}
          onChange={handleQuillChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          modules={modules}
          // ✅ FIX: Added styles for Unordered (Bullets) and Ordered (Numbers) lists
          className="
            flex flex-col
            [&_.ql-toolbar]:border-b-gray-200 [&_.ql-toolbar]:bg-gray-50 [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b
            [&_.ql-container]:border-none 
            [&_.ql-editor]:min-h-[150px] 
            [&_.ql-editor]:max-h-[300px] 
            [&_.ql-editor]:overflow-y-auto 
            [&_.ql-editor]:text-base
            [&_.ql-editor]:custom-scroll

            /* 👇 Yeh lines lists ko wapas layengi 👇 */
            [&_.ql-editor_ol]:list-decimal [&_.ql-editor_ol]:pl-5 
            [&_.ql-editor_ul]:list-disc [&_.ql-editor_ul]:pl-5
          "
        />
      </div>

      <div className="flex justify-between items-center mt-1 px-1">
        <p className="text-red-500 text-xs h-4">{error}</p>
        <p
          className={`text-xs text-right font-medium ${
            wordCount > maxWords || (wordCount > 0 && wordCount < minWords && error)
              ? "text-red-600"
              : "text-gray-400"
          }`}
        >
          {wordCount} / {maxWords} words
        </p>
      </div>
    </div>
  );
};

export default RichTextEditorInput;