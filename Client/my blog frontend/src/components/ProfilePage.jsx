import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  VStack,
  Button,
  Flex,
  IconButton,
  HStack,
  Text,
  Input,
  Textarea,
  Image,
  Stack,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfilePage = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://dapplogix.onrender.com/blogs/myblogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserBlogs(response.data.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditBlog = (blog) => {
    setIsEditing(true);
    setCurrentBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`https://dapplogix.onrender.com/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://dapplogix.onrender.com/blogs/${currentBlog._id}`,
        {
          title,
          content,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsEditing(false);
      setCurrentBlog(null);
      fetchUserBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack align="flex-start" spacing={8} py={6} px={4}>
      <Heading as="h1" size="xl" mb={6}>
        Your Blogs
      </Heading>
      {userBlogs.map((blog) => (
        <Box
          key={blog._id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w="full"
          display="flex"
          boxShadow="2xl"
          mb={4}
        >
          <Image
            src={blog.image}
            alt={blog.title}
            boxSize="300px"
            objectFit="cover"
          />
          <Box flex="1" p={6} overflowY="auto">
            <Box>
              <Heading as="h3" size="lg" mb={2}>
                {blog.title}
              </Heading>
              <Text mb={4}>{blog.content}</Text>
              <Stack direction="row" align="center" mb={4}>
                <Text>{new Date(blog.createdAt).toLocaleDateString()}</Text>
              </Stack>
              <Flex justify="space-between">
                <HStack spacing={4}>
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit"
                    onClick={() => handleEditBlog(blog)}
                  />
                  <IconButton
                    icon={<FaTrash />}
                    aria-label="Delete"
                    onClick={() => handleDeleteBlog(blog._id)}
                  />
                </HStack>
              </Flex>
            </Box>
          </Box>
        </Box>
      ))}
      {isEditing && (
        <Box as="form" onSubmit={handleUpdateBlog} borderWidth="1px" borderRadius="lg" p={4} w="100%">
          <Heading as="h2" size="lg" mb={4}>
            Edit Blog
          </Heading>
          <Input
            placeholder="Title"
            mb={4}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Content"
            mb={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* <Input
            placeholder="Image URL"
            mb={4}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          /> */}
          <Button type="submit" colorScheme="blue" mr={3}>
            Update Blog
          </Button>
          <Button colorScheme="red" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default ProfilePage;
