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
} from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import EcommItemCard from "./EcommItemCard";

function CenterContent(props) {
  // console.log("center content props", props);

  return (
    <Box flex="4" p="4" bg="gray.50" overflowY={"auto"}>
      <Card
        // h={"100%"}
        border={"1px"}
        borderRight={"4px"}
        borderBottom={"4px"}
        borderColor={
          props.showProfile ? "black" : (props.items[0] ?? { color: "" }).color
        }
      >
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {props.items.map((_p, _i) => (
              <EcommItemCard
                key={_i}
                {..._p}
                isMobile={props.isMobile}
              ></EcommItemCard>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}

export default CenterContent;
