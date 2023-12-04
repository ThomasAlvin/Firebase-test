import {
  Button,
  Center,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import db from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { IoMdClose } from "react-icons/io";

export default function ModalDelete(props) {
  const modalDelete = useDisclosure();

  async function deletePet() {
    const bookDocRef = doc(db, "pets", props.id);
    modalDelete.onClose();
    await deleteDoc(bookDocRef);
  }
  return (
    <>
      <Button onClick={modalDelete.onOpen} variant="solid" colorScheme="blue">
        Delete
      </Button>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalDelete.isOpen}
        onClose={modalDelete.onClose}
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
              Delete
            </Center>
            <Flex flexDir={"row-reverse"}>
              <Button
                w={"30px"}
                onClick={() => {
                  modalDelete.onClose();
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
              gap={"20px"}
              maxH={"600px"}
              flexDir={"column"}
            >
              <Flex
                gap={"10px"}
                flexDir={"column"}
                fontSize={"1.3rem"}
                color={"red"}
                fontWeight={600}
              >
                Are you sure you want to delete this pet?
              </Flex>
              <Flex py={"20px"} w={"100%"} gap={"30px"} justifyContent={"end"}>
                <Button
                  onClick={deletePet}
                  borderRadius={"10px"}
                  bgColor={"red"}
                  color={"white"}
                >
                  Delete
                </Button>
                <Button onClick={modalDelete.onClose} borderRadius={"10px"}>
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
