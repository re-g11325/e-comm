import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Img,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { getglobalStoreObject } from "../Stores/globalStore";
import { useDispatch, useSelector } from "react-redux";

function ItemContainer(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  return globalStore.isMobile ? (
    <Box w={"100%"}>{props.children}</Box>
  ) : (
    <Flex w={"100%"}>{props.children}</Flex>
  );
}

function EcommItemCard(props) {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const [activeVariant, setactiveVariant] = React.useState({});
  const [qty, setqty] = React.useState(1);
  //const [allVariantNames, setallVariantNames] = useState(second)

  React.useEffect(() => {
    setactiveVariant(props.variants[0]);
    // console.log("setting first time price", props.variants[0].price);

    return () => {};
  }, []);

  return (
    <Card
      border={"1px"}
      borderRight={"4px"}
      borderBottom={"4px"}
      borderColor={props.color}
    >
      <ItemContainer>
        {/* image */}
        <Box
          p={2}
          w={globalStore.isMobile ? "100%" : "40%"}
          h={globalStore.isMobile ? "20%" : "100%"}
        >
          <Img
            src={props.imgSrc}
            maxH={globalStore.isMobile ? "20Vh" : "30vh"}
          ></Img>
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
            <Flex flex={1}></Flex>
            <Flex alignItems={"center"} flex={2}>
              <Text>{"Quantità: "}</Text>
              <NumberInput
                w={"50%"}
                defaultValue={1}
                min={1}
                max={20}
                onChange={(valueString) => setqty(valueString)}
                value={qty}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button
                border={"1px"}
                borderRight={"4px"}
                borderBottom={"4px"}
                borderColor={props.color}
                ml={2}
                onClick={() => {
                  props.onAddToCart({
                    qty: qty,
                    activeVariant: activeVariant,
                  });
                  setqty(1);
                }}
              >
                {activeVariant.price + " " + activeVariant.curr}
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </ItemContainer>
    </Card>
  );
}

export default EcommItemCard;
