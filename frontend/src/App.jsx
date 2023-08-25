import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"header" "header"
        "main" "main"`}
        gap="10"
        h="95vh"
      >
        <GridItem area={"header"}>
          <Header />
        </GridItem>
        <GridItem area={"main"}>
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
