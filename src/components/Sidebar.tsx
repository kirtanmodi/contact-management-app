import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

const Sidebar = ({ isCollapsed = false, setIsCollapsed }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`pt-20 w-60 bg-gray-800 text-gray-100 absolute 
        ${
          isCollapsed ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 ease-in-out fixed top-0 left-0 h-screen overflow-y-auto border-r-2 border-gray-700`}
        style={{
          zIndex: 888,
        }}
      >
        {/* Sidebar content */}
        <nav>
          <ul>
            <li
              style={{ cursor: "pointer" }}
              className="py-2 px-4"
              onClick={() => navigate("contact-management-app/")}
            >
              Contacts
            </li>
            <li
              style={{ cursor: "pointer" }}
              className="py-2 px-4"
              onClick={() => navigate("contact-management-app/charts-and-map")}
            >
              Charts & Map
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
