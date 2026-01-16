"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
// import { Download, Minus, Plus, RotateCcw, RotateCw } from "lucide-react";
import "./ImageEditor.css"
import getCroppedImageBlobUrl from "../utils/cropImage";

import {
  Crop,
  Filter,
  SlidersHorizontal,
  Download,
  Upload,
  Square,
  RectangleVertical,
  RectangleHorizontal,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
  RefreshCw,
  ImageIcon,
  Scan,
} from "lucide-react";
import { Button2 } from "../components/button/Button2";

// lazy load
const Cropper = dynamic(() => import("react-easy-crop"), { ssr: false });


const aspectPresets = [
  { key: "square", label: "1:1", icon: Square, aspect: 1, ratioKey: "square" },
  {
    key: "portrait",
    label: "3:4",
    icon: RectangleVertical,
    aspect: 3 / 4,
    ratioKey: "portrait",
  },
  {
    key: "landscape",
    label: "16:9",
    icon: RectangleHorizontal,
    aspect: 16 / 9,
    ratioKey: "landscape",
  },
  {
    key: "ultrawide",
    label: "3:1",
    icon: Scan,
    aspect: 3 / 1,
    ratioKey: "landscape",
  },
];

const aspectPresetslandscap = [

  {
    key: "landscape",
    label: "16:9",
    icon: RectangleHorizontal,
    aspect: 16 / 9,
    ratioKey: "landscape",
  },
  {
    key: "ultrawide",
    label: "3:1",
    icon: Scan,
    aspect: 3 / 1,
    ratioKey: "landscape",
  },
];


// const ImageEditor = forwardRef(({ initialImage = null, mode = "cover", activeTool, onToolChange}, ref) => {
//   const COVER_WIDTH = 1584;
//   const COVER_HEIGHT = 396;
//   const AVTAR_WIDTH = 300
//   const AVTAR_HEIGHT = 300
//  const isAvatar = mode === "avatar";
//   const COVER_ASPECT = COVER_WIDTH / COVER_HEIGHT;
//   const aspect = isAvatar ? 1 : (1584 / 396);

//   const [originalImage, setOriginalImage] = useState(initialImage);
 
//   // Crop State
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedPixels, setCroppedPixels] = useState(null);

//   // Filter/Adjust State
//   const [brightness, setBrightness] = useState(100);
//   const [contrast, setContrast] = useState(100);
//   const [saturation, setSaturation] = useState(100);
//   const [grayscale, setGrayscale] = useState(0);

//   useEffect(() => {
//     setOriginalImage(initialImage);
//     // Reset edits when a new image loads implies a hard reset
//     // But if we are just switching modes, we keep state.
//   }, [initialImage]);

//   useEffect(() => {
    
//   // Jab bhi image change ho ya mode (Avatar/Cover) badle, tab reset karein
//   setCrop({ x: 0, y: 0 });
//   setZoom(1);
//   // Agar aap filters use kar rahe hain, toh unhe bhi reset karna behtar hai
//   // setBrightness(100); 
// }, [originalImage, isAvatar]);

//   // 🔥 Create the CSS Filter String
//   const filterString = useMemo(
//     () => `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`,
//     [brightness, contrast, saturation, grayscale]
//   );

//   useImperativeHandle(ref, () => ({
//     async exportImage() {
//       // Logic: If user was in crop mode, we crop. If filter, we filter.
//       // But actually, we usually want to apply EVERYTHING visible.
//       return await getCroppedImageBlobUrl({
//         imageSrc: originalImage,
//         pixelCrop: croppedPixels, 
//         filters: filterString, // Apply the current filters
//         // outputWidth: COVER_WIDTH,
//         // outputHeight: COVER_HEIGHT,
//         outputWidth: isAvatar ? AVTAR_HEIGHT : 1584,
//         outputHeight: isAvatar ? AVTAR_WIDTH : 396,
//         quality: 0.95,
//       });
//     },
//   }));

