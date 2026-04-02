import { Box, Button, Container, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import LoginModal from "./LoginModal";

export default function Header() {
  return (
    <Container 
        maxW='container.xl'
        my={6}
        borderBottom={'2px solid'}
        pb={2}
    >
      <HStack justify={'space-between'} align={'center'}>
        <Box>
            <HStack>
                <Box
                    as={Link}
                    to="/"
                    borderRadius={'xl'}
                    p={2}
                    transition={"color 0.2s"}
                    _hover={{color:'blue.500', bg:{base:'red.400', _dark:'red.200'}}}
                >
                    About
                </Box>
            </HStack>
        </Box>
        <HStack>
            <LoginModal/>
            <ColorModeButton/>
        </HStack>
      </HStack>
    </Container>
  )
}