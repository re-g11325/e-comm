import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Img,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";

function ItemContainer(props) {
  return props.isMobile ? (
    <Box w={"100%"}>{props.children}</Box>
  ) : (
    <Flex w={"100%"}>{props.children}</Flex>
  );
}

function EcommItemCard(props) {
  const [activeVariant, setactiveVariant] = React.useState(0);
  const [qty, setqty] = React.useState(1);
  //const [allVariantNames, setallVariantNames] = useState(second)

  React.useEffect(() => {
    setactiveVariant(props.variants[0]);
    // console.log("setting first time price", props.variants[0].price);

    return () => {};
  }, [props.variants]);

  return (
    <Card>
      <ItemContainer isMobile={props.isMobile}>
        {/* image */}
        <Box
          p={2}
          w={props.isMobile ? "100%" : "40%"}
          h={props.isMobile ? "20%" : "100%"}
        >
          <Img src={props.imgSrc} maxH={props.isMobile ? "20Vh" : "30vh"}></Img>
        </Box>
        {/* core */}
        <Stack mt="6" spacing="3" p={2}>
          <Heading size="md">{props.name}</Heading>
          <Text>{props.description}</Text>

          <Box>
            <Select
              placeholder=""
              variant={"outline"}
              onChange={(_e) => {
                //console.log("onchanged select", _p);
                //get the variant with the current name
                setactiveVariant(
                  props.variants.filter((_p) => _p.name == _e.target.value)[0]
                );
              }}
            >
              {props.variants.map((_p) => (
                <option key={_p.name} value={_p.name}>
                  {_p.name}
                </option>
              ))}
            </Select>
          </Box>
          {/* bottom part */}
          <Flex>
            <Box flex={1}></Box>
            <Box>
              <Button>{activeVariant.price + " " + activeVariant.curr}</Button>
            </Box>
          </Flex>
        </Stack>
      </ItemContainer>
    </Card>
  );
}

export default EcommItemCard;
