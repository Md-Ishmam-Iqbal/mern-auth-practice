import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Stack,
  Text,
  CardHeader,
  Container,
} from "@chakra-ui/react";
import { PiSignInDuotone, PiSignOutDuotone } from "react-icons/pi";
import NavButton from "./NavButton";

const Hero = () => {
  return (
    <Center>
      <Card w="4xl" boxShadow="dark-lg" px="24" py="16">
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
            <NavButton text="Sign In" icon={PiSignInDuotone} link={`/login`} />
            <NavButton
              text="Sign Up"
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
