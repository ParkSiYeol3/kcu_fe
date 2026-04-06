import { Button, Dialog, Field, Fieldset, FileUpload, HStack, Icon, Input, Portal, Separator, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { useContext, useEffect, useState } from "react";
import { signUp } from "../services/auth_sign_up";
import { firebaseErrorMessages } from "../config/firebaseError";
import GoogleLoginButton from "./GoogleLoginButton";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "../services/authService";
import { AuthContext } from "../contexts/AuthProvider"
import { LuUpload } from "react-icons/lu";
import { uploadAvatar } from "../services/storage";
import { updateProfile } from "firebase/auth";

const signupSchema = z.object({
  email: z.email("올바른 이메일 형식이 아닙니다."),
  password: z.string()
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
    .regex(/[!@#$%^&*()]/, "특수문자를 포함해야 합니다")
    .regex(/[0-9]/, "숫자를 포함해야 합니다.")
    .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다."),
  passwordConfirm: z.string()
}).refine((d)=> d.password === d.passwordConfirm, {
  message:"비밀번호 불일치",
  path:['passwordConfirm']
})

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  
  const {signUpWithEmail} = authService();

  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isSubmitting},
    reset
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {email:"", password:"", passwordConfirm:""}
  })

  const onSubmit = async (data) => {
    setFirebaseError("")
    try {
      const user = await signUpWithEmail(data.email, data.password, avatarFile);
      console.log("회원가입 성공:", user)
      
      setOpen(false);
      reset()
    } catch(err) {
      const errMsg = firebaseErrorMessages[err.code] || `회원가입 실패: ${err}`
      setFirebaseError(errMsg)
      console.error("회원가입 실패: ", err)
    }
  };

  useEffect(()=> {
    if(!open) {
      reset()
    }
  }, [open])

  useEffect(()=> {
    console.log(errors)
  }, [errors])

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline">회원가입</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>회원가입</Dialog.Title>
            <Dialog.CloseTrigger 
              size="lg" 
              fontSize={"2xl"} 
              m={3} 
              _hover={{opacity: 0.5}}
              cursor="pointer"
              variant="outline" >
              ×
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Fieldset.Root invalid={!isValid || !!firebaseError}> 
              <Field.Root mb={4} invalid={!!errors.email}>
                <Field.Label>이메일</Field.Label>
                <Input 
                  placeholder="이메일을 입력하세요"
                  type="text"
                  {...register("email")}
                  />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root mb={4} invalid={!!errors.password}>
                <Field.Label>비밀번호</Field.Label>
                <PasswordInput 
                  {...register("password")}
                  />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root mb={4} invalid={!!errors.passwordConfirm}>
                <Field.Label>비밀번호 확인</Field.Label>
                <PasswordInput 
                  {...register("passwordConfirm")}
                  />
                <Field.ErrorText>{errors.passwordConfirm?.message}</Field.ErrorText>
              </Field.Root>
              <Fieldset.ErrorText>
              {
                  firebaseError
              }
              </Fieldset.ErrorText>
              <Field.Root mb={4}>
                <Field.Label>프로필 이미지(선택)</Field.Label>
                <FileUpload.Root
                  maxFiles={1}
                  accept="image/*"
                  onFileAccept={(details) => setAvatarFile(details.files[0])}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone p={3} minH="80px">
                    <Icon color="fg.muted" as={LuUpload} />
                    <FileUpload.DropzoneContent>
                      드래그 또는 클릭하며 이미지 선택
                    </FileUpload.DropzoneContent>
                  </FileUpload.Dropzone>
                  <FileUpload.List showSize clearable/>
                </FileUpload.Root>
              </Field.Root>
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                width="100%"
                mt={4}
                loading={isSubmitting}
                >
                회원가입
              </Button>
            </Fieldset.Root>
            <HStack my={4}>
              <Separator flex="1"/>
              <Text
                px={2} color="gray.500" fontSize="sm"
              >
                또는
              </Text>
              <Separator flex="1"/>
            </HStack>
            <GoogleLoginButton />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>

    </Dialog.Root>
  );
}