import {
  Box,
  ButtonGroup,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Button,
  useDisclosure,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalHeader,
} from "@chakra-ui/react";
import {
  PiSignInDuotone,
  PiSignOutDuotone,
} from "react-icons/pi";
import {
  HiUserCircle
} from "react-icons/hi";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useState } from "react";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      await logoutApiCall().unwrap();
      dispatch(logout());
      onClose();
      navigate(`/`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Flex
      bg="whiteAlpha.500"
      w="100%"
      p={3}
      minWidth="max-content"
      alignItems="center"
      gap="2"
      boxShadow="dark-lg"
      color="teal.800"
    >
      <Box p="2" px="8">
        <ChakraLink as={Link} to={`/`}>
          <Heading size="md" fontWeight="light">
            MERN Auth
          </Heading>
        </ChakraLink>
      </Box>
      <Spacer />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader fontSize={30} mt={7} mb={20}>
            Are you sure you want to logout?
          </ModalHeader>
          <ModalFooter pb={7}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              onClick={logoutHandler}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {userInfo ? (
        <>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              fontWeight="light"
              mx={"4"}
              fontSize={"lg"}
              textTransform="uppercase"
              leftIcon={<HiUserCircle size={"26"} mr={2} />}
              _expanded={{
                borderWidth: "1px",
                borderColor: "teal.500",
                color: "teal.500",
                backgroundColor: "teal.50",
              }}
            >
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate(`/`)}>Home</MenuItem>
              <MenuItem onClick={() => navigate(`/profile`)}>Profile</MenuItem>
              <MenuItem color={"red.400"} onClick={onOpen}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ) : (
        <>
          <ButtonGroup gap="6" mx={4}>
            <NavButton text="sign in" icon={PiSignInDuotone} link={`/login`} />
            <NavButton
              text="sign up"
              icon={PiSignOutDuotone}
              link={`/register`}
            />
          </ButtonGroup>
        </>
      )}
    </Flex>
  );
};

export default Header;
