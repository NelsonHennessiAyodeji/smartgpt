import { CgSmartphoneChip } from "react-icons/cg";
import ThemeToggle from "./ThemeToggle";

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <CgSmartphoneChip className="w-10 h-10 text-teal-500"></CgSmartphoneChip>
      <h2 className="text-xl font-extrabold text-teal-500 mr-10">SmartGPT</h2>
      <ThemeToggle></ThemeToggle>
    </div>
  );
};

export default SidebarHeader;
