import { Box, Card, Flex, Img, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject } from "../Stores/globalStore";

function ItemContainer(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  return globalStore.isMobile ? (
    <Box w={"100%"}>{props.children}</Box>
  ) : (
    <Flex w={"100%"}>{props.children}</Flex>
  );
}

function ProfileVisualizer(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  return (
    <Box flex="4" p="4" bg="gray.50" overflowY={"auto"} h={"100%"}>
      <Card
        h={"100%"}
        border={"1px"}
        borderRight={"4px"}
        borderBottom={"4px"}
        borderColor={"grey"}
        p={4}
      >
        {/* profile visualization */}
        <ItemContainer>
          <Box flex={1}>
            {globalStore.profile.imgSrc ? (
              <Img src={globalStore.profile.imgSrc ?? ""}></Img>
            ) : (
              <></>
            )}
          </Box>
          <Box flex={2} divider={2} pl={3}>
            <Text fontWeight={"semibold"}>{"Benvenuti da:"}</Text>
            <Text fontWeight={"bold"} fontSize={"2xl"}>
              {globalStore.profile.name}
            </Text>
            <Text>{globalStore.profile.description ?? ""}</Text>
          </Box>
        </ItemContainer>

        <Stack p={2} pt={4}>
          <Text fontWeight={"bold"} fontSize={"xl"}>
            {"Contatti"}
          </Text>
          {(globalStore.profile.contactInformations ?? []).map((_info) => (
            <Flex key={_info.name}>
              <Text fontWeight={"semibold"}>{_info.name + ": "}</Text>
              <Text pl={1}>{_info.description}</Text>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}

export default ProfileVisualizer;
