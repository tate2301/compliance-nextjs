"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

export interface ModuleProps {
  /** Main content of the module */
  children?: ReactNode;
  /** Optional title for the module */
  title?: string;
  /** Whether the module is currently focused */
  isFocused?: boolean;
  /** Optional actions to be displayed in the module header */
  actions?: ReactNode;
  /** Optional icon to display next to the title */
  icon?: ReactNode;
  /** Module width (can be numeric for pixel values or string for percentages) */
  width?: number | string;
  /** Module height (can be numeric for pixel values or string for percentages or "auto") */
  height?: number | string | "auto";
  /** Function called when module is focused */
  onFocus?: () => void;
  /** Custom CSS class */
  className?: string;
}

/**
 * Module - The fundamental building block of Mercury's UI
 *
 * Modules are containers for content and actions, defined by user intent.
 * They have subtle animations and transitions to maintain flow state.
 */
export const Module = ({
  children,
  title,
  isFocused = false,
  actions,
  icon,
  width = "auto",
  height = "auto",
  onFocus,
  className = "",
}: ModuleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Convert numeric dimensions to pixel values
  const widthValue = typeof width === "number" ? `${width}px` : width;
  const heightValue = typeof height === "number" ? `${height}px` : height;

  // Animation variants for fluid motion
  const variants = {
    initial: { opacity: 0.9, y: 10, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1], // "fluid" easing
      },
    },
    hover: {
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    focus: {
      boxShadow: "0 0 0 2px #1c6bcf, 0 0 15px rgba(0, 0, 0, 0.05)",
      scale: 1.01,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Handle focus events
  const handleFocus = () => {
    if (onFocus) onFocus();
  };

  return (
    <motion.div
      className={`module ${isFocused ? "module--focused" : ""} ${className}`}
      style={{
        width: widthValue,
        height: heightValue,
        position: "relative",
        background: "var(--sand-2)",
        border: "1px solid var(--sand-6)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
      initial="initial"
      animate="animate"
      variants={variants}
      whileHover={isHovered ? "hover" : ""}
      whileFocus={isFocused ? "focus" : ""}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleFocus}
      tabIndex={0}
    >
      {(title || actions) && (
        <div
          className="module__header p-4"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title && (
            <div
              className="module__title"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {icon && <span className="module__icon">{icon}</span>}
              <h3 style={{ margin: 0 }}>{title}</h3>
            </div>
          )}

          {actions && <div className="module__actions">{actions}</div>}
        </div>
      )}

      {children && (
        <div
          className="module__content border-t"
          style={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default Module;
