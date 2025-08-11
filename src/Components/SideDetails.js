import {
  Box,
  Button,
  CardHeader,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import React from "react";

function SideDetails(props) {
  return (
    <Box flex="2" p="4" bg="gray.100" h="100%">
      <Card h={"100%"} border={"1px"} borderRight={"4px"} borderBottom={"4px"}>
        <CardHeader>
          <Heading size="md">Carrello</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={3}>
            {props.details.map((_p, _i) => (
              <Text as="samp" key={_i}>
                {_p.description}
              </Text>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default SideDetails;
