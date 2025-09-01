import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject } from "../Stores/globalStore";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Flex,
  Img,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import BoxFlexMobile from "./BoxFlexMobile";

function ProfilePreview(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  return (
    <Box p={2} mr={2} mb={2}>
      <Card
        border={"1px"}
        borderRight={"4px"}
        borderBottom={"4px"}
        borderColor={props.color ?? "black"}
      >
        <BoxFlexMobile>
          {/* image */}
          <Box
            p={2}
            w={globalStore.isMobile ? "100%" : "40%"}
            h={globalStore.isMobile ? "20%" : "100%"}
          >
            <Img
              src={props.imgSrc}
              maxH={globalStore.isMobile ? "20Vh" : "30vh"}
            ></Img>
          </Box>
          {/* core */}
          <Stack mt="6" spacing="3" p={2}>
            <Heading size="md">{props.name}</Heading>
            <Text>{props.description}</Text>

            {/* bottom part */}
            <Flex>
              <Flex flex={2}></Flex>
              <Flex alignItems={"center"} flex={1}>
                <Link to={props.link}>
                  <Button
                    border={"1px"}
                    borderRight={"4px"}
                    borderBottom={"4px"}
                    borderColor={props.color ?? "black"}
                    ml={2}
                    onClick={() => {}}
                  >
                    {"Apri Store"}
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Stack>
        </BoxFlexMobile>
      </Card>
    </Box>
  );
}

export default ProfilePreview;
