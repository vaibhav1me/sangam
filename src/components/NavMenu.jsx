import { NavLinks } from "@/constants/Data"
import NavLink from "./NavLink"

const NavMenu = () => {
  return (
    <>
      <div id="logo">Sangama</div>
      <div>
        {NavLinks.map((navLink) => {
          return <NavLink key={navLink.linkNo} {...navLink} />;
        })}
      </div>
    </>
  );
}

export default NavMenu