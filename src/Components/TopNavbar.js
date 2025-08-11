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

function TopNavbar(props) {
  return (
    <Flex
      w="100%"
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
      p={4}
      justifyContent={"space-between"}
    >
      <Button
        leftIcon={<HamburgerIcon></HamburgerIcon>}
        onClick={() => {
          props.onLeftSideOpen();
        }}
      >
        Menu
      </Button>

      <Button
        rightIcon={<StarIcon></StarIcon>}
        onClick={() => {
          props.onRightSideOpen();
        }}
      >
        Carrello
      </Button>
    </Flex>
  );
}

export default TopNavbar;
