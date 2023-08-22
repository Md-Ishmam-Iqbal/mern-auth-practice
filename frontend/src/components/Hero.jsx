import {
  ButtonGroup,
  Card,
  CardBody,
  Center,
  Heading,
  Text,
  CardHeader,
  Container,
} from "@chakra-ui/react";
import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import NavButton from "./NavButton";

const Hero = () => {
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
            <NavButton text="sign in" icon={PiSignInDuotone} link={`/login`} />
            <NavButton
              text="sign up"
              icon={PiSignOutDuotone}
              link={`/register`}
            />
          </ButtonGroup>
        </Container>
      </Card>
    </Center>
  );
};

export default Hero;
