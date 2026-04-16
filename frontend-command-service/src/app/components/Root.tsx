import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ShoppingBag, Package, Settings } from "lucide-react";

export function Root() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">Gerente do Restaurante</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Pedidos</span>
          </NavLink>
          
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <Package className="w-6 h-6" />
            <span className="text-xs">Estoque</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors ${
                isActive
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Configurações</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}