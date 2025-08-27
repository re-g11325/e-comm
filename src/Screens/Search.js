import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import WarningBar from "../Components/WarningBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";

function Search() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  React.useEffect(() => {
    _dispatch(
      setState({
        cart: [],
        profile: {},
      })
    );

    return () => {};
  }, []);

  return (
    <Box minH="100vh">
      <WarningBar></WarningBar>
      <Box>
        <Text>{"Search"}</Text>
        <Link to={"/companyTest"}>
          <Button>{"Default user"}</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Search;
