import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Square,
} from "@chakra-ui/react";
import Header from "./components/header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Grid
      templateAreas={`"header" "header"
                  "main" "main"`}
      gap="10"
      fontWeight="bold"
      h="100vh"
    >
      <GridItem area={"header"}>
        <Header />
      </GridItem>
      <GridItem area={"main"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}

export default App;
