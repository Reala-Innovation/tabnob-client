import React from "react";
import "./toggleMenu.css";

interface MenuToggleProps {
  isClose: boolean;
  onClick?: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isClose, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`menu-toggle ${isClose ? "close" : ""}`}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </div>
  );
};

export default MenuToggle;
