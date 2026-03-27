import { getTypeConfig } from "../config/pokemonType";
import { Badge, HStack, Icon, Text } from "@chakra-ui/react";

export default function TypeBadge({typeName}) {
  const typeConfig = getTypeConfig(typeName);
  return (
    <Badge
      colorScheme={typeConfig.color}
      bgColor={typeConfig.bgColor}
      color={typeConfig.color}
      px={2}
      py={1}
      borderRadius='full'
      fontSize='sm'
      fontWeight='semibold'
    >
        <HStack>
            <Icon as={typeConfig.icon} w={3} h={3}/>
            <Text textTransform='uppercase'>{typeConfig.displayName}</Text>
        </HStack>
    </Badge>
  );
}