import { Center, Stack } from "@mantine/core";
import { Login } from "./Login";
import { Register } from "./Register";
import { Regex } from "./Regex";
import { CheckboxesAndNumbers } from "./CheckboxesAndNumbers";
import { Complex } from "./Complex";
import { Parse } from "./Parse";

function App() {
  return (
    <Center pt={50} pb={200}>
      <Stack spacing={400}>
        <Login />
        <Register />
        <Regex />
        <CheckboxesAndNumbers />
        <Complex />
        <Parse />
      </Stack>
    </Center>
  );
}

export default App;
