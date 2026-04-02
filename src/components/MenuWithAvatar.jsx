import { Avatar, Button, Menu, Portal, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { logout } from "../services/auth";

export default function MenuWithAvatar() {
  const {user} = useContext(AuthContext)
  const handleLogout = async () => {
    await logout()
  }
  return (
    <Menu.Root>
      <Menu.Trigger>
        <Avatar.Root size="sm">
          <Avatar.Fallback name={user.displayName || user.email}/>
          <Avatar.Image src={user.photoURL}/>
        </Avatar.Root>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content borderRadius="lg">
          <Menu.Item
            value="profile"
            pointerEvents="none"
          >
            <Text>안녕하세요, {user.displayName || user.email}</Text>
          </Menu.Item>
          <Menu.Separator/>
          <Menu.Item value="logout" asChild>
            <Button
              width="100"
              borderRadius="full"
              variant="outline"
              onClick={handleLogout}
              _hover={{
                cursor:"pointer"
              }}
              >
                로그아웃
              </Button>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}