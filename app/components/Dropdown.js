"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
export default function Dropdown({
  button,
  children,
  className,
  onOpen,
  onClose,
  initialOpen = false,
}) {
  const [open, setOpen] = useState(initialOpen);
  const ref = useRef(null);

  // Use useEffect to handle state updates after render
  const openDropdown = useCallback(() => {
    setOpen(true);
    // Use setTimeout to avoid setState during render
    setTimeout(() => onOpen?.(), 0);
  }, [onOpen]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    setTimeout(() => onClose?.(), 0);
  }, [onClose]);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => {
      const newVal = !prev;
      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        if (newVal) onOpen?.();
        else onClose?.();
      }, 0);
      return newVal;
    });
  }, [onOpen, onClose]);

  // outside click + escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeDropdown();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeDropdown]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {button}
      </div>

      {open && (
        <div className={`absolute mt-4 z-50 ${className || ""}`}>
          {typeof children === "function"
            ? children({ close: closeDropdown, open: openDropdown })
            : children}
        </div>
      )}
    </div>
  );
}



export function SmartDropdown({
  trigger,
  children,
  width = 320,
  gap = 8,
  maxHeight = 350,
  placement = "auto", // auto | top | bottom
  closeOnClick = true,
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    let left = rect.left;
    let top;

    // Prevent horizontal overflow
    if (left + width > viewportW - 8) {
      left = viewportW - width - 8;
    }
    if (left < 8) left = 8;

    const showTop =
      placement === "top" ||
      (placement === "auto" && rect.bottom + maxHeight > viewportH);

    top = showTop
      ? rect.top - maxHeight - gap
      : rect.bottom + gap;

    if (top < 8) top = 8;

    setPos({ top, left });
  }, [gap, maxHeight, placement, width]);

  const toggle = () => {
    if (!open) calculatePosition();
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        !triggerRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  // Recalculate on scroll & resize
  useEffect(() => {
    if (!open) return;
    const handler = () => calculatePosition();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [open, calculatePosition]);

  return (
    <>
      <div ref={triggerRef} onClick={toggle}>
        {trigger}
      </div>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] bg-white border border-gray-200 rounded-2xl shadow-lg custom-scroll"
            style={{
              top: pos.top,
              left: pos.left,
              width,
              maxHeight,
              overflowY: "auto",
            }}
            onClick={() => closeOnClick && setOpen(false)}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}
