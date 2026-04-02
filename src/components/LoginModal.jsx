
import { Button, Dialog, Field, Fieldset, HStack, Icon, Input, Separator, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthProvider";
import { login, logout, onAuthStateChange } from "../services/auth";
import { PasswordInput } from "./ui/password-input";
import GoogleLoginButton from "./GoogleLoginButton";


export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const {user, setUser} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await login(email, password)
      setUser(loginUser);
      setOpen(false);
      setEmail("");
      setPassword("");
      setLoginError(false);
    } catch (err) {
      console.error(err);
      setLoginError(true)
    }
  }

  const handleLogout = async () => {
    await logout();
    setUser(null);
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChange((loginUser)=>{
      console.log("onAuthStateChange 실행", new Date())
      setUser(loginUser);
    })
    return ()=>unsubscribe()
  }, [])



  if (user) {
    return (
      <Button size='sm' variant='outline' onClick={handleLogout}>
        로그아웃
      </Button>
    )
  }



  return (
    <Dialog.Root open={open} onOpenChange={(e)=>setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button
          size="sm"
          variant="outline"
          onClick={()=>setOpen(true)}
        >
          로그인
        </Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>로그인</Dialog.Title>
            <Dialog.CloseTrigger
              size='lg'
              fontSize={"2xl"}
              m={3}
              _hover={{opacity:0.5}}
              cursor="pointer"
              variant="outline"
            >
              <Icon as={FaX} />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Fieldset.Root invalid={loginError}>
              <Field.Root mb={4}>
                <Field.Label>아이디</Field.Label>
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
              <Fieldset.ErrorText justifyContent="center">
                로그인에 실패했습니다.
              </Fieldset.ErrorText>
              <Button
                type="submit"
                onClick={handleLogin}
                width="100%"
                mt={4}
              >
                로그인
              </Button>
            </Fieldset.Root>
            <HStack my={4}>
              <Separator />
              <Text
                px={2} color="gray.500" fontSize="sm"
              >
                또는
              </Text>
              <Separator />
            </HStack>
            <GoogleLoginButton />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>

    </Dialog.Root>
  )

}