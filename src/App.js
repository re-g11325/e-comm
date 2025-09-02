import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import logo from "./logo.svg";
import { RouterProvider } from "react-router";
import NotFound from "./Screens/NotFound";
import Search from "./Screens/Search";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "./Stores/globalStore";
import React from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Payment from "./Screens/Payment";

const router = createBrowserRouter([
  { path: "/", element: <Search></Search> },
  { path: "/payment/:paymentMessage", element: <Payment></Payment> },
  { path: "/:profileName", element: <Dashboard></Dashboard> },
  { path: "/notFound", element: <NotFound></NotFound> },
  { path: "/e-comm", element: <Search></Search> },
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
  return (
    <Box>
      <RouterProvider router={router}></RouterProvider>
      {globalStore.isLoading ?? false ? (
        <Flex
          position="fixed"
          inset="0"
          bg="white"
          zIndex="overlay"
          align="center"
          justify="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default App;
