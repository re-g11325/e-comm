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

  const [totCartPrice, settotCartPrice] = React.useState(0);

  React.useEffect(() => {
    var _totPrice = 0;
    (globalStore.cart ?? []).forEach((_item) => {
      // console.log("cart item ", _item);
      _totPrice += _item.activeVariantPrice;
    });

    // console.log("_totPrice", _totPrice);
    settotCartPrice(_totPrice);

    return () => {};
  }, [globalStore.cart]);

  return (
    <Box flex="2" p="4" bg="gray.100" overflowY={"auto"} h={"100%"}>
      <Card border={"1px"} borderRight={"4px"} borderBottom={"4px"}>
        <CardHeader>
          <Flex>
            <Box flex={1}>
              <Heading size="md">Carrello</Heading>
            </Box>
            <Box>
              {(globalStore.cart ?? []).length > 0 ? (
                <Text>
                  {"Totale: " +
                    totCartPrice +
                    " " +
                    globalStore.cart[0].activeVariantCurrText}
                </Text>
              ) : (
                <></>
              )}
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack spacing={3} divider={<StackDivider />}>
            {groupAndSum(
              globalStore.cart ?? [],
              ["name", "activeVariantName", "activeVariantPrice"],
              ["qty"]
            ).map((_p, _i) => (
              <Flex key={_p.name + " " + _p.activeVariantName}>
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

                      // console.log("deleting from cart", index, newCart.length);
                      if (index > -1) {
                        newCart.splice(index, 1);
                      }
                      // console.log("deleted", newCart.length);
                      _dispatch(setState({ cart: [...newCart] }));
                    }}
                  >
                    {_p.qty}
                  </Button>
                </Box>
                <Box>
                  <Text as="samp">{_p.name}</Text>
                  <br></br>
                  <Text as="samp">{_p.activeVariantName}</Text>
                </Box>
              </Flex>
            ))}
          </Stack>
          <Flex p={2} pt={4}>
            <Box flex={1}></Box>
            <Box>
              {(globalStore.cart ?? []).length > 0 ? (
                <Button
                  variant={"solid"}
                  bg={"green.300"}
                  border={"1px"}
                  borderRight={"4px"}
                  borderBottom={"4px"}
                  onClick={() => {
                    props.onCartConfirm();
                    _dispatch(setState({ centerNavigation: "confirmOrder" }));
                  }}
                >
                  Completa L'ordine
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
}

export default SideDetails;
