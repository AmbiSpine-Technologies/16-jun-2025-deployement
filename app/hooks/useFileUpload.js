// hooks/useFileUpload.js
import { useState } from 'react';

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      throw new Error('Please select a file');
    }

    if (!validTypes.includes(file.type) && 
        !validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      throw new Error('Please upload a PDF, DOC, DOCX, or TXT file');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    return true;
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setError(null);

      validateFile(file);

      const { FileParserService } = await import('../utils/FileParserService');
      const parsedData = await FileParserService.parseFile(file);

      // Store in localStorage for resume builder
      if (typeof window !== 'undefined') {
        localStorage.setItem('uploadedResumeData', JSON.stringify({
          ...parsedData,
          metadata: {
            fileName: file.name,
            fileSize: file.size,
            uploadedAt: new Date().toISOString()
          }
        }));
      }

      return parsedData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadFile,
    uploading,
    error,
    clearError: () => setError(null)
  };
};