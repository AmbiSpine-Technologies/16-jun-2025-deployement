import { useState, useCallback } from 'react';

export const useImagePreview = () => {
  const [firstImageOrientation, setFirstImageOrientation] = useState(null);

  const detectOrientation = useCallback((width, height) => {
    if (width > height) return 'landscape';
    if (width < height) return 'portrait';
    return 'square';
  }, []);

  const handleFirstImageLoad = useCallback((e) => {
    const img = e.target;
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const orientation = detectOrientation(width, height);
    
    if (!firstImageOrientation) {
      setFirstImageOrientation(orientation);
    }
    
    return orientation;
  }, [detectOrientation, firstImageOrientation]);

  // For create post modal - consistent sizing based on first image
  const getModalImageStyle = useCallback(() => {
    const orientation = firstImageOrientation || 'square';
    
    const styles = {
      landscape: {
        width: '280px',
        height: '200px',
        objectFit: 'cover'
      },
      portrait: {
        width: '200px',
        height: '280px',
        objectFit: 'cover'
      },
      square: {
        width: '240px',
        height: '240px',
        objectFit: 'cover'
      }
    };
    
    return styles[orientation];
  }, [firstImageOrientation]);

  // For post card - different size options
  const getCardImageStyle = useCallback((orientation, size = 'medium') => {
    const styles = {
      large: {
        landscape: { width: '100%', maxWidth: '600px', height: '400px' },
        portrait: { width: '100%', maxWidth: '400px', height: '500px' },
        square: { width: '100%', maxWidth: '500px', height: '500px' }
      },
      medium: {
        landscape: { width: '100%', maxWidth: '500px', height: '300px' },
        portrait: { width: '100%', maxWidth: '300px', height: '400px' },
        square: { width: '100%', maxWidth: '400px', height: '400px' }
      },
      small: {
        landscape: { width: '100%', height: '300px' },
        portrait: { width: '100%', height: '300px' },
        square: { width: '100%', height: '250px' }
      }
    };
    
    return {
      ...styles[size][orientation],
      objectFit: 'cover'
    };
  }, []);

  const resetOrientation = useCallback(() => {
    setFirstImageOrientation(null);
  }, []);

  return {
    firstImageOrientation,
    handleFirstImageLoad,
    getModalImageStyle,
    getCardImageStyle,
    detectOrientation,
    resetOrientation
  };
};