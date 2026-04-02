import { Box, Button } from "@chakra-ui/react"
import GoogleIcon from "../assets/google-svgrepo-com.svg"
import { toaster } from "./ui/toaster"
import authService from "../services/authService"

export default function GoogleLoginButton() {
  const {loginWithGoogle} = authService();
  const handleGoogleLogin = async () => {
    try {
      const {user} = await loginWithGoogle();
      toaster.create({
        description: `${user}`
      })
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <Button
      width="100%"
      onClick={handleGoogleLogin}
      variant="outline"
    >
      <Box 
        as="img"
        src={GoogleIcon}
        boxSize="20px"
        mr={2}
      />
      Google로 계속하기
    </Button>
  )
}