//   const applyPreset = (p) => {
//     if (!p || !p.preset) {
//       setBrightness(100); setContrast(100); setSaturation(100); setGrayscale(0);
//     } else {
//       setBrightness(p.preset.brightness ?? 100);
//       setContrast(p.preset.contrast ?? 100);
//       setSaturation(p.preset.saturation ?? 100);
//       setGrayscale(p.preset.grayscale ?? 0);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4 w-full">
//       {/* 1. Canvas Area */}
//       <div className="relative w-full h-[260px] bg-black overflow-hidden ">
//         <Cropper
//           image={originalImage}
//           crop={crop}
//           zoom={zoom}
//           aspect={aspect}
//           // showGrid={activeTool === "crop"} // Show grid only when cropping
//           showGrid={false} // Show grid only when cropping
//           restrictPosition={true}
//           // objectFit={isAvatar ? "contain" : "horizontal-cover"}
//           objectFit="cover"
//           onCropChange={setCrop}
//           onZoomChange={setZoom}
//           cropShape={isAvatar ? "round" : "rect"}
//           onCropComplete={(_, px) => setCroppedPixels(px)}
//           style={{
//             containerStyle: { width: "100%", height: "100%" },
//            cropAreaStyle: { border: activeTool === "crop" ? "2px solid #3b82f6" : "none", boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)" },
         
//             // Apply the filter string directly to the media inside the cropper
//             mediaStyle: { 
//                 filter: filterString, 
//                 maxHeight: "unset" 
//             },
//           }}
//         />
//       </div>

//       {/* 2. Tabs Navigation */}
//     <div>
   
//         <div className="flex space-x-2 px-8 ">
//   {["Crop", "Filter", "Adjust"].map((tab) => {
//     const id = tab.toLowerCase();
//     const isActive = activeTool === id;

//     return (
//       <div key={id} className="relative">
//         <Button2
//           name={tab}
//           onClick={() => onToolChange(id)}
       
//         />

   
//       </div>
//     );
//   })}
// </div>

//     </div>

//       {/* 3. Tool Controls */}
//       <div className="">
        
//         {/* --- CROP TOOL --- */}
//         {activeTool === "crop" && (
//           <div className="px-10 md:px-20  py-5 flex flex-col items-center justify-center">
//             <label className="mb-2 font-medium text-gray-600 text-sm">Zoom</label>
//             <input
//               type="range" min={1} max={3} step={0.01}
//               value={zoom} onChange={(e) => setZoom(+e.target.value)}
//               className="w-full  h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//           </div>
//         )}

//         {/* --- FILTER TOOL --- */}
//         {activeTool === "filter" && (
//           <div className="flex gap-3 mb-3 max-w-lg custom-scroll mx-auto overflow-x-auto py-2">
//             {filterPresets.map((p, i) => (
//               <button key={i} type="button" onClick={() => applyPreset(p)} className="flex-shrink-0 w-20 text-center group">
//                 <div 
//                     className="w-16 h-16 mx-auto rounded-md overflow-hidden mb-1 border-2 transition-all"
//                     style={{ borderColor: filterString.includes(p.name) ? '#2563eb' : 'transparent' }} // rudimentary active check
//                 >
//                     {/* Tiny preview thumbnail */}
//                     <div 
//                         className="w-full h-full bg-cover hover:cursor-pointer bg-center"
//                         style={{
//                             backgroundImage: `url(${originalImage})`,
//                             filter: p.preset ? 
//                                 `brightness(${p.preset.brightness ?? 100}%) contrast(${p.preset.contrast ?? 100}%) saturate(${p.preset.saturation ?? 100}%) grayscale(${p.preset.grayscale ?? 0}%)` 
//                                 : "none"
//                         }}
//                     />
//                 </div>
//                 <div className="text-xs font-medium text-gray-600 group-hover:text-black">{p.name}</div>
//               </button>
//             ))}
//           </div>
//         )}

