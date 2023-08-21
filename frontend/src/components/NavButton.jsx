import { Button, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ text, icon, link }) => {
  let navigate = useNavigate();
  let variant;
  let iconColor;
  text === "Sign Up" ? (variant = "solid") : (variant = "outline");
  text === "Sign Up" ? (iconColor = "white") : (iconColor = "teal.500");
  return (
    <Button
      colorScheme="teal"
      variant={variant}
      size="md"
      onClick={() => navigate(link)}
    >
      <Icon color={iconColor} boxSize={5} as={icon} />
      <Text fontWeight="light" px={2} fontSize={"md"}>
        {text}
      </Text>
    </Button>
  );
};

export default NavButton;
