import React from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

function Sidebar(props) {
  // console.log("sidebar props", props);

  return (
    <Box flex={"1"} bg="gray.100" p="4" h="100%">
      <Card>
        <CardHeader>
          <Heading size="md">Prodotti</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {props.paths.map((_p, _i) => (
              <Button
                border={"1px"}
                borderRight={"4px"}
                borderBottom={"4px"}
                borderColor={_p.color}
                key={_i}
                mb="2"
                w="full"
                onClick={() => {
                  props.onClick(_p.nav);
                }}
              >
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {_p.nav}
                  </Heading>
                  <Text pt="2" fontSize="sm"></Text>
                </Box>
              </Button>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default Sidebar;
