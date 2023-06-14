/* eslint-disable react-refresh/only-export-components */
import { useForm, zodResolver } from "@mantine/form";
import { TextInput, Button, Box, Group, Title } from "@mantine/core";
import { z } from "zod";

export const TimecodeValueValidation = (
  value: string,
  ctx: z.RefinementCtx
) => {
  const clear = value.replace(/:/g, "");
  const int = parseInt(clear);
  if (Number.isInteger(int)) {
    if (int < 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Min value is 00:00:00:00`,
      });
    } else if (int > 23595929) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Max value is 23:59:59:29`,
      });
    }
  }
};

const timecodeRegex = /^([0-9]{2}:){3}[0-9]{2}$/;

// With super refine, regex and nested object
const RegexValidationFormSchema = z.object({
  name: z.string().optional(),
  nested: z.object({
    timecode: z
      .string()
      .regex(timecodeRegex, {
        message: `Incorrect format eg. 00:00:00:01`,
      })
      .min(1)
      .superRefine(TimecodeValueValidation),
  }),
});

type RegexValidationFormType = z.infer<typeof RegexValidationFormSchema>;

export const Regex = () => {
  const form = useForm<RegexValidationFormType>({
    validate: zodResolver(RegexValidationFormSchema),
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      nested: {
        timecode: "",
      },
    },
  });
  return (
    <Box w={340}>
      <Title>Regex</Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Name"
          placeholder="name"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Regex"
          placeholder="timecode"
          mt="sm"
          {...form.getInputProps("nested.timecode")}
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
