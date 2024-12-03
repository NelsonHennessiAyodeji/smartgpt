import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

const pages = [
  { name: "Chat", link: "./chat" },
  { name: "Books", link: "./books" },
  { name: "New Book", link: "./books/new-book" },
  { name: "Profile", link: "./profile" },
];

const layout = ({ children }) => {
  // Return the layout for the Side bar or Drawer
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Sidebar content here */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden fixed top-6 right-6"
        >
          <FaBarsStaggered className="w-8 h-8 text-primary"></FaBarsStaggered>
        </label>
        <div className="bg-base-200 px-8 py-12 min-h-screen">{children}</div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default layout;
