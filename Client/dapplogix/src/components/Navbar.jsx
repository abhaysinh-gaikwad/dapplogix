import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import LogoutButton from "./auth/Logout";
// const Links = [
//   { ids: 1, name: "register", link: "/register" },
//   { ids: 2, name: "login", link: "/login" },
//   { ids: 3, name: "home", link: "/home" },
// ];

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Logo</Box>
          {/* <HStack
            as={"nav"}
            spacing={8}
            display={{ base: "flex", md: "flex" }}
            justify={"flex-end"}
            pl={[0, 0, 36, 52, 72, 72]}
            pr={[0, 0, 36, 52, 72, 72]}
          >
            {Links.map((el) => (
              <Link to={el.link} key={el.ids}>
                {el.name}{" "}
              </Link>
            ))}
          </HStack> */}
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
             
                  <MenuItem _hover={{ bg: "#f5f1ee" }} bg={"rgb(250,248,244)"}>
                <Flex  flexDir={"row"}
                  _hover={{ bg: "#f5f1ee" }}
                  bg={"rgb(250,248,244)"}
                  width={"100%"}
                  // pr={24}
                >
                  <Image
                    h={8}
                    w={8}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOVXjlJMidDtZrU0mrXlHzHdFE9_gVlvCGw&s"
                  />{" "}
                  
                  <LogoutButton />
                </Flex>
              </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}