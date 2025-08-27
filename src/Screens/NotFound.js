import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      alignItems={"center"}
      justifyContent={"space-around"}
      h={"100%"}
      w={"100%"}
    >
      <Text>{"Pagina non trovata"}</Text>

      <Link to={"/"}>
        <Button>go back home</Button>
      </Link>
    </Box>
  );
}

export default NotFound;