//         {/* --- ADJUST TOOL (NEW) --- */}
//         {activeTool === "adjust" && (
//             <div className="px-8 mb-3 grid grid-cols-2 gap-x-8 gap-y-4">
//                 <RangeControl label="Brightness" value={brightness} setValue={setBrightness} min={0} max={200} />
//                 <RangeControl label="Contrast" value={contrast} setValue={setContrast} min={0} max={200} />
//                 <RangeControl label="Saturation" value={saturation} setValue={setSaturation} min={0} max={200} />
//                 <RangeControl label="Grayscale" value={grayscale} setValue={setGrayscale} min={0} max={100} />
//             </div>
//         )}
//       </div>

      
//     </div>
//   );
// });


const ImageEditor = forwardRef(({ initialImage = null, mode = "cover", activeTool, onToolChange}, ref) => {
  const COVER_WIDTH = 1584;
  const COVER_HEIGHT = 396;
  const AVTAR_WIDTH = 350
  const AVTAR_HEIGHT = 350
 const isAvatar = mode === "avatar";
  const COVER_ASPECT = COVER_WIDTH / COVER_HEIGHT;
  const aspect = isAvatar ? 1 : (1584 / 396);

  const [originalImage, setOriginalImage] = useState(initialImage);
 
  // Crop State
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);

  // Filter/Adjust State
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

 useEffect(() => {
    setOriginalImage(initialImage);
    setCrop({ x: 0, y: 0 }); // Image drag/black space fix
    setZoom(1);
  }, [initialImage, mode]); // 'mode' dependency zaroori hai

  useImperativeHandle(ref, () => ({
    async exportImage() {
      return await getCroppedImageBlobUrl({
        imageSrc: originalImage,
        pixelCrop: croppedPixels, 
        filters: filterString,
        // 🔥 FIX: High resolution export for Avatar to avoid blurring
        outputWidth: isAvatar ? 800 : 1584, 
        outputHeight: isAvatar ? 800 : 396,
        quality: 1, // Max quality
      });
    },
  }));

  // 🔥 Create the CSS Filter String
  const filterString = useMemo(
    () => `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`,
    [brightness, contrast, saturation, grayscale]
  );


  const applyPreset = (p) => {
    if (!p || !p.preset) {
      setBrightness(100); setContrast(100); setSaturation(100); setGrayscale(0);
    } else {
      setBrightness(p.preset.brightness ?? 100);
      setContrast(p.preset.contrast ?? 100);
      setSaturation(p.preset.saturation ?? 100);
      setGrayscale(p.preset.grayscale ?? 0);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 1. Canvas Area */}
   {/* <div className="relative w-full h-[260px] bg-black overflow-hidden "> */}
   <div
  className={`relative   ${
    isAvatar ? "w-full h-[400px] mx-auto" : "w-full h-[260px]"
  }`}
>
        <Cropper
          image={originalImage}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          showGrid={false}
          
          // 🔥 MAIN FIXES: Black space aur dragging ke liye
          restrictPosition={true} 
          // objectFit="cover" 
          objectFit="cover"
          minZoom={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          cropShape={isAvatar ? "round" : "rect"}
          onCropComplete={(_, px) => setCroppedPixels(px)}
          style={{
            containerStyle: { width: "100%", height: "100%" },
            cropAreaStyle: { 
              border: activeTool === "crop" ? "2px solid #3b82f6" : "none", 
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)" 
            },
            mediaStyle: { filter: filterString,
              minWidth: '100%', 
              minHeight: '100%',
             },
          }}
        />
      </div>

      {/* 2. Tabs Navigation */}
    <div>
   
        <div className="flex space-x-2 px-8 ">
  {["Crop", "Filter", "Adjust"].map((tab) => {
    const id = tab.toLowerCase();
    const isActive = activeTool === id;

    return (
      <div key={id} className="relative">
        <Button2
          name={tab}
          onClick={() => onToolChange(id)}
       
        />

   
      </div>
    );
  })}
</div>

    </div>

      {/* 3. Tool Controls */}
      <div className="">
        
        {/* --- CROP TOOL --- */}
        {activeTool === "crop" && (
          <div className="px-10 md:px-20  py-5 flex flex-col items-center justify-center">
            <label className="mb-2 font-medium text-gray-600 text-sm">Zoom</label>
            <input
              type="range" min={1} max={3} step={0.01}
              value={zoom} onChange={(e) => setZoom(+e.target.value)}
              className="w-full  h-1 range-input-slider bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* --- FILTER TOOL --- */}
        {activeTool === "filter" && (
          <div className="flex gap-3 mb-3 max-w-lg custom-scroll mx-auto overflow-x-auto py-2">
            {filterPresets.map((p, i) => (
              <button key={i} type="button" onClick={() => applyPreset(p)} className="flex-shrink-0 w-20 text-center group">
                <div 
                    className="w-16 h-16 mx-auto rounded-md overflow-hidden mb-1 border-2 transition-all"
                    style={{ borderColor: filterString.includes(p.name) ? '#2563eb' : 'transparent' }} // rudimentary active check
                >
                    {/* Tiny preview thumbnail */}
                    <div 
                        className="w-full h-full bg-cover hover:cursor-pointer bg-center"
                        style={{
                            backgroundImage: `url(${originalImage})`,
                            filter: p.preset ? 
                                `brightness(${p.preset.brightness ?? 100}%) contrast(${p.preset.contrast ?? 100}%) saturate(${p.preset.saturation ?? 100}%) grayscale(${p.preset.grayscale ?? 0}%)` 
                                : "none"
                        }}
                    />
                </div>
                <div className="text-xs font-medium text-gray-600 group-hover:text-black">{p.name}</div>
              </button>
            ))}
          </div>
        )}

        {/* --- ADJUST TOOL (NEW) --- */}
        {activeTool === "adjust" && (
            <div className="px-8 mb-3 grid grid-cols-2 gap-x-8 gap-y-4">
                <RangeControl label="Brightness" value={brightness} setValue={setBrightness} min={0} max={200} />
                <RangeControl label="Contrast" value={contrast} setValue={setContrast} min={0} max={200} />
                <RangeControl label="Saturation" value={saturation} setValue={setSaturation} min={0} max={200} />
                <RangeControl label="Grayscale" value={grayscale} setValue={setGrayscale} min={0} max={100} />
            </div>
        )}
      </div>

      
    </div>
  );
});


export default ImageEditor;
// Helper component for Adjust sliders

const RangeControl = ({ label, value, setValue, min = 0, max = 100 }) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-4 w-full">
      <label className="w-20 text-xs font-semibold text-gray-500">
        {label}
      </label>

      <div className="relative flex-1">
        {/* Background track */}

        {/* Range input */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="relative range-input-slider w-full h-1 appearance-none bg-transparent cursor-pointer
          range-thumb"
        />
      </div>

      <span className="w-8 text-xs text-right text-gray-400">
        {value}
      </span>
    </div>
  );
};



