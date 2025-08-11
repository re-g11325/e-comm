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

function Dashboard() {
  const [userData, setuserData] = React.useState({});

  const [isMobile, setIsMobile] = React.useState(false);
  const [leftSideIsOpen, setleftSideIsOpen] = React.useState(true);
  const [rightSideIsOpen, setrightSideIsOpen] = React.useState(true);

  const [navItems, setnavItems] = React.useState([]);
  const [centerData, setcenterData] = React.useState([]);

  const onLoad = () => {
    fetch(`${process.env.PUBLIC_URL}/JsonData/items.json`)
      .then((response) => response.json())
      .then((json) => {
        setuserData(json);
        //read server data
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
    setIsMobile(isMobile);
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
        onProfileClick={() => {}}
        profile={userData.profile ?? {}}
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
          isMobile={isMobile}
          onClose={() => {
            setleftSideIsOpen(false);
          }}
        >
          <Sidebar
            onClick={(_selectedPath) => {
              var centerDetails = userData.items.filter(
                (_p) => _p.nav == _selectedPath
              );
              setcenterData([]);
              setcenterData(centerDetails);
              setleftSideIsOpen(false);
            }}
            paths={navItems}
          ></Sidebar>
        </MobileHandler>

        <CenterContent
          items={centerData}
          onClick={(_itemObj) => {
            //shall we open the cart everytime we add an item? NO
            //setrightSideIsOpen(true); there you go
          }}
          showProfile={false}
          profile={userData.profile}
          isMobile={isMobile}
        ></CenterContent>

        <MobileHandler
          direction="right"
          isOpen={rightSideIsOpen}
          isMobile={isMobile}
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
