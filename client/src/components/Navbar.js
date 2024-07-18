import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ usuario }) {
  return (
    <div className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
          >
            Home
          </NavLink>
        </li>
        {usuario && (
          <li>
            <NavLink
              to="/create-character"
              className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
            >
              Crear Personaje
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/manage-characters"
            className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
          >
            Gestionar Personajes
          </NavLink>
        </li>
        {usuario ? (
          <li>
            <NavLink
              to="/logout"
              className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register-user"
                className={({ isActive }) => (isActive ? "text-blue-500" : "text-white")}
              >
                Registrar Cuenta
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
