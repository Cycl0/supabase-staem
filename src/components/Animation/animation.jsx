import React, { useState, useEffect } from "react";
import "./animation.css";

export const MakeAnimated = ({
  className,
  animation,
  color,
  size,
  delay,
  action,
  children,
}) => {
  const [elementClicked, setElementClicked] = useState(false);

  useEffect(() => {
    setElementClicked(false);
    if (action) {
      action();
    }
  }, [elementClicked]);

  const onClick = (event) => {
    switch (animation) {
      case "ripple":
        rippleEffect(event);
        break;
      case "flash":
        flashEffect(event);
    }
  };

  const rippleEffect = (event) => {
    const element = event.currentTarget;
    const ripple = document.createElement("span");
    element.appendChild(ripple);
    const { left, top } = element.getBoundingClientRect();
    ripple.style.top = event.clientY - top - ripple.offsetHeight / 2 + "px";
    ripple.style.left = event.clientX - left - ripple.offsetWidth / 2 + "px";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.background = color;
    ripple.classList.add("rippleEffect");
    setTimeout(() => {
      element.removeChild(ripple);
      setElementClicked(true);
    }, delay);
  };

  const flashEffect = (event) => {
    const element = event.currentTarget;
    const flash = document.createElement("span");
    element.appendChild(flash);
    const { left, top } = element.getBoundingClientRect();
    flash.style.top = event.clientY - top - flash.offsetHeight / 2 + "px";
    flash.style.left = event.clientX - left - flash.offsetWidth / 2 + "px";
    flash.style.width = size + "px";
    flash.style.height = size + "px";
    flash.style.background = color;
    flash.classList.add("flashEffect");

    element.style.opacity = "1";
    element.style.overflow = "hidden";
    element.style.filter = "brightness(1.5)";
    element.style.boxShadow = "0px 13px 50px 6px hsl(0deg 0% 100% / 0.04)";
    element.style.borderRadius = "15%";
    setTimeout(() => {
      element.removeChild(flash);
      setElementClicked(true);
    }, delay);
  };

  return (
    <div
      className={className}
      style={{ position: "relative", transition: "all 0.5s ease" }}
      onClick={(event) => onClick(event)}
    >
      {children}
    </div>
  );
};
