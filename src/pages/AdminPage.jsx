import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import {
  Box,
  Button,
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
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function AdminPage() {
  const nav = useNavigate();
  const typeOptions = ["Dog", "Cat"];
  const connRef = collection(db, "pets");
  // const bookDocRef = doc(db, "books", "2JPFXswQJwhZXK4GXQ7R"); // 1 for fetching 1 data
  // const q = query(bookDocRef); // 1
  const q = query(connRef);
  const [pets, setPets] = useState([]);

  const logout = async () => {
    await signOut(auth);
    nav("/");
  };
  useEffect(() => {
    const getPets = async () => {
      // const lol = await getDoc(q); // 1
      // console.log(lol.data()); // 1
      onSnapshot(q, (snapshot) => {
        console.log(snapshot);
        const petsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(petsData);
        setPets(petsData);
      });
    };
    getPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function capFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <Flex flexDir={"column"}>
      <Navbar />
      <Box p={"30px"}>
        <Button my={"20px"} onClick={logout}>
          Logout
        </Button>
        <Flex>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {pets.map((val) => (
              <GridItem w="100%" h="10" bg="blue.500">
                <Card maxW="sm">
                  <CardBody>
                    <Image
                      w={"200px"}
                      h={"150px"}
                      src={
                        val.type === "Dog"
                          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-JlP4N5eo5T8JIXltsdCxqFZ2vItNLuJMiQ&usqp=CAU"
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGjOcJoSJnl29PSYV2u5BnqVqXVQex6mxeag&usqp=CAU"
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
