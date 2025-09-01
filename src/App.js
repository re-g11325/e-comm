import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import logo from "./logo.svg";
import { RouterProvider } from "react-router";
import NotFound from "./Screens/NotFound";
import Search from "./Screens/Search";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "./Stores/globalStore";
import React from "react";

const router = createBrowserRouter([
  { path: "/", element: <Search></Search> },
  { path: "/:profileName", element: <Dashboard></Dashboard> },
  { path: "/notFound", element: <NotFound></NotFound> },
  { path: "*", element: <Search></Search> },
]);

function App() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const checkMobile = () => {
    const isMobile = window.innerWidth <= window.innerHeight;
    // setrightSideIsOpen(true);
    // setleftSideIsOpen(true);
    // if (isMobile) {
    //   setrightSideIsOpen(false);
    //   setleftSideIsOpen(false);
    // }
    _dispatch(
      setState({
        isMobile: isMobile,
      })
    );
  };

  React.useEffect(() => {
    checkMobile(); // run at mount
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // return <Dashboard></Dashboard>;
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
