import { Button, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ text, icon, link }) => {
  let navigate = useNavigate();
  let variant;
  let iconColor;
  text === "sign up" ? (variant = "solid") : (variant = "outline");
  text === "sign up" ? (iconColor = "white") : (iconColor = "teal.500");
  return (
    <Button
      colorScheme="teal"
      variant={variant}
      size="md"
      onClick={() => navigate(link)}
    >
      {text === "logout" ? null : (
        <Icon color={iconColor} boxSize={5} as={icon} />
      )}
      <Text fontWeight="light" px={2} fontSize={"md"} textTransform="uppercase">
        {text}
      </Text>
    </Button>
  );
};

export default NavButton;
