import "../styles/index.css";
import "../styles/tailwind.css";
import { RouterProvider } from "react-router";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />;
}