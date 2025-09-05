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
import OrderConfirmPanel from "../Components/OrderConfirmPanel";
import { getDocument, setApiKey, setProjectId } from "../Repos/Sanity";
import ThanksPanel from "../Components/ThanksPanel";
import { useParams, Redirect, useNavigate } from "react-router-dom";

function Dashboard() {
  const params = useParams();
  const navigate = useNavigate();
  // console.log("dashboard params ", params);

  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  //const [isMobile, setIsMobile] = React.useState(false);
  const [leftSideIsOpen, setleftSideIsOpen] = React.useState(
    !globalStore.isMobile
  );
  const [rightSideIsOpen, setrightSideIsOpen] = React.useState(
    !globalStore.isMobile
  );

  const [allItems, setallItems] = React.useState([]);
  const [navItems, setnavItems] = React.useState([]);
  const [centerData, setcenterData] = React.useState([]);

  const onLoad = (_profileName) => {
    _dispatch(
      setState({
        isLoading: true,
      })
    );
    setApiKey(
      "sknBIYosJg0588ZEQTWD0IJN24gMzq0iDUpfxO7kCcPIjieyUjOgCrr5yYnhD0zvMlB3Jh6CQSpoVvPAEYjRmmfkCIrUQyUEyQd5Pa1mTDUJXxIoiHNnT86P0F4J71x3UZuDwFUZ1pw1vJqgLxF2SECRXNL0DS3w5wm34mkUqEFtLjtcvfEm"
    );
    setProjectId("2kwpmrhw");

    getDocument({ _type: "profile", name: _profileName }, (_profiles) => {
      // console.log("profiles ", _profiles.length);

      if (_profiles.length < 1) {
        navigate("/notFound");
      }

      var json = JSON.parse(_profiles[0].jsonString); //get the first default profile

      _dispatch(
        setState({
          profile: json.profile,
          centerNavigation: "profile",
          isLoading: false,
        })
      );
      setallItems(json.items);
      var navigationPaths = json.items.map((_p) => ({
        nav: _p.nav,
        color: _p.color,
      }));
      navigationPaths = navigationPaths.filter(
        (obj, index, self) => index === self.findIndex((o) => o.nav === obj.nav)
      );

      setnavItems(navigationPaths);

      //set correct connection to the client order database

      document.title = json.profile.name;
      setApiKey(json.profile.dbApiKey);
      setProjectId(json.profile.dbId);
    });
  };

  React.useEffect(() => {
    // console.log("testing params", params);
    onLoad(params.profileName);
  }, []);

  return (
    <Box minH="100vh">
      <WarningBar></WarningBar>
      <TopNavbar
        onProfileClick={() => {
          _dispatch(setState({ centerNavigation: "profile" }));
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
              _dispatch(setState({ centerNavigation: "items" }));
            }}
            paths={navItems}
          ></Sidebar>
        </MobileHandler>

        {globalStore.centerNavigation == "profile" ? (
          <ProfileVisualizer></ProfileVisualizer>
        ) : (
          <></>
        )}
        {globalStore.centerNavigation == "items" ? (
          <CenterContent
            items={centerData}
            onClick={(_itemObj) => {
              //shall we open the cart everytime we add an item? NO
              //setrightSideIsOpen(true); there you go
            }}
            showProfile={false}
          ></CenterContent>
        ) : (
          <></>
        )}
        {globalStore.centerNavigation == "confirmOrder" ? (
          <OrderConfirmPanel></OrderConfirmPanel>
        ) : (
          <></>
        )}
        {globalStore.centerNavigation == "thanksOrder" ? (
          <ThanksPanel></ThanksPanel>
        ) : (
          <></>
        )}

        {globalStore.centerNavigation != "confirmOrder" ? (
          <MobileHandler
            direction="right"
            isOpen={rightSideIsOpen}
            isMobile={globalStore.isMobile}
            onClose={() => {
              setrightSideIsOpen(false);
            }}
          >
            <SideDetails
              details={[]}
              onCartConfirm={() => {
                setrightSideIsOpen(false);
              }}
            ></SideDetails>
          </MobileHandler>
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
}

export default Dashboard;
