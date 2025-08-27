import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import logo from "./logo.svg";
import { RouterProvider } from "react-router";
import NotFound from "./Screens/NotFound";
import Search from "./Screens/Search";

const router = createBrowserRouter([
  { path: "/", element: <Search></Search> },
  { path: "/:profileName", element: <Dashboard></Dashboard> },
  { path: "/notFound", element: <NotFound></NotFound> },
  { path: "*", element: <NotFound></NotFound> },
]);

function App() {
  // return <Dashboard></Dashboard>;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
