import { Box, Heading, HStack } from "@chakra-ui/react"
import { ColorModeButton } from "./components/ui/color-mode"
function App() {
  return(
    <Box p={6}>
      <HStack justify={'space-between'}>
        <Heading size='3xl' mb={2}>Hello, chakra!</Heading>
          <ColorModeButton/>
      </HStack>
    </Box>
  )
}

export default App
