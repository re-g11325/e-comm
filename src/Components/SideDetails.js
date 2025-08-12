import {
  Box,
  Button,
  CardHeader,
  Flex,
  Heading,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import { groupAndSum } from "../Repos/Utils";
import { CloseIcon } from "@chakra-ui/icons";

function SideDetails(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();
  return (
    <Box flex="2" p="4" bg="gray.100" overflowY={"auto"} h={"100%"}>
      <Card border={"1px"} borderRight={"4px"} borderBottom={"4px"}>
        <CardHeader>
          <Heading size="md">Carrello</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={3} divider={<StackDivider />}>
            {groupAndSum(
              globalStore.cart ?? [],
              ["name", "activeVariantName", "activeVariantPrice"],
              ["qty"]
            ).map((_p, _i) => (
              <Flex>
                <Box p={2}>
                  <Button
                    variant={"ghost"}
                    leftIcon={<CloseIcon></CloseIcon>}
                    onClick={() => {
                      var newCart = [...globalStore.cart];
                      const index = newCart.findIndex(
                        (obj) =>
                          obj.name + obj.activeVariantName ===
                          _p.name + _p.activeVariantName
                      );

                      console.log("deleting from cart", index, newCart.length);
                      if (index > -1) {
                        newCart.splice(index, 1);
                      }
                      console.log("deleted", newCart.length);
                      _dispatch(setState({ cart: [...newCart] }));
                    }}
                  ></Button>
                </Box>
                <Box key={_p.name + " " + _p.activeVariantName}>
                  <Text as="samp">{_p.name + " " + _p.activeVariantName}</Text>
                  <br></br>
                  <Text as="samp">
                    {_p.activeVariantPrice + " x " + _p.qty}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default SideDetails;
