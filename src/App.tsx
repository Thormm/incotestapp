import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/Applayout";
import Home from "./pages/Home/home";
import Dash from "./pages/Dash/dash";
import Deposit from "./pages/Deposit/deposit";
import History from "./pages/History/history";
import Withdrawal from "./pages/Withdrawal/withdrawal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // This includes your navbar
    children: [
      { path: "/", element: <Home /> },
      { path: "/dash", element: <Dash /> },
      { path: "/deposit", element: <Deposit /> },
      { path: "/history", element: <History /> },
      { path: "/withdrawal", element: <Withdrawal /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
