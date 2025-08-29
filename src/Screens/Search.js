import { Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import WarningBar from "../Components/WarningBar";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";

function Search() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchText, setsearchText] = React.useState("");

  React.useEffect(() => {
    //clear the selected profile
    _dispatch(
      setState({
        cart: [],
        profile: {},
      })
    );

    //show every profile present
    return () => {};
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <WarningBar></WarningBar>

      <Box w={"100%"} justifyItems={"center"}>
        <Box pt={2}>
          <Input
            type="text"
            value={searchText}
            onChange={(_e) => setsearchText(_e.target.value)}
          />
        </Box>
        <Box pt={2}>
          <Button
            onClick={() => {
              //search every profile that contains the search text
              //search in the code, name or the description
              //return every profile in the a list below, horizontal list
              //the visualizer of a profile must have the image, the name and a button that let's you navigate to that user
            }}
          >
            {"Cerca Utente"}
          </Button>
        </Box>
        <Box pt={2}>
          <Link to={"/companyTest"}>
            <Button>{"Default user"}</Button>
          </Link>
        </Box>
      </Box>
      <Box flex={1}></Box>
    </Box>
  );
}

export default Search;
