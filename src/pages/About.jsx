import { Box, Button, Field, Fieldset, Heading, Input } from "@chakra-ui/react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toaster } from "../components/ui/toaster";

const practiceSchema = z.object({
  name: z.string().min(2, "이름이 두 글자 이상"),
  email: z.email("올바른 이메일 형식이 아님")
})

export default function About() {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid},
    reset
  } = useForm({
    resolver: zodResolver(practiceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "" },
  })

  const onSubmit = (data) => {
    console.log("submit: ", data);
    toaster.create({
      description: `이름: ${data.name} 이메일: ${data.email}`,
      type: "success",
      duration: 10000,
      closable: true
    })
    reset()
  }

  return (
        <Box>
      <Heading>About Page</Heading>
      <Fieldset.Root
        invalid={Object.keys(errors).length > 0}
      >
        <Fieldset.Content>
          <Field.Root mb={4} invalid={!!errors.name} >
            <Field.Label>이름</Field.Label>
            <Input 
              {...register("name")}
              placeholder="이름 입력"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root mb={4} invalid={!!errors.email} >
            <Field.Label>이메일</Field.Label>
            <Input 
              {...register("email")}
              placeholder="이메일 입력"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          width="100%"
          mt={4}
          disabled={!isValid}
        >
          제출하기
        </Button>
      </Fieldset.Root>
    </Box>
  )
}