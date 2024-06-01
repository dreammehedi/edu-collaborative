import { Link } from "react-router-dom";

const menuContent = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
];

function MenuContent() {
  return (
    <>
      {menuContent.map((menu) => {
        return (
          <li key={menu.name}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        );
      })}
    </>
  );
}

export default MenuContent;
