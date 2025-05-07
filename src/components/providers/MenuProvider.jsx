import { useEffect, useRef, useState } from "react";
import { MenuContext } from "../../context/MenuContext";

export default function MenuProvider({ children }) {
  // header
  const [menu, setMenu] = useState(false);
  const [menuFooter, setMenuFooter] = useState(false);
  const menuRef = useRef(null);
  const [burger, setBurger] = useState(false);
  const [menuPlus, setMenuPlus] = useState(false);
  // responsive
  const menuBurgerRef = useRef(null);
  const menuPlusRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
        setBurger(false);
      }
      if (menuPlusRef.current && !menuPlusRef.current.contains(event.target)) {
        setMenuPlus(false);
      }
      if (
        menuBurgerRef.current &&
        !menuBurgerRef.current.contains(event.target)
      ) {
        toggleBurger();
      }
    };

    if (menu || burger || menuPlus) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu, burger, menuPlus]);

  const toggleBurger = () =>
    setBurger((prev) => (prev === false ? true : false));

  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
        menuRef,
        burger,
        setBurger,
        toggleBurger,
        menuBurgerRef,
        menuPlusRef,
        menuPlus,
        setMenuPlus,
        menuFooter,
        setMenuFooter,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
