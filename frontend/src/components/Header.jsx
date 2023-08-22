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
} from "@chakra-ui/react";
import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import NavButton from "./NavButton";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate(`/`);
    } catch (err) {
      console.log(err);
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
      {userInfo ? (
        <>
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="teal"
              fontWeight="light"
              px={4}
              fontSize={"lg"}
              textTransform="uppercase"
            >
              {userInfo.name}
            </MenuButton>
            <MenuList>
              <ChakraLink as={Link} to={`/profile`}>
                <MenuItem>Profile</MenuItem>
              </ChakraLink>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
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
