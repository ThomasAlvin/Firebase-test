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
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import db from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function ModalEdit(props) {
  const modalEdit = useDisclosure();
  const initialState = {
    type: props.type,
    name: props.name,
    description: props.description,
  };
  const [editForm, setEditForm] = useState(initialState);
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...editForm };
    tempobject[id] = value;
    setEditForm(tempobject);
  }
  async function editPet() {
    const bookDocRef = doc(db, "pets", props.id);
    await updateDoc(bookDocRef, editForm);
    modalEdit.onClose();
  }
  return (
    <>
      <Button onClick={modalEdit.onOpen} variant="solid" colorScheme="blue">
        Edit
      </Button>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalEdit.isOpen}
        onClose={modalEdit.onClose}
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
              //   onClick={console.log(editForm)}
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
                  modalEdit.onClose();
                  setEditForm(initialState);
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
                  <Flex fontWeight={"500"}>Name</Flex>
                  <Flex>
                    <Input
                      _placeholder={{ opacity: "1" }}
                      id="name"
                      value={editForm.name}
                      onChange={inputHandler}
                      variant={"flushed"}
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
                    value={editForm.type}
                    onChange={inputHandler}
                    id="type"
                    variant="flushed"
                  >
                    <option display="none" disabled selected hidden>
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
                      value={editForm.description}
                      onChange={inputHandler}
                      variant={"flushed"}
                      placeholder="Pet's Description"
                    ></Input>
                  </Flex>
                </Flex>

                <Flex py={"20px"} w={"100%"}>
                  <Button onClick={editPet} w={"100%"} borderRadius={"10px"}>
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
