import { HamburgerIcon } from "@chakra-ui/icons";
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

function WarningBar(props) {
  return (
    <Flex
      w="100%"
      bg="red"
      color={"white"}
      borderBottom="1px"
      borderColor="gray.200"
      p={4}
      justifyContent={"space-around"}
    >
      <Text>this is a sandbox site (NO COMMERCIAL USE) </Text>
    </Flex>
  );
}

export default WarningBar;
