import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function Navbar() {
  return (
    <Flex
      justifyContent={"space-between"}
      px={"200px"}
      py={"10px"}
      bgColor={"#cf8040"}
      alignItems={"center"}
    >
      <Flex fontSize={"3rem"} fontWeight={700}>
        <Box color={"#94531f"}>Pet</Box>
        <Box color={"#277819"}>Zone</Box>
      </Flex>
      <Flex
        fontSize={"2rem"}
        color={"#94531f"}
        alignItems={"center"}
        gap={"50px"}
      >
        <Flex>Home</Flex>
        <Flex>About</Flex>
        <Flex>Contact</Flex>
      </Flex>
    </Flex>
  );
}
