import React from "react";
import { useSelector } from "react-redux";
import { getglobalStoreObject } from "../Stores/globalStore";
import { Box, Flex } from "@chakra-ui/react";

function BoxFlexMobile(props) {
  const globalStore = useSelector(getglobalStoreObject);

  return globalStore.isMobile ? (
    <Box w={"100%"}>{props.children}</Box>
  ) : (
    <Flex w={"100%"}>{props.children}</Flex>
  );
}

export default BoxFlexMobile;
