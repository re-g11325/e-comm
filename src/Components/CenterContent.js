import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import EcommItemCard from "./EcommItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import { generateUniqueOrderNum } from "../Repos/Utils";

function CenterContent(props) {
  // console.log("center content props", props);
  const toast = useToast();

  // console.log("unique order number", generateUniqueOrderNum());

  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();
  return (
    <Box flex="4" p="4" bg="gray.50" overflowY={"auto"}>
      <Card
        // h={"100%"}
        border={"1px"}
        borderRight={"4px"}
        borderBottom={"4px"}
        borderColor={"grey"}
      >
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {props.items.map((_p, _i) => (
              <EcommItemCard
                key={_p.name}
                {..._p}
                onAddToCart={(_details) => {
                  //activeVariant
                  //qty
                  var newCart = [...(globalStore.cart ?? [])];

                  for (let index = 0; index < _details.qty; index++) {
                    var newCartItem = {
                      ..._p,
                      activeVariantName: _details.activeVariant.name,
                      activeVariantPrice: _details.activeVariant.price,
                      activeVariantCurr: _details.activeVariant.curr,
                      activeVariantCurrText: _details.activeVariant.currText,
                      //
                      qty: 1,
                    };
                    newCart = newCart.concat(newCartItem);
                  }

                  _dispatch(
                    setState({
                      cart: newCart,
                    })
                  );

                  toast({
                    title: "Aggiunto con successo!",
                    description:
                      _details.qty +
                      " " +
                      _p.name +
                      " aggiunt" +
                      (_details.qty > 1 ? "i" : "o") +
                      " al carrello",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
              ></EcommItemCard>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default CenterContent;
