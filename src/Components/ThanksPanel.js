import { Box, Card, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject } from "../Stores/globalStore";

function ThanksPanel() {
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
        <Box flex={2} divider={5} pl={3}>
          <Text fontWeight={"bold"} fontSize={"2xl"} pt={2}>
            {"Grazie per aver ordinato da noi!"}
          </Text>
          <Text fontWeight={"semibold"} pt={2}>
            {"Il tuo riferimento dell'ordine è #" +
              globalStore.lastOrder.orderNumber}
          </Text>
          <Text fontWeight={"semibold"} pt={2}>
            {"Invieremo aggiornamenti sull'ordine a " +
              globalStore.lastOrder.clientEmail}
          </Text>
          <Text fontWeight={"bold"} pt={2}>
            {"Il numero di ordine sarà presente anche sulla ricevuta "}
          </Text>
        </Box>
      </Card>
    </Box>
  );
}

export default ThanksPanel;
