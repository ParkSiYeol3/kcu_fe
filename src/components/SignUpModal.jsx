import { Button, Dialog, Field, Fieldset, HStack, Icon, Input, Portal, Separator, Text } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";
import { useEffect, useState } from "react";
import { signUp } from "../services/auth_sign_up";
import { firebaseErrorMessages } from "../config/firebaseError";
import GoogleLoginButton from "./GoogleLoginButton";

export default function SignUpModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if(password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const user = await signUp(email, password);
      console.log("회원가입 성공:", user)
      setOpen(false)
      setEmail("")
      setPassword("")
      setPasswordConfirm("")
    } catch(err) {
      const errMsg = firebaseErrorMessages[err.code] || `회원가입 실패: ${err}`
      setError(errMsg)
      console.error("회원가입 실패: ", err)
    }
  };

  useEffect(()=> {
    if(!open) {
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [open])

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
            <Fieldset.Root invalid={!!error}> 
              <Field.Root mb={4}>
                <Field.Label>이메일</Field.Label>
                <Input 
                  type="text"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Field.Root>
              <Field.Root mb={4}>
                <Field.Label>비밀번호</Field.Label>
                <PasswordInput 
                  value={password}
                  onChange={(e)=>{
                    return setPassword(e.target.value)
                  }}
                />
              </Field.Root>
              <Field.Root mb={4}>
                <Field.Label>비밀번호 확인</Field.Label>
                <PasswordInput 
                  value={passwordConfirm}
                  onChange={(e)=>{
                    return setPasswordConfirm(e.target.value)
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSignUp(e)}
                />
              </Field.Root>
              <Fieldset.ErrorText>{error}</Fieldset.ErrorText>
              <Button
                type="submit"
                onClick={handleSignUp}
                width="100%"
                mt={4}
                disabled={
                  email === "" || password==="" || passwordConfirm === ""
                } 
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