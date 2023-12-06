"use client";
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
export default function Navbar({ setSearchInput, searchInput, getPets }) {
  const nav = useNavigate();
  const navLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Support us",
      link: "#",
    },
    {
      name: "Location",
      link: "#",
    },
    {
      name: "Events",
      link: "#",
    },
    {
      name: "About us",
      link: "#",
    },
  ];
  const logout = async () => {
    await signOut(auth);
    nav("/");
  };
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      getPets();
    }
  }

  return (
    <Flex flexDir={"column"}>
      <Flex className="primary-color">
        <Flex
          w="100%"
          py="10px"
          px={{ base: "10px", md: "150px" }}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex
            gap={{ base: "10px", md: "60px" }}
            px={{ base: "10px", md: "0px" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex cursor={"pointer"}>
              <Link href="/">
                <Flex fontWeight={600} fontSize={{ base: "2rem", md: "3rem" }}>
                  <Flex color={"#94531f"}>Pet</Flex>
                  <Flex color={"#277819"}>Zone</Flex>
                </Flex>
              </Link>
            </Flex>
            <Flex
              display={{ base: "none", md: "flex" }}
              color={"#94531f"}
              fontSize={"18px"}
              fontWeight={700}
            >
              Because eveyone needs a home!
            </Flex>
          </Flex>
          <Flex
            gap={{ base: "10px", md: "50px" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <div class="input-group primary-color-reverse search-bar button-hover">
              <InputGroup>
                <Input
                  onKeyUp={handleKeyPress}
                  onChange={(val) => {
                    setSearchInput(val.target.value);
                  }}
                  value={searchInput}
                  type={"text"}
                  placeholder="Search"
                />
                <InputRightElement>
                  <Button onClick={getPets}>
                    <Icon w={"20px"} h={"20px"} as={IoSearch}></Icon>
                  </Button>
                </InputRightElement>
              </InputGroup>
            </div>
            <Box h={"40px"} w={"1px"} bgColor={"white"}></Box>
            <Flex
              justifyContent={"space-between"}
              display={{ base: "none", md: "flex" }}
              gap={"30px"}
              alignItems={"center"}
            >
              <Flex
                p={"3px"}
                gap={"30px"}
                className="navbar-sosmed"
                color={"#94531f"}
                fontWeight={600}
                fontSize={"1.4rem"}
              >
                <Flex
                  cursor={"pointer"}
                  onClick={
                    auth.currentUser?.email
                      ? logout
                      : () => {
                          nav("/login");
                        }
                  }
                >
                  {auth.currentUser?.email ? "Logout" : "Login"}
                </Flex>
                <Flex w={"1px"} bgColor={"#94531f"}></Flex>
                <Flex
                  cursor={"pointer"}
                  onClick={() => {
                    nav("/register");
                  }}
                >
                  Register
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        py="10px"
        px={{ sm: "30px", md: "150px" }}
        gap={"40px"}
        bgColor={"#94531f"}
        display={{ base: "none", md: "flex" }}
        color={"white"}
      >
        {navLinks.map((val) => (
          <Flex className="navbar-link animated-underline">
            <Link href={val.link}>{val.name}</Link>
          </Flex>
        ))}
      </Flex>
      <Flex
        display={{ base: "flex", md: "none" }}
        py="10px"
        px={"30px"}
        bgColor={"#94531f"}
        color={"white"}
      >
        <Flex gap={"40px"}>
          <Flex
            cursor={"pointer"}
            onClick={
              auth.currentUser?.email
                ? logout
                : () => {
                    nav("/login");
                  }
            }
          >
            {auth.currentUser?.email ? "Logout" : "Login"}
          </Flex>
          <Flex
            onClick={() => {
              nav("/register");
            }}
          >
            Register
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
