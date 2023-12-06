import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";
import ModalDelete from "../components/ModalDelete";
export default function AdminPage() {
  const typeOptions = ["Dog", "Cat"];
  const connRef = collection(db, "pets");
  let q = query(connRef);
  const [pets, setPets] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getPets = async () => {
    if (searchInput) {
      q = query(
        connRef,
        where("name", ">=", searchInput),
        where("name", "<", searchInput + "\uf8ff")
      );
    }
    onSnapshot(q, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(petsData);
    });
  };
  function capFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <Flex flexDir={"column"}>
      <Navbar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        getPets={getPets}
      />
      <Box p={"30px"} mx={{ base: "10px", md: "50px" }}>
        <Heading mb={"20px"}>
          Hello, {auth.currentUser?.displayName || "Guest"}
        </Heading>
        <Flex justifyContent={"center"}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={6}
          >
            {pets.map((val) => (
              <GridItem bg="blue.500" boxShadow={"0 0 5px rgba(0, 0, 0, 0.3)"}>
                <Card maxW="sm" borderRadius={"0px"}>
                  <CardBody>
                    <Image
                      w={"200px"}
                      h={"160px"}
                      src={
                        val.imageUrl ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS_lSNw7Ee7u6J7SWu5Ku6BP6H3kMcOI9TFw&usqp=CAU"
                      }
                      alt="Pet Image"
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md">{capFirst(val.name)}</Heading>
                      <Text w={"200px"} h={"80px"}>
                        {val.description}
                      </Text>
                      <Text color="blue.600" fontSize="2xl">
                        {capFirst(val.type)}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <ModalEdit
                        type={val.type}
                        name={val.name}
                        description={val.description}
                        id={val.id}
                        typeOptions={typeOptions}
                      />
                      <ModalDelete id={val.id} />
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
            <ModalAdd typeOptions={typeOptions} />
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
}
