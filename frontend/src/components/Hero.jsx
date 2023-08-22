import {
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Heading,
  Text,
  CardHeader,
  Container,
  Button,
} from "@chakra-ui/react";
import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";
import NavButton from "./NavButton";
import { useSelector } from "react-redux";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Center>
      <Card
        w="4xl"
        px="24"
        variant="unstyled"
        py="16"
        _hover={{
          boxShadow: "xl",
          transition: "box-shadow 0.3s ease", // Add the transition property
        }}
        transition="box-shadow 0.3s ease"
      >
        <CardHeader>
          <Heading size="xl" color="teal.900">
            MERN Auth
          </Heading>
        </CardHeader>
        <CardBody>
          <Text color="teal.800" fontWeight="medium" fontSize="md">
            My MERN Authentication backend boilerplate. This client is just a
            placeholder to showcase the functionalities.
          </Text>
        </CardBody>
        <Container w="full" centerContent mt={8}>
          <ButtonGroup gap="6" mx={4}>
            {userInfo ? (
              <>
                <NavButton
                  text="profile"
                  icon={RiAccountCircleLine}
                  link={`profile`}
                />
              </>
            ) : (
              <>
                <NavButton
                  text="sign in"
                  icon={PiSignInDuotone}
                  link={`/login`}
                />
                <NavButton
                  text="sign up"
                  icon={PiSignOutDuotone}
                  link={`/register`}
                />
              </>
            )}
          </ButtonGroup>
        </Container>
      </Card>
    </Center>
  );
};

export default Hero;
