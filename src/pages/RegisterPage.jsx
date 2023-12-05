import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const nav = useNavigate();
  const toast = useToast();
  const handleKeyPress = useCallback((event) => {
    if (event.key === "Enter") {
      document.getElementById("submit").click();
    }
  }, []);

  const [seePassword, setSeePassword] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...registerForm };
    tempobject[id] = value;
    setRegisterForm(tempobject);
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerForm.email,
        registerForm.password
      );
      await updateProfile(user.user, { displayName: registerForm.username });
      nav("/admin");
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error occureda",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center
        mt={"50px"}
        flexDir={"column"}
        gap={"10px"}
        pt={"30px"}
        w={"100%"}
      >
        <Center flexDir={"column"} gap={"80px"}>
          <Center flexDir={"column"}>
            <Center gap={"12px"} flexDir={"column"}>
              <Center
                className={"loginpage-container"}
                flexDir={"column"}
                border={"1px solid #dbdbdb"}
              >
                <Center
                  py={"30px"}
                  fontSize={"28px"}
                  fontWeight={"700"}
                  color={"#94531f"}
                >
                  Register Admin
                </Center>
                <Center flexDir={"column"} className="loginpage-inputs">
                  <Input
                    h={"40px"}
                    type="email"
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="Email"
                    pl={"15px"}
                    onChange={inputHandler}
                    id="email"
                    w={"300px"}
                  ></Input>
                  <InputGroup>
                    <Input
                      h={"40px"}
                      w={"300px"}
                      pl={"15px"}
                      id="password"
                      bgColor={"#fafafa"}
                      onKeyPress={handleKeyPress}
                      onChange={inputHandler}
                      fontSize={"12px"}
                      type={seePassword ? "text" : "password"}
                      placeholder="Create your password"
                    ></Input>
                    <InputRightElement width={"2.5rem"} pr={"20px"} h={"100%"}>
                      <IconButton
                        colorScheme="whiteAlpha"
                        color={"grey"}
                        as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                        w={"24px"}
                        h={"24px"}
                        onClick={() => setSeePassword(!seePassword)}
                        cursor={"pointer"}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <Input
                    h={"40px"}
                    fontSize={"12px"}
                    bgColor={"#fafafa"}
                    placeholder="Username"
                    pl={"15px"}
                    onChange={inputHandler}
                    id="username"
                    w={"300px"}
                  ></Input>
                  <Button
                    mb={"40px"}
                    color={"white"}
                    borderRadius={"10px"}
                    id="submit"
                    h={"40px"}
                    w={"100%"}
                    fontSize={"1.6rem"}
                    onClick={register}
                    bgColor={"#94531f"}
                  >
                    Register
                  </Button>
                </Center>
              </Center>
            </Center>
          </Center>
          <Center
            flexWrap={"wrap"}
            className="loginpage-about"
            display={"flex"}
            color={"blackAlpha.700"}
            px={"10px"}
            gap={"20px"}
          >
            <Box fontSize={"13px"} cursor={"pointer"}>
              Meta
            </Box>{" "}
            <Box fontSize={"13px"} cursor={"pointer"}>
              About
            </Box>
            <Box fontSize={"13px"} cursor={"pointer"}>
              Blog
            </Box>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Jobs
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Help
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              API
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Privacy
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Terms
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Top Accounts
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Locations
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Neo Supermarket Lite
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Contact Uploading & Non-Users
            </Flex>
            <Flex fontSize={"13px"} cursor={"pointer"}>
              Meta Verified
            </Flex>
          </Center>
        </Center>
        <Center color={"blackAlpha.700"} gap={"20px"}>
          <Flex fontSize={"13px"}> English</Flex>
          <Flex fontSize={"13px"}> © 2023 PetZone from Meta</Flex>
        </Center>
      </Center>
    </>
  );
}
