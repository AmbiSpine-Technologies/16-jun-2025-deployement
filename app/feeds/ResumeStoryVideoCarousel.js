"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ResumeStoryVideoCarousel = ({
  stories = [],
  className = "",
  cardSize = "medium",
  showNames = true,
  autoPlay = true
}) => {
  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("spreadnext-stories") || "null");
      if (!saved) return;
      // saved might be an array or single object — ensure we keep only one user story (index 0)
      if (Array.isArray(saved)) {
        setUserStories(saved.slice(0, 1));
      } else {
        setUserStories([saved]);
      }
    } catch (e) {
      console.error("Failed to load stories", e);
    }
  }, []);

  // Save to localStorage whenever userStories changes
  useEffect(() => {
    if (userStories.length > 0) {
      localStorage.setItem("spreadnext-stories", JSON.stringify(userStories));
    }
  }, [userStories]);

  // Default stories if none provided
  const defaultStories = [
    {
      id: 1,
      userName: "Add Story",
      avatar: "/default-user-profile.svg",
      viewed: false,
      isAddStory: true,
      items: [],
    },
  ];

  const displayStories = [
    defaultStories[0], // only the + Add Story card
    ...userStories.filter(story => story.items && story.items.length > 0)
  ];

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const sizeClasses = {
    small: {
      avatar: "w-12 h-12",
      card: "min-w-[80px]",
      text: "text-xs",
      background: "-inset-1"
    },
    medium: {
      avatar: "w-16 h-16",
      card: "min-w-[100px]",
      text: "text-sm",
      background: "-inset-2"
    },
    large: {
      avatar: "w-20 h-20",
      card: "min-w-[120px]",
      text: "text-base",
      background: "-inset-3"
    }
  };

  const currentSize = sizeClasses[cardSize];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
    };
  }, []);

  const addStory = (item) => {
    setUserStories((prev) => {
      if (prev.length > 0) {
        const updated = [...prev];
        if (!updated[0].items) updated[0].items = [];
        updated[0].items.push(item);
        updated[0].background = item.src;
        return updated;
      }

      return [
        {
          id: Date.now(),
          userName: "Default name",
          avatar: "/default-user-profile.svg", // Use default avatar
          viewed: false,
          isAddStory: false,
          background: item.src,
          items: [item],
        },
      ];
    });
  };

  return (
    <div className={`w-full mt-1  rounded-4xl ${className} relative`}>
      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Stories Container */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-3 overflow-x-hidden  py-2 no-scrollbar"
        >
          {displayStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              size={currentSize}
              showName={showNames}
              autoPlay={autoPlay}
              addStory={addStory}
            />
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

const StoryCard = ({ story, size, showName, autoPlay, addStory }) => {
  const [open, setOpen] = useState(false);

  const hasStory = story.items && story.items.length > 0;
  const isCurrentUser = story.userName === "You";

  const handleClick = () => {
    if (story.isAddStory) {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*,video/*';
      fileInput.multiple = true;
      fileInput.onchange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        files.forEach((file) => {
          const fileUrl = URL.createObjectURL(file);
          const type = file.type.startsWith("video") ? "video" : "image";
          addStory({
            id: Date.now() + Math.floor(Math.random() * 1000),
            type,
            src: fileUrl,
            duration: 4000,
          });
        });
      };

      fileInput.click();
      return;
    }

    // if (story.items && story.items.length > 0) {
    //   setOpen(true);
    // }
    if (hasStory) {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <button
          onClick={handleClick}
          className={`flex flex-col items-center justify-center mx-1 ${size.card} h-fit snap-start group relative`}
        >

           <div className="relative ">
        <div
          className={`
         ${size.avatar}
          h-20 w-20 rounded-full p-[3px] relative flex items-center justify-center
         `}
        >

          {/* Dotted Gradient Ring ONLY for Add Story */}
          {story.isAddStory ? (
            <div className="
        absolute inset-0 rounded-full
        border-[3px] border-dotted
        border-purple-700"
             style={{
                borderStyle: "dotted",
                borderWidth: "3px",
              }}
            ></div>
          ) : (
            /* Normal Story Solid Border */
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#36075E] via-[#D70081] to-[#D35F5F]"></div>
          )}

          {/* Avatar */}
          <img
            src={story.avatar}
            className="h-full w-full rounded-full object-cover bg-white p-[1px] relative "
          />
        </div>

        {/* Add Story Icon */}
        {story.isAddStory && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center ">
            <span className="text-white text-xs font-bold">+</span>
          </div>
        )}
      </div>


      <AnimatePresence>
        {open && (
          <StoryViewer
            story={story}
            onClose={() => setOpen(false)}
            autoPlay={autoPlay}
          />
        )}
      </AnimatePresence>
        </button>

        {/* User Name - Outside the story card */}
        {showName && (
          <div className=" text-center">
            <span className={`${size.text} text-gray-700 font-medium max-w-[80px] truncate block`}>
              {story.userName}
            </span>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <StoryViewer
            story={story}
            onClose={() => setOpen(false)}
            autoPlay={autoPlay}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const StoryViewer = ({ story, onClose, autoPlay = true }) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const currentItem = story.items?.[itemIndex];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [itemIndex]);

  useEffect(() => {
    if (!playing || !autoPlay || !currentItem) return;

    clearTimeout(timeoutRef.current);

    const duration = currentItem?.duration ?? 4000;
    timeoutRef.current = setTimeout(() => {
      next();
    }, duration);

    return () => clearTimeout(timeoutRef.current);
  }, [itemIndex, playing, autoPlay, currentItem]);

  const next = () => {
    if (itemIndex < (story.items?.length || 0) - 1) {
      setItemIndex((i) => i + 1);
    } else {
      onClose();
    }
  };

  const prev = () => {
    if (itemIndex > 0) setItemIndex((i) => i - 1);
    else onClose();
  };

  useEffect(() => {
    let startX = 0;
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const dx = endX - startX;
      if (dx < -40) next();
      if (dx > 40) prev();
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [itemIndex]);

  // Reset itemIndex when story changes
  useEffect(() => {
    setItemIndex(0);
  }, [story]);

  if (!story.items || story.items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    >
      <div
        ref={containerRef}
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
        className="relative max-w-3xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Top bar: progress */}
        <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {story.items.map((it, idx) => (
            <div key={`${story.id}-${idx}`} className="h-1 bg-white/20  rounded-full overflow-hidden flex-1">
              <motion.div
                initial={{ width: idx <= itemIndex ? "100%" : "0%" }}
                animate={{ width: idx < itemIndex ? "100%" : idx === itemIndex ? (playing ? "100%" : "0%") : "0%" }}
                transition={{ duration: playing ? (currentItem?.duration ?? 4000) / 1000 : 0 }}
                style={{ background: "white", height: "100%" }}
              />
            </div>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          ✕
        </button>

        {/* Viewer content */}
        <div className="h-[70vh] md:h-[80vh] flex items-center justify-center bg-black">
          {currentItem?.type === "image" && (
            <motion.img
              key={currentItem.id}
              src={currentItem.src}
              alt="story"
              initial={{ opacity: 0.8, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="max-h-full max-w-full object-contain"
            />
          )}

          {currentItem?.type === "video" && (
            <video
              key={currentItem.id}
              src={currentItem.src}
              className="max-h-full max-w-full"
              autoPlay
              playsInline
              muted
              onEnded={next}
            />
          )}
        </div>

        {/* Bottom action area */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-30">
          <div className="flex items-center gap-3 text-white">
            <img src={story.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
            <div>
              <div className="font-semibold text-lg">{story.userName} </div>
              <div className="text-sm opacity-70">{itemIndex + 1}/{story.items.length}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="bg-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        {/* left / right hotzones for fast navigation */}
        <div className="absolute inset-0 flex">
          <button
            onClick={prev}
            className="w-1/3 h-full bg-transparent"
            aria-label="Prev story"
          />
          <div className="w-1/3 h-full" />
          <button
            onClick={next}
            className="w-1/3 h-full bg-transparent"
            aria-label="Next story"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeStoryVideoCarousel;