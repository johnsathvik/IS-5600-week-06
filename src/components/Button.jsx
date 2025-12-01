import React from "react";

export default function Button({ text, handleClick, disabled }) {
  const baseClasses =
    "f5 no-underline inline-flex items-center pa3 ba border-box mr4";
  const activeClasses = "black bg-animate hover-bg-black hover-white pointer";
  const disabledClasses = "black-40 bg-near-white";

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault(); // stop page jump
        if (!disabled) handleClick();
      }}
      className={`${baseClasses} ${
        disabled ? disabledClasses : activeClasses
      }`}
      aria-disabled={disabled}
    >
      <span className="pl1">{text}</span>
    </a>
  );
}