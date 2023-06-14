import { Button, SimpleGrid, Stack, Title } from "@mantine/core";
import { RegisterFormSchema } from "./Register";
import { useState } from "react";

const registerFail = { name: "fails" };
const registerSuccess = {
  email: "aaa@aaa.aa",
  password: "12345678",
  confirmPassword: "12345678",
};
const registerFailPasswords = {
  email: "aaa@aaa.aa",
  password: "12345678",
  confirmPassword: "eeeeeee",
};

export const Parse = () => {
  const [result, setResult] = useState<boolean | null>(null);

  const parse = (string: unknown) => {
    const res = RegisterFormSchema.safeParse(string);
    setResult(res.success);
    console.log(res);
    RegisterFormSchema.parse(string);
  };

  return (
    <Stack>
      <Title>Parse</Title>
      <SimpleGrid cols={3}>
        <Button color="red" onClick={() => parse(registerFail)}>
          fail
        </Button>
        <Button color="red" onClick={() => parse(registerFailPasswords)}>
          fail on password
        </Button>
        <Button color="green" onClick={() => parse(registerSuccess)}>
          success
        </Button>
      </SimpleGrid>
      {result !== null && (
        <Title color={result ? "green" : "red"}>
          {result ? "Success" : "Fail"}
        </Title>
      )}
    </Stack>
  );
};
