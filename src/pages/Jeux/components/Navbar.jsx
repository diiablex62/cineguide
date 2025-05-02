import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <NavLink to="/jeux/affiche" end>
        Affiche
      </NavLink>
    </div>
  );
}
