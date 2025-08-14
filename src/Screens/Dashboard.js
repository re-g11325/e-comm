import React from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  HStack,
  Button,
  VStack,
  MenuIcon,
  ListIcon,
  Collapse,
} from "@chakra-ui/react";
import Sidebar from "../Components/Sidebar";
import CenterContent from "../Components/CenterContent";
import SideDetails from "../Components/SideDetails";
import TopNavbar from "../Components/TopNavbar";
import MobileHandler from "../Components/MobileHandler";
import WarningBar from "../Components/WarningBar";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import ProfileVisualizer from "../Components/ProfileVisualizer";

function Dashboard() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  //const [isMobile, setIsMobile] = React.useState(false);
  const [leftSideIsOpen, setleftSideIsOpen] = React.useState(true);
  const [rightSideIsOpen, setrightSideIsOpen] = React.useState(true);
  const [showProfile, setshowProfile] = React.useState(true);

  const [allItems, setallItems] = React.useState([]);
  const [navItems, setnavItems] = React.useState([]);
  const [centerData, setcenterData] = React.useState([]);

  const onLoad = () => {
    fetch(`${process.env.PUBLIC_URL}/JsonData/items.json`)
      .then((response) => response.json())
      .then((json) => {
        _dispatch(
          setState({
            profile: json.profile,
          })
        );
        setallItems(json.items);
        var navigationPaths = json.items.map((_p) => ({
          nav: _p.nav,
          color: _p.color,
        }));
        navigationPaths = navigationPaths.filter(
          (obj, index, self) =>
            index === self.findIndex((o) => o.nav === obj.nav)
        );

        setnavItems(navigationPaths);
      })
      .catch((error) => console.log("Error loading JSON:", error));
  };

  const checkMobile = () => {
    const isMobile = window.innerWidth <= window.innerHeight;
    setrightSideIsOpen(true);
    setleftSideIsOpen(true);
    if (isMobile) {
      setrightSideIsOpen(false);
      setleftSideIsOpen(false);
    }
    _dispatch(
      setState({
        isMobile: isMobile,
      })
    );
  };

  React.useEffect(() => {
    onLoad();
    checkMobile(); // run at mount
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <Box minH="100vh">
      <WarningBar></WarningBar>
      <TopNavbar
        onProfileClick={() => {
          setshowProfile(true);
        }}
        onLeftSideOpen={() => {
          setleftSideIsOpen(true);
        }}
        onRightSideOpen={() => {
          setrightSideIsOpen(true);
        }}
      />

      {/* main content area */}
      <Flex h="80vh">
        <MobileHandler
          direction="left"
          isOpen={leftSideIsOpen}
          isMobile={globalStore.isMobile}
          onClose={() => {
            setleftSideIsOpen(false);
          }}
        >
          <Sidebar
            onClick={(_selectedPath) => {
              var centerDetails = allItems.filter(
                (_p) => _p.nav == _selectedPath
              );
              setcenterData([]);
              setcenterData(centerDetails);
              setleftSideIsOpen(false);
              setshowProfile(false);
            }}
            paths={navItems}
          ></Sidebar>
        </MobileHandler>

        {showProfile && globalStore.profile ? (
          <ProfileVisualizer></ProfileVisualizer>
        ) : (
          <CenterContent
            items={centerData}
            onClick={(_itemObj) => {
              //shall we open the cart everytime we add an item? NO
              //setrightSideIsOpen(true); there you go
            }}
            showProfile={false}
          ></CenterContent>
        )}

        <MobileHandler
          direction="right"
          isOpen={rightSideIsOpen}
          isMobile={globalStore.isMobile}
          onClose={() => {
            setrightSideIsOpen(false);
          }}
        >
          <SideDetails details={[]}></SideDetails>
        </MobileHandler>
      </Flex>
    </Box>
  );
}

export default Dashboard;
