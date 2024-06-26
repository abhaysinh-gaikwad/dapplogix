import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import LogoutButton from "./auth/Logout";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const isProfilePage = location.pathname === "/profile";

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Check for token on component mount
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>Blog Web App</Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            {isLoggedIn ? (
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
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAtBxQren9wA-mJnn5r1w3kxV48l4PcSdAjPesSnZeA&s"
                    }
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAtBxQren9wA-mJnn5r1w3kxV48l4PcSdAjPesSnZeA&s"
                      }
                    />
                  </Center>
                  <br />
                  <Center>
                    <Button
                      onClick={() =>
                        isProfilePage ? navigate("/") : navigate("/profile")
                      }
                      style={{ fontWeight: "bold" }}
                    >
                      {isProfilePage ? "Go to Home" : "Go to Profile"}
                    </Button>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem _hover={{ bg: "#f5f1ee" }} bg={"rgb(250,248,244)"}>
                    <Flex flexDir={"row"} _hover={{ bg: "#f5f1ee" }} bg={"rgb(250,248,244)"}>
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
            ) : (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
