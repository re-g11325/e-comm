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
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaPaypal } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import { createDocument } from "../Repos/Sanity";
import { generateUniqueId, generateUniqueOrderNum } from "../Repos/Utils";

function OrderConfirmPanel() {
  const toast = useToast();

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
            <Input
              type="email"
              value={clientEmail}
              onChange={(_e) => setclientEmail(_e.target.value)}
            />
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
              onChange={(_e) => setclientAddress(_e.target.value)}
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
              onChange={(_e) => {
                // console.log("new text val", _newval);
                setclientNotes(_e.target.value);
              }}
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
                //check required fields
                if (clientEmail == "") {
                  toast({
                    title: "Campi non validi!",
                    description: "Email non valida",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }
                if (clientAddress == "") {
                  toast({
                    title: "Campi non validi!",
                    description: "Indirizzo non valido",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                  return;
                }

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
                  _type: "order",
                  items: [...globalStore.cart],
                  totPrice: _totPrice,
                  clientEmail: clientEmail,
                  clientAddress: clientAddress,
                  clientNotes: clientNotes,
                  orderNumber:
                    globalStore.profile.code.substring(0, 3).toUpperCase() +
                    generateUniqueOrderNum(),
                };
                createDocument(newOder, () => {
                  toast({
                    title: "Ordine creato con successo!",
                    description: "",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  _dispatch(
                    setState({
                      cart: [],
                      centerNavigation: "thanksOrder",
                      lastOrder: newOder,
                    })
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
