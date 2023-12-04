import {
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  GridItem,
  Heading,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { IoMdClose, IoMdPersonAdd } from "react-icons/io";
import db, { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function ModalAdd(props) {
  const initialState = { name: "", type: "", description: "" };
  const modalAdd = useDisclosure();
  const [addForm, setAddForm] = useState(initialState);
  const connRef = collection(db, "pets");

  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...addForm };
    tempobject[id] = value;
    setAddForm(tempobject);
  }
  function fileHandler(input) {
    const { files, id } = input.target;
    const tempobject = { ...addForm };
    tempobject[id] = files[0];
    setAddForm(tempobject);
  }
  async function addPet() {
    const imageRef = ref(storage, `images/${addForm.imageUrl?.name + v4()}`);
    await uploadBytes(imageRef, addForm?.imageUrl);
    const imageUrl = await getDownloadURL(imageRef);
    await addDoc(connRef, { ...addForm, imageUrl });
    modalAdd.onClose();
    setAddForm(initialState);
  }
  return (
    <>
      <GridItem onClick={modalAdd.onOpen} cursor={"pointer"}>
        <Card
          maxW="sm"
          height={"460px"}
          _hover={{ backgroundColor: "#ebe8e8" }}
        >
          <CardBody display={"flex"} flexDir={"column"}>
            <Flex justifyContent={"center"} my={"35px"}>
              <Icon as={IoMdPersonAdd} fontSize="5rem"></Icon>
            </Flex>
            <Stack mt="6" spacing="3">
              <Heading size="md">Add a new pet</Heading>
              <Text>Add a new pet</Text>
              <Text color="blue.600" fontSize="2xl">
                Add a new pet
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </GridItem>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalAdd.isOpen}
        onClose={modalAdd.onClose}
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
            <Center w={"100%"} fontWeight={700} fontSize={"1rem"}>
              Add New Pet
            </Center>
            <Flex flexDir={"row-reverse"}>
              <Button
                w={"30px"}
                onClick={() => {
                  modalAdd.onClose();
                  setAddForm(initialState);
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
                  <Flex fontWeight={"500"}>Pet Image</Flex>
                  <Flex>
                    <Input
                      multiple={false}
                      type="file"
                      _placeholder={{ opacity: "1" }}
                      id="imageUrl"
                      variant={"flushed"}
                      onChange={fileHandler}
                      placeholder="Pet's Name"
                    ></Input>
                  </Flex>
                  <Flex color={"red"} fontSize={"0.8rem"}>
                    {}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Flex fontWeight={"500"}>Name</Flex>
                  <Flex>
                    <Input
                      _placeholder={{ opacity: "1" }}
                      id="name"
                      variant={"flushed"}
                      value={addForm.name}
                      onChange={inputHandler}
                      placeholder="Pet's Name"
                    ></Input>
                  </Flex>
                  <Flex color={"red"} fontSize={"0.8rem"}>
                    {}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Flex fontWeight={"500"}>Type</Flex>
                  <Select
                    value={addForm.type}
                    id="type"
                    variant="flushed"
                    onChange={inputHandler}
                  >
                    <option selected hidden>
                      Select Pet Type
                    </option>
                    {props.typeOptions.map((val) => (
                      <option value={val}>{val}</option>
                    ))}
                  </Select>
                  <Flex color={"red"} fontSize={"0.8rem"}>
                    {}
                  </Flex>
                </Flex>
                <Flex flexDir={"column"}>
                  <Flex fontWeight={"500"}>Description</Flex>
                  <Flex>
                    <Input
                      _placeholder={{ opacity: "1" }}
                      id="description"
                      onChange={inputHandler}
                      value={addForm.description}
                      variant={"flushed"}
                      placeholder="Pet's Description"
                    ></Input>
                  </Flex>
                </Flex>

                <Flex py={"20px"} w={"100%"}>
                  <Button onClick={addPet} w={"100%"} borderRadius={"10px"}>
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
