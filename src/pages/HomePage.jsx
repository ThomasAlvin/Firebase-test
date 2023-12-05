import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { collection, onSnapshot, query } from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";
export default function HomePage() {
  const connRef = collection(db, "pets");
  const q = query(connRef);
  const [pets, setPets] = useState([]);
  const getPets = async () => {
    onSnapshot(q, (snapshot) => {
      const petsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(petsData);
    });
  };
  useEffect(() => {
    getPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  function capFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const auth = getAuth();
  // const provider = new GoogleAuthProvider();
  // async function googleSignIn() {
  //   const googleAuthProvider = new GoogleAuthProvider();
  //   try {
  //     console.log("mem");
  //     const res = await signInWithPopup(auth, googleAuthProvider);
  //     console.log("res google", { res });
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // }
  return (
    <div>
      <Navbar />
      <Box p={"30px"} mx={"50px"}>
        <Flex my={"20px"} alignItems={"center"} gap={"30px"}>
          <Heading>Hello, {auth.currentUser?.displayName || "Guest"}</Heading>
        </Flex>
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
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </div>
  );
}
