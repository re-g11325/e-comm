import { CloseIcon } from "@chakra-ui/icons";
import { Box, Button, CloseButton, Slide } from "@chakra-ui/react";
import React from "react";

function MobileHandler(props) {
  return props.isMobile ? (
    <Slide
      direction={props.direction}
      in={props.isOpen}
      style={{ zIndex: 10, height: "100vh" }}
    >
      <Box p={2} bg={"gray.600"} color={"white"}>
        <Button
          leftIcon={<CloseIcon></CloseIcon>}
          onClick={props.onClose}
        ></Button>
      </Box>
      {props.children}
    </Slide>
  ) : (
    props.children
  );
}

export default MobileHandler;