const filterPresets = [
  { name: "Original", preset: null },
  { name: "Studio", preset: { contrast: 120, brightness: 105, saturation: 110 } },
  { name: "Spot", preset: { brightness: 120, saturation: 110 } },
  { name: "Classic", preset: { grayscale: 50 } },
  { name: "Warm", preset: { brightness: 110, saturation: 120, contrast: 105 } },
  { name: "Cool", preset: { brightness: 95, saturation: 90, contrast: 110 } },
  { name: "Vintage", preset: { contrast: 90, brightness: 105, saturation: 80, grayscale: 20 } },
  { name: "Mono", preset: { grayscale: 100 } },
];


// Zoom levels
const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

export const ImageEditorPost = forwardRef(({ initialImage = null, mode = "auto" }, ref) => {
  // core states
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // UI modes: "crop" | "filter" | "adjust"
  const [editorMode, setEditorMode] = useState("crop");

  // aspect handling
  const [aspectKey, setAspectKey] = useState("square");
  const [aspect, setAspect] = useState(1);

  // filter / adjust states
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  // sync incoming image
  useEffect(() => {
    setImageSrc(initialImage);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
    setAspectKey("square");
    setAspect(1);
  }, [initialImage]);

  const filterString = useMemo(
    () => `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%)`,
    [brightness, contrast, saturation, grayscale]
  );

  // Rotation functions
  const rotateLeft = () => setRotation((r) => (r - 90 + 360) % 360);
  const rotateRight = () => setRotation((r) => (r + 90) % 360);

  // Zoom functions
  const zoomIn = () => {
    setZoom((z) => Math.min(z * 1.2, 5)); // Max zoom 5x
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(z / 1.2, 0.1)); // Min zoom 0.1x
  };

  const resetZoom = () => setZoom(1);

  const onCropComplete = (_, pixels) => setCroppedAreaPixels(pixels || null);

  // expose exportImage
  useImperativeHandle(ref, () => ({
    async exportImage({ variant = "large", ratio = "square" } = {}) {
      if (!imageSrc) return null;

      let pixelCrop = croppedAreaPixels;
      if (!pixelCrop) {
        const img = await loadImage(imageSrc);
        pixelCrop = { x: 0, y: 0, width: img.width, height: img.height };
      }

      try {
        const res = await getCroppedImageBlobUrl({
          imageSrc,
          pixelCrop,
          rotation,
          filters: filterString,
          variant,
          ratio,
          mimeType: mode === "avatar" ? "image/png" : "image/jpeg",
          quality: 0.94,
        });
        return res;
      } catch (err) {
        console.error("Export failed", err);
        return null;
      }
    },
  }));

  // small helpers
  const applyPreset = (p) => {
    if (!p || !p.preset) {
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setGrayscale(0);
    } else {
      setBrightness(p.preset.brightness ?? 100);
      setContrast(p.preset.contrast ?? 100);
      setSaturation(p.preset.saturation ?? 100);
      setGrayscale(p.preset.grayscale ?? 0);
    }
  };

  // Handle aspect ratio change
  const handleAspectChange = (preset) => {
    setAspectKey(preset.key);
    setAspect(preset.aspect);
    
    // Reset crop position when aspect changes
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="rounded-lg w-[] mt-5 p-3 text-white w-full max-w-4xl mx-auto">
      {/* header / tabs */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setEditorMode("crop")}
            className={`flex items-center px-3 py-1 rounded ${
              editorMode === "crop" 
                ? "text-blue-600 bg-blue-100" 
                : "text-gray-800 hover:bg-gray-100"
            }`}
            type="button"
          >
            <Crop className="inline-block w-4 h-4 mr-2" /> Crop
          </button>
          <button
            onClick={() => setEditorMode("filter")}
            className={`flex items-center px-3 py-1 rounded ${
              editorMode === "filter" 
                ? "text-blue-600 bg-blue-100" 
                : "text-gray-800 hover:bg-gray-100"
            }`}
            type="button"
          >
            <Filter className="inline-block w-4 h-4 mr-2" /> Filters
          </button>
          <button
            onClick={() => setEditorMode("adjust")}
            className={`flex items-center px-3 py-1 rounded ${
              editorMode === "adjust" 
                ? "text-blue-600 bg-blue-100" 
                : "text-gray-800 hover:bg-gray-100"
            }`}
            type="button"
          >
            <SlidersHorizontal className="inline-block w-4 h-4 mr-2" /> Adjust
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="relative max-w-xl h-[370px] bg-[#050505] rounded overflow-hidden flex items-center justify-center">
        {imageSrc ? (
          editorMode === "crop" ? (
            <Cropper
              image={croppedImage || originalImage}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={false}
              objectFit="horizontal-cover"
              style={{
                containerStyle: { background: "transparent" },
                mediaStyle: {
      filter: step === 1 ? filterString : "none",
    },
                cropAreaStyle: {
                  border: "2px solid rgba(255,255,255,0.95)",
                  borderRadius: "6px",
                },
              }}
            />
          ) : (
            <img
              src={imageSrc}
              alt="preview"
              className="max-h-full max-w-full object-contain"
              style={{ filter: editorMode === "filter" || editorMode === "adjust" ? filterString : "none" }}
            />
          )
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}
        
        {/* Zoom and Rotation Controls (floating) */}
        {editorMode === "crop" && imageSrc && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 rounded-lg p-2">
            <button
              onClick={zoomOut}
              className="p-2 rounded hover:bg-gray-700"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="text-sm px-2 min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </div>
            
            <button
              onClick={zoomIn}
              className="p-2 rounded hover:bg-gray-700"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            
            <div className="h-6 w-px bg-gray-600 mx-1"></div>
            
            <button
              onClick={rotateLeft}
              className="p-2 rounded hover:bg-gray-700"
              title="Rotate Left"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={rotateRight}
              className="p-2 rounded hover:bg-gray-700"
              title="Rotate Right"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="mt-3">
        {/* Aspect ratio icons */}
        {editorMode === "crop" && (
          <div className="flex justify-center gap-3 mb-4">
            {aspectPresets.map((p) => {
              const Icon = p.icon;
              const active = aspectKey === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => handleAspectChange(p)}
                  className={`flex flex-col items-center p-2 rounded-lg transition ${
                    active 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{p.name}</span>
                </button>
              );
            })}
            
            {/* Reset Zoom button */}
            <button
              type="button"
              onClick={resetZoom}
              className="flex flex-col items-center p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="w-5 h-5 mb-1" />
              <span className="text-xs">Reset</span>
            </button>
          </div>
        )}

        {/* mode-specific UIs */}
        {editorMode === "filter" && (
          <>
            {/* Filter presets row */}
            <div className="flex gap-3 max-w-[460px] mx-auto overflow-x-auto py-2">
              {filterPresets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="flex-shrink-0 w-20 text-center"
                >
                  <div
                    className="w-20 h-20 rounded-lg overflow-hidden mb-1 border-2 border-gray-700"
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: p.preset
                        ? `brightness(${p.preset.brightness ?? 100}%) contrast(${p.preset.contrast ?? 100}%) saturate(${p.preset.saturation ?? 100}%) grayscale(${p.preset.grayscale ?? 0}%)`
                        : "none",
                    }}
                  />
                  <div className="text-sm text-gray-300">{p.name}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {editorMode === "adjust" && (
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Brightness</span>
                <span>{brightness}%</span>
              </div>
              <input 
                type="range" 
                min={50} 
                max={150} 
                value={brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Contrast</span>
                <span>{contrast}%</span>
              </div>
              <input 
                type="range" 
                min={50} 
                max={150} 
                value={contrast} 
                onChange={(e) => setContrast(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Saturation</span>
                <span>{saturation}%</span>
              </div>
              <input 
                type="range" 
                min={50} 
                max={200} 
                value={saturation} 
                onChange={(e) => setSaturation(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Grayscale</span>
                <span>{grayscale}%</span>
              </div>
              <input 
                type="range" 
                min={0} 
                max={100} 
                value={grayscale} 
                onChange={(e) => setGrayscale(Number(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Save / Export buttons */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="text-sm text-gray-300">
            Mode: <span className="font-medium">{editorMode.toUpperCase()}</span> | 
            Aspect: <span className="font-medium">{aspectKey.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="flex items-center px-4 py-2 bg-gray-800 rounded-lg text-sm hover:bg-gray-700 transition"
              type="button"
              onClick={async () => {
                if (!imageSrc) return;
                const res = await (ref?.current?.exportImage ? 
                  ref.current.exportImage({ variant: "medium", ratio: "square" }) : null);
                if (res?.url) {
                  const a = document.createElement("a");
                  a.href = res.url;
                  a.download = "image-edited.jpg";
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                }
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Save
            </button>

            <button
              className="flex items-center px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition"
              type="button"
              onClick={async () => {
                if (!ref || !ref.current) return;
                const res = await ref.current.exportImage({ 
                  variant: "large", 
                  ratio: aspectKey === "portrait" ? "portrait" : "landscape" 
                });
                if (res?.url) {
                  window.open(res.url, "_blank");
                }
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// helper
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}
