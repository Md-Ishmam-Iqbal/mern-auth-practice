import { Box, ButtonGroup, Flex, Heading, Spacer } from "@chakra-ui/react";
import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import NavButton from "./NavButton";

const Header = () => {
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
      <ButtonGroup gap="6" mx={4}>
        <NavButton text="Sign In" icon={PiSignInDuotone} link={`/login`} />
        <NavButton text="Sign Up" icon={PiSignOutDuotone} link={`/register`} />
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
