import {
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ModalLogin(props) {
  const nav = useNavigate();
  const modalLogin = useDisclosure();
  const initialState = {
    email: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(initialState);
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...loginForm };
    tempobject[id] = value;
    setLoginForm(tempobject);
  }
  async function logIn() {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
      nav("/admin");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Button
        display={auth.currentUser?.email ? "none" : "block"}
        onClick={modalLogin.onOpen}
        variant="solid"
        colorScheme="blue"
      >
        Log In
      </Button>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalLogin.isOpen}
        onClose={modalLogin.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader
            px={"10px"}
            display={"flex"}
            flexDir={"row"}
            justifyContent={"center"}
          >
            <Center
              //   onClick={console.log(loginForm)}
              w={"100%"}
              fontWeight={700}
              fontSize={"1rem"}
            >
              Edit
            </Center>
            <Flex flexDir={"row-reverse"}>
              <Button
                w={"30px"}
                onClick={() => {
                  modalLogin.onClose();
                  setLoginForm(initialState);
                }}
              >
                <Icon fontSize={"30px"} as={IoMdClose}></Icon>
              </Button>
            </Flex>
          </ModalHeader>

          <ModalBody maxH="500px" h={"500px"} maxW="500px">
            <Flex
              maxW={"500px"}
              w={"430px"}
              margin={0}
              maxH={"600px"}
              flexDir={"column"}
            >
              <Flex gap={"10px"} flexDir={"column"}>
                <Flex flexDir={"column"}>
                  <Flex
                    cursor={"pointer"}
                    onClick={() => console.log(auth.currentUser?.email)}
                    fontWeight={"500"}
                  >
                    Email
                  </Flex>
                  <Flex>
                    <Input
                      _placeholder={{ opacity: "1" }}
                      id="email"
                      value={loginForm.email}
                      onChange={inputHandler}
                      variant={"flushed"}
                      placeholder="input email"
                    ></Input>
                  </Flex>
                  <Flex color={"red"} fontSize={"0.8rem"}>
                    {}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Flex fontWeight={"500"}>Password</Flex>
                  <Flex>
                    <Input
                      _placeholder={{ opacity: "1" }}
                      id="password"
                      value={loginForm.password}
                      onChange={inputHandler}
                      variant={"flushed"}
                      placeholder="Input Password"
                    ></Input>
                  </Flex>
                </Flex>

                <Flex py={"20px"} w={"100%"}>
                  <Button onClick={logIn} w={"100%"} borderRadius={"10px"}>
                    Submit
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
