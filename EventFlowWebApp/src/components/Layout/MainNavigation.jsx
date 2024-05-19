import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    // Navigation Bar
    <nav className="bg-black p-4 text-white flex flex-col md:flex-row justify-between items-center border-b border-white">
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img src="./assets/logo.png" alt="Logo" className="h-15 w-48" />
      </div>
      {/* Navigation Links */}
      <div className="flex space-x-8 md:ml-auto md:mx-8 mt-4 md:mt-0">
        <NavLink to="/" className="hover:text-blue-600">
          Home
        </NavLink>
        <NavLink to="/events" className="hover:text-blue-600">
          Events
        </NavLink>
        <NavLink to="/create" className="hover:text-blue-600">
          Create Event
        </NavLink>
        <NavLink to="/about" className="hover:text-blue-600">
          About us
        </NavLink>
        <NavLink to="/contact" className="hover:text-blue-600">
          Contact us
        </NavLink>
      </div>
      {/* Buttons */}
      <div className="flex space-x-4 md:space-x-8 mt-4 md:mt-0">
        <NavLink
          to="/profile"
          className="bg-blue-400 text-white px-4 py-1 rounded-full border border-white hover:bg-blue-600"
        >
          User
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavigation;
