import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Box,
  Group,
  Title,
  Checkbox,
  Stack,
  NumberInput,
} from "@mantine/core";
import { z } from "zod";
import { useEffect } from "react";

const ComplexSchema = z
  .object({
    controls: z.object({
      age: z.boolean(),
      weight: z.boolean(),
    }),
    data: z.object({
      age: z.union([z.number().min(1).max(1000), z.undefined()]),
      weight: z.union([z.number().min(1).max(1000), z.undefined()]),
    }),
  })
  .superRefine((values, ctx) => {
    Object.keys(values.controls).forEach((key) => {
      if (
        values.controls[key as keyof ComplexType["controls"]] &&
        values.data[key as keyof ComplexType["data"]] === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Field is required`,
          path: ["data", key],
        });
      }
      if (values.controls.age && values.controls.weight) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Only one of this values can be active`,
          path: ["controls.age"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Only one of this values can be active`,
          path: ["controls.weight"],
        });
      }
    });
  });

type ComplexType = z.infer<typeof ComplexSchema>;

export const Complex = () => {
  const form = useForm<ComplexType>({
    validate: zodResolver(ComplexSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      controls: {
        age: false,
        weight: false,
      },
      data: {
        age: undefined,
        weight: undefined,
      },
    },
  });

  useEffect(() => {
    Object.keys(form.values.controls).forEach((key) => {
      form.validateField(`controls.${key}`);
      form.validateField(`data.${key}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.controls]);

  return (
    <Box w="auto">
      <Title>Complex</Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <Group>
            <Checkbox
              w={300}
              label="Age"
              {...form.getInputProps("controls.age", { type: "checkbox" })}
            />
            <NumberInput
              disabled={!form.values.controls.age}
              {...form.getInputProps("data.age")}
            />
          </Group>
          <Group>
            <Checkbox
              w={300}
              label="Weight"
              {...form.getInputProps("controls.weight", { type: "checkbox" })}
            />
            <NumberInput
              disabled={!form.values.controls.weight}
              {...form.getInputProps("data.weight")}
            />
          </Group>
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
