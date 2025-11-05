// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Menu,
//   Book,
//   Layers,
//   ClipboardList,
//   User,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", path: "/", icon: <Menu size={20} /> },
//     { name: "Books", path: "/books", icon: <Book size={20} /> },
//     { name: "Categories", path: "/categories", icon: <Layers size={20} /> },
//     {
//       name: "Borrow Records",
//       path: "/borrow-records",
//       icon: <ClipboardList size={20} />,
//     },
//   ];

//   return (
//     <div
//       className={`h-screen bg-blue-900 text-white transition-all duration-300 flex flex-col ${
//         collapsed ? "w-20" : "w-64"
//       } fixed left-0 top-0 z-50`}
//     >
//       {/* Menu Links */}
//       <nav className="flex-1 mt-4 space-y-1">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.name}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-blue-800 transition ${
//                 isActive ? "bg-blue-800" : ""
//               }`
//             }
//           >
//             {item.icon}
//             {!collapsed && <span>{item.name}</span>}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer (Logout) */}
//       <div className="border-t border-blue-700 p-4">
//         {/* <button className="flex items-center gap-3 w-full text-sm hover:bg-blue-800 px-2 py-2 rounded">
//           <LogOut size={18} />
//           {!collapsed && <span>Logout</span>}
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
