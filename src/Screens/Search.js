import { Box, Button, Card, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import WarningBar from "../Components/WarningBar";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getglobalStoreObject, setState } from "../Stores/globalStore";
import {
  getDocument,
  getProfiles,
  setApiKey,
  setProjectId,
} from "../Repos/Sanity";
import ProfilePreview from "../Components/ProfilePreview";
import BoxFlexMobile from "../Components/BoxFlexMobile";

function Search() {
  const globalStore = useSelector(getglobalStoreObject);
  const _dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchText, setsearchText] = React.useState("");
  const [foundProfiles, setfoundProfiles] = React.useState([]);

  React.useEffect(() => {
    //clear the selected profile
    _dispatch(
      setState({
        cart: [],
        profile: {},
      })
    );
    setApiKey(
      "sknBIYosJg0588ZEQTWD0IJN24gMzq0iDUpfxO7kCcPIjieyUjOgCrr5yYnhD0zvMlB3Jh6CQSpoVvPAEYjRmmfkCIrUQyUEyQd5Pa1mTDUJXxIoiHNnT86P0F4J71x3UZuDwFUZ1pw1vJqgLxF2SECRXNL0DS3w5wm34mkUqEFtLjtcvfEm"
    );
    setProjectId("2kwpmrhw");
    navigate("/");

    document.title = "Ricerca";

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
              getDocument(
                {
                  _type: "profile",
                  keywords: searchText,
                },
                (_profiles) => {
                  if (_profiles.length < 1) {
                    return;
                  }
                  setfoundProfiles(_profiles);
                },
                ["jsonString", "name"]
              );
              //search in the code, name or the description
              //return every profile in the a list below, horizontal list
              //the visualizer of a profile must have the image, the name and a button that let's you navigate to that user
            }}
          >
            {"Cerca Utente"}
          </Button>
        </Box>
        {/* <Box pt={2}>
          <Link to={"/companyTest"}>
            <Button>{"Default user"}</Button>
          </Link>
        </Box> */}
      </Box>
      <BoxFlexMobile flex={1} pt={2}>
        {foundProfiles.map((_p) => (
          <ProfilePreview
            key={_p.name}
            {...JSON.parse(_p.jsonString).profile}
            link={_p.name}
          ></ProfilePreview>
        ))}
      </BoxFlexMobile>
    </Box>
  );
}

export default Search;
