import { Container, Img, Text } from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Login";

export default function LoginPage() {
  return (
    <Container centerContent>
      {/* <Img
        src= "../Images/Car_1.jpg"
        h="100%"
        w="100%"
        shadow="base"
      /> */}
      <br />
      {/* <Text fontSize="lg" fontWeight="bold">
        Enter Details To Login
      </Text> */}
      <Login />
    </Container>
  );
}
