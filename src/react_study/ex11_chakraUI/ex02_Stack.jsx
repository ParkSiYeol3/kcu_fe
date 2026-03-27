import { Box, Button, Stack } from "@chakra-ui/react";
import { useColorModeValue } from "../../components/ui/color-mode";

export default function Ex02_Stack() {
  const bg = useColorModeValue("blue.500", "blue.700");
  const buttonBg = useColorModeValue("red.700", "red.200");

  return (
    <Box p={6} bg={bg} rounded='2xl'>
        <Stack>
            <Button bg={buttonBg}>기본 버튼</Button>
            <Button variant="outline">아웃라인</Button>
        </Stack>
    </Box>
  )
}