import { HamburgerIcon, StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject } from "../Stores/globalStore";

function TopNavbar(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();
  return (
    <Flex
      w="100%"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      p={4}
      justifyContent={"space-between"}
    >
      {globalStore.isMobile ? (
        <Button
          leftIcon={<HamburgerIcon></HamburgerIcon>}
          onClick={() => {
            props.onLeftSideOpen();
          }}
        >
          Menu
        </Button>
      ) : (
        <></>
      )}

      {globalStore.profile ? (
        <Button onClick={props.onProfileClick}>
          <Box p={1}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={globalStore.profile.name}
                src={globalStore.profile.imgSrc}
              />

              {globalStore.isMobile ? (
                <></>
              ) : (
                <Box>
                  <Heading size="sm">{globalStore.profile.name}</Heading>
                  <Text></Text>
                </Box>
              )}
            </Flex>
          </Box>
        </Button>
      ) : (
        <></>
      )}

      {globalStore.isMobile &&
      globalStore.centerNavigation != "confirmOrder" ? (
        <Button
          rightIcon={<StarIcon></StarIcon>}
          onClick={() => {
            props.onRightSideOpen();
          }}
        >
          Carrello
        </Button>
      ) : (
        <></>
      )}
    </Flex>
  );
}

export default TopNavbar;
