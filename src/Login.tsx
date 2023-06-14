import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, Title } from "@mantine/core";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email().min(3).optional(),
  password: z.string().min(4),
});

type LoginFormType = z.infer<typeof LoginFormSchema>;

export const Login = () => {
  const form = useForm<LoginFormType>({
    validate: zodResolver(LoginFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box w={340}>
      <Title>Login</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        {/* 
        <TextInput
          withAsterisk
          label="Email"
          error={errors?.email?.message}
          {...register("email")}
        /> 
        */}
        <TextInput
          withAsterisk
          label="Password"
          placeholder="password"
          mt="sm"
          type="password"
          {...form.getInputProps("password")}
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
