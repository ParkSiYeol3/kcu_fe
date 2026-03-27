import { useColorModeValue } from "../../components/ui/color-mode";
import { Box, Text } from "@chakra-ui/react";

export default function Ex01_Box() {
  const bg = useColorModeValue('white', 'blue.800');
  return (
    <div>
      <Box p={6} bg={bg} rounded = 'md' color='black'>
        <Text>Box는 기본 컨테이너입니다.</Text>
      </Box>
      <Box p={6} rounded= 'md'>
        <Text>Box는 기본 컨테이너입니다.</Text>
      </Box>
    </div>
  )
}