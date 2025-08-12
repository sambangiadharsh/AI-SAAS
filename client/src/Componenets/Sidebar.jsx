import React from "react";
import { useUser, useClerk, SignIn,Protect} from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import {
  Eraser, FileText, Hash, House, Image,
  LogOut, Scissors, SquarePen, Users
} from "lucide-react";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-image", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users }
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut,openUserProfile } = useClerk();




  return (
    <div
      className={`
        w-60 bg-white border-r border-gray-200 flex flex-col fixed sm:static
        top-14 bottom-0 z-40 transition-transform duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"}
      `}
    >
      {/* User Profile */}
      <div>
        <div onClick={openUserProfile} className="my-7 w-full flex  cursor-pointer flex-col items-center">
        <img
          src={user.imageUrl}
          alt="User"
          className="w-16 h-16 rounded-full object-cover"
        />
        <h2 className="mt-2 text-lg font-semibold">{user.fullName}</h2>
        <p className="text-sm text-gray-500">
          <Protect plan="premium" fallback="Free">Premium</Protect>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 px-4 w-full">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium
              ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      </div>

      {/* Logout */}
      <div className="mt-auto p-4">
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-red-100 rounded-md"
        >
          <LogOut className="w-5 h-5 flex items-center" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
