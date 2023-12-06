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
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";
export default function HomePage() {
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
      <Navbar
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        getPets={getPets}
      />
      <Box p={"30px"} mx={{ base: "10px", md: "50px" }}>
        <Flex my={"20px"} alignItems={"center"} gap={"30px"}>
          <Heading>Hello, {auth.currentUser?.displayName || "Guest"}</Heading>
        </Flex>
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
                <Card maxW="sm">
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
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </div>
  );
}
