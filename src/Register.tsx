import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, Title } from "@mantine/core";
import { z } from "zod";
import { LoginFormSchema } from "./Login";

const ZodPassword = z.string().min(4);

export const RegisterFormSchema = LoginFormSchema.merge(
  z.object({
    confirmPassword: ZodPassword,
  })
).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["password"],
});

export type RegisterFormType = z.infer<typeof RegisterFormSchema>;

export const Register = () => {
  const form = useForm<RegisterFormType>({
    validate: zodResolver(RegisterFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Box w={340}>
      <Title>Password</Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          mt="sm"
          type="password"
          {...form.getInputProps("password")}
        />
        <TextInput
          withAsterisk
          label="Confirm password"
          placeholder="confirm password"
          mt="sm"
          type="password"
          {...form.getInputProps("confirmPassword")}
        />

        <Group position="right" mt="xl">
          <Button disabled={!form.isValid()} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
