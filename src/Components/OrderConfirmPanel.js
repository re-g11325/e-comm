import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
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
import PayPalRepository from "../Repos/PayPalRepository";

function OrderConfirmPanel() {
  const toast = useToast();

  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const [clientEmail, setclientEmail] = React.useState("");
  const [clientAddress, setclientAddress] = React.useState("");
  const [clientNotes, setclientNotes] = React.useState("");

  const [webUrl, setwebUrl] = React.useState("");

  const LaunchPayPalOrder = async (_order, _onSuccess) => {
    try {
      // console.log("props", props.route);
      // var newOder = {
      //   _type: "order",
      //   items: [...globalStore.cart],
      //   totPrice: _totPrice,
      //   clientEmail: clientEmail,
      //   clientAddress: clientAddress,
      //   clientNotes: clientNotes,
      //   orderNumber:
      //     globalStore.profile.code.substring(0, 3).toUpperCase() +
      //     generateUniqueOrderNum(),
      // };
      console.log("order for paypal ", _order);
      const orderDetails = PayPalRepository.getOrderDetails(
        "Ordine #" + _order.orderNumber,
        "Recapito Email " +
          _order.clientEmail +
          " - Indirizzo: " +
          _order.clientAddress,
        1,
        _order.totPrice,
        _order.items[0].activeVariantCurr
      );
      // console.log("getOrderDetails", JSON.stringify(orderDetails));
      const token = await PayPalRepository.generateToken(
        globalStore.profile.ppClientId,
        globalStore.profile.ppSecretKey
      );
      // console.log("generateToken", token);
      const res = await PayPalRepository.createOrder(orderDetails, token);
      // console.log("createOrder res", res);

      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == "approve");
        //window.open(findUrl.href, "_blank", "width=500,height=700");
        setwebUrl(findUrl.href);
      }
    } catch (error) {
      console.log("onLoad, paypal ", error);
    }
  };

  const onUrlChange = (event) => {
    const iframe = event.target;
    const url = iframe.contentWindow.location.href; // full URL
    // console.log("onUrlChange webviewState ", webviewState);
    if (url.includes("https://example.com/cancel")) {
      clearPaypalState();
      return;
    }
    if (url.includes("https://example.com/return")) {
      // const urlValues = queryString.parseUrl(webviewState.url);
      // console.log('my urls value', urlValues);
      // const {token} = urlValues.query;
      // if (!!token) {
      // }
      paymentSucess("");
      return;
    }
  };
  const paymentSucess = async (_order) => {
    try {
      clearPaypalState();
    } catch (error) {
      console.log("error raised in payment capture", error);
    }
  };
  const clearPaypalState = () => {
    setwebUrl(null);
  };

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
            <Text size="md">
              {"Costo Totale Articoli: " +
                globalStore.cart.reduce(
                  (acc, obj) => acc + obj.activeVariantPrice,
                  0
                ) +
                " " +
                globalStore.cart[0].activeVariantCurrText}
            </Text>
            {globalStore.profile.additionalCosts.map((_a) => (
              <Text p={1} key={_a.name}>
                {_a.name + ": " + _a.price + " " + _a.currText}
              </Text>
            ))}
            <Heading size="md">
              {"Costo Totale: " +
                (globalStore.cart.reduce(
                  (acc, obj) => acc + obj.activeVariantPrice,
                  0
                ) +
                  globalStore.profile.additionalCosts.reduce(
                    (acc, obj) => acc + obj.price,
                    0
                  )) +
                " " +
                globalStore.cart[0].activeVariantCurrText}
            </Heading>

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

                (globalStore.profile.additionalCosts ?? []).forEach((_item) => {
                  // console.log("cart item ", _item);
                  _totPrice += _item.price;
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

                LaunchPayPalOrder(newOder, () => {
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
                });
              }}
              p={1}
            >
              Paga con PayPal o Carta
            </Button>
            {webUrl ? (
              <Flex
                position="fixed"
                inset="0"
                bg="white"
                zIndex="overlay"
                align="center"
                justify="center"
              >
                <iframe src={webUrl} onLoad={onUrlChange} />
              </Flex>
            ) : (
              <></>
            )}
          </Box>
        </Flex>
      </Card>
    </Box>
  );
}

export default OrderConfirmPanel;
