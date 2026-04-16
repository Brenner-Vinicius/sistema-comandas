import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from "./components/Root";
import { Orders } from "./components/Orders";
import { Inventory } from "./components/Inventory";
import { Login } from "./components/Login";
import { Chat } from "./components/Chat";
import { Settings } from "./components/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: () => (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Orders },
      { path: "inventory", Component: Inventory },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/chat/:orderId",
    Component: () => (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}