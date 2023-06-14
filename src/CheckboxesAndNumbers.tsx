import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Box,
  Group,
  Title,
  NumberInput,
  Checkbox,
  Stack,
} from "@mantine/core";
import { z } from "zod";

export const CheckboxesAndNumbersFormSchema = z.object({
  age: z
    .number()
    .min(1)
    .max(120)
    .optional()
    .refine((value) => value !== undefined, {
      message: "Field is required",
    }),
  animals: z.array(z.string().min(1)).min(1),
  sports: z.array(z.string().min(1)).min(1),
});

export type CheckboxesAndNumbersFormType = z.infer<
  typeof CheckboxesAndNumbersFormSchema
>;

export const CheckboxesAndNumbers = () => {
  const form = useForm<CheckboxesAndNumbersFormType>({
    validate: zodResolver(CheckboxesAndNumbersFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      age: undefined,
      animals: [],
      sports: [],
    },
  });
  return (
    <Box w={340}>
      <Title>Checkboxes and numbers</Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <NumberInput
            withAsterisk
            label="Age"
            placeholder="Your age"
            {...form.getInputProps("age")}
          />
          {/* 
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <NumberInput
                withAsterisk
                label={Age}
                error={errors?.age?.message}
                {...field}
              />
            )}
          /> 
          */}

          <Checkbox.Group
            label="Animals"
            {...form.getInputProps("animals", { type: "checkbox" })}
            withAsterisk
          >
            <Stack>
              <Checkbox value="dog" label="Dog" />
              <Checkbox value="cat" label="Cat" />
            </Stack>
          </Checkbox.Group>

          <Checkbox.Group
            label="Sports"
            {...form.getInputProps("sports", { type: "checkbox" })}
            withAsterisk
          >
            <Stack>
              <Checkbox value="football" label="Football" />
              <Checkbox value="basketball" label="Basketball" />
            </Stack>
          </Checkbox.Group>
        </Stack>

        <Group position="right" mt="xl">
          <Button disabled={!form.isValid()} type="submit">
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
};
