import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const NavItems = [
    { name: "Home", link: "/" },
    { name: "Login", link: "/login" },
    { name: "Register", link: "/register" },
  ];
  return (
    <Flex
      justifyContent={"space-around"}
      py={"10px"}
      bgColor={"#cf8040"}
      alignItems={"center"}
    >
      <Flex
        cursor={"pointer"}
        onClick={() => {
          nav("/");
        }}
        fontSize={"3rem"}
        alignItems={"center"}
        fontWeight={700}
      >
        <Box mb={"5px"} color={"#94531f"}>
          Pet
        </Box>
        <Box mb={"5px"} color={"#277819"}>
          Zone
        </Box>
      </Flex>
      <Flex
        fontSize={"2rem"}
        alignItems={"center"}
        color={"#cf8040"}
        gap={"50px"}
        fontWeight={500}
      >
        {NavItems.map((val) => (
          <Flex
            px={"15px"}
            backgroundColor={"#94531f"}
            borderRadius={"10px"}
            cursor={"pointer"}
            onClick={() => {
              nav(val.link);
            }}
          >
            {val.name}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
