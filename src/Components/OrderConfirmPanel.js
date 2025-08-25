import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { FaPaypal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import { createDocument } from "../Repos/Sanity";

function OrderConfirmPanel() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const [clientEmail, setclientEmail] = React.useState("");
  const [clientAddress, setclientAddress] = React.useState("");
  const [clientNotes, setclientNotes] = React.useState("");

  return (
    <Box flex="4" p="4" bg="gray.50" overflowY={"auto"}>
      <Card
        h={"100%"}
        border={"1px"}
        borderRight={"4px"}
        borderBottom={"4px"}
        borderColor={"grey"}
      >
        <Box p={2}>
          <FormControl isInvalid={clientEmail == ""} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={clientEmail} onChange={setclientEmail} />
            {!clientEmail == "" ? (
              <FormHelperText>
                Inserisci l'Email per rimanere aggiornato sull'ordine.
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                L'Email è necessaria per l'invio degli aggiornamenti
                sull'ordine.
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box p={2}>
          <FormControl isInvalid={clientAddress == ""} isRequired>
            <FormLabel>Indirizzo</FormLabel>
            <Input
              type="text"
              value={clientAddress}
              onChange={setclientAddress}
            />
            {!clientAddress == "" ? (
              <FormHelperText>
                Inserisci l'Indirizzo di consegna.
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                L'Indirizzo è necessario per la consegna.
              </FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box p={2}>
          <FormControl>
            <FormLabel>Note di consegna</FormLabel>
            <Textarea
              type="text"
              value={clientNotes}
              onChange={setclientNotes}
            />
            <FormHelperText>
              Inserisci annotazioni utili alla consegna.
            </FormHelperText>
          </FormControl>
        </Box>
        <Flex p={2} pt={4}>
          <Box flex={1}></Box>
          <Box>
            <Button
              variant={"solid"}
              bg={"green.300"}
              border={"1px"}
              borderRight={"4px"}
              borderBottom={"4px"}
              leftIcon={<Icon as={FaPaypal}></Icon>}
              onClick={() => {
                //get total
                var _totPrice = 0;
                (globalStore.cart ?? []).forEach((_item) => {
                  // console.log("cart item ", _item);
                  _totPrice += _item.activeVariantPrice;
                });
                //get email
                //get address
                //launch paypal
                //if payment is successful
                //create order
                var newOder = {
                  items: [...globalStore.cart],
                  totPrice: _totPrice,
                  clientEmail: clientEmail,
                  clientAddress: clientAddress,
                  clientNotes: clientNotes,
                };
                createDocument(newOder, () => {
                  _dispatch(
                    setState({ cart: [], centerNavigation: "thanksOrder" })
                  );
                });
              }}
            >
              Paga con PayPal o Carta
            </Button>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}

export default OrderConfirmPanel;
