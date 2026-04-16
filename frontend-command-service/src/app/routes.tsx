import { createBrowserRouter } from "react-router";
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
    element: (
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
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);
