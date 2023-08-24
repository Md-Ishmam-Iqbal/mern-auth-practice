import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { FormHelperText, useToast } from "@chakra-ui/react";

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

import { useUpdateUserMutation } from "../slices/usersApiSlice";

const Profile = () => {
  const chakraToast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  async function onSubmit(values) {
    if (!values.password) {
      // Pass the existing password
      values.password = userInfo.password;
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        email: values.email,
        name: values.name,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      chakraToast({
        title: "Success",
        description: "Your profile has been updated.",
        status: "success",
        duration: 8000,
        isClosable: true,
        position: "top",
      });
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
            Update Profile
          </Heading>
        </Center>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                defaultValue={`${userInfo.name}`}
                {...register("name", {
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
                defaultValue={`${userInfo.email}`}
                {...register("email", {
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
                placeholder="New Password"
                {...register("password", {
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
            <Center>
              <Button
                mt={12}
                colorScheme="teal"
                isLoading={isSubmitting || isLoading}
                type="submit"
                fontWeight="light"
                px={6}
                fontSize={"lg"}
                textTransform="uppercase"
              >
                Update
              </Button>
            </Center>
          </VStack>
        </form>
      </Card>
    </Center>
  );
};

export default Profile;
