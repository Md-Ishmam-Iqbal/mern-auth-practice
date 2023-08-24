import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { useToast } from "@chakra-ui/react";

import { useSignupMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import {
  Button,
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const chakraToast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading, error }] = useSignupMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // if userInfo is already there, navigate to home page
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  async function onSubmit(values) {
    try {
      const res = await signup({
        email: values.email,
        name: values.name,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      let error = err?.data?.message || err.error;
      chakraToast({
        title: "Error",
        description: error,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Center>
      <Card w="2xl" variant="outline" px="40" py="20" boxShadow="lg">
        <Center>
          <Heading pb={8} textTransform="uppercase" fontWeight={"medium"}>
            Sign Up
          </Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                placeholder="example@email.com"
                {...register("email", {
                  required: "This is required",
                  maxLength: {
                    value: 50,
                    message: "The email should have at most 50 characters",
                  },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Minimum length should be 6",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "This is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match", // Validation logic
                })}
              />
              <FormErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </FormErrorMessage>
            </FormControl>
            <Center>
              <Button
                mt={12}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
                fontWeight="light"
                px={6}
                fontSize={"lg"}
                textTransform="uppercase"
              >
                Sign Up
              </Button>
            </Center>
          </VStack>
        </form>
      </Card>
    </Center>
  );
};

export default RegisterForm;
