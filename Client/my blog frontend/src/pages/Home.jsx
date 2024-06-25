import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Image,
  Heading,
  Text,
  VStack,
  HStack,
  IconButton,
  Avatar,
  Container,
  
  Stack,
  Collapse,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import CommentForm from "../components/CommentForm";
import BlogForm from "../components/BlogForm";

const BaseURL = `https://all-backend-servers.onrender.com`

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCommentsOpen, setIsCommentsOpen] = useState({});

  async function fetchData(page = 1) {
    try {
      const response = await axios.get(`BaseURL/blogs?page=${page}`);
      setBlogs(response.data.blogs);
      const totalBlogs = response.data.totalBlogs;
      setTotalPages(Math.ceil(totalBlogs / 10));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLike = async (blogId) => {
    try {
      await axios.patch(
        `BaseURL/blogs/likes/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (blogId, comment) => {
    try {
      await axios.post(
        `/comments/${blogId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchData(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (blogId) => {
    try {
      const response = await axios.get(`BaseURL/comments/blogs/${blogId}`);
      const commentsWithUserInfo = response.data.comments.map(comment => ({
        ...comment,
        userId: {
          ...comment.userId,
          username: comment.username
        }
      }));
      setComments((prevComments) => ({
        ...prevComments,
        [blogId]: commentsWithUserInfo,
      }));
      setIsCommentsOpen((prevOpen) => ({
        ...prevOpen,
        [blogId]: !prevOpen[blogId]
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxW="container.xl" py={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">
          All Blogs
        </Heading>
        <Button onClick={onOpen}>Add Blog</Button>
      </Flex>
      <VStack spacing={16} align="flex-start">
        {blogs.map((blog) => (
          <Box
            key={blog._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w="full"
            display="flex"
            boxShadow={"2xl"}
          >
            <Image
              src={blog.image}
              alt={blog.title}
              boxSize="300px"
              margin={5}
              objectFit="cover"
            />
            <Box flex="1" padding={15} overflowY="auto">
              <Box p={6}>
                <Heading as="h3" size="lg" mb={2}>
                  {blog.title}
                </Heading>
                <Text mb={4}>{blog.content}</Text>
                <Stack direction="row" align="center" mb={4}>
                  <Avatar name={blog.username} />
                  <Text>{blog.username}</Text>
                </Stack>
                <Text mb={4}>Created on: {new Date(blog.createdAt).toLocaleDateString()}</Text>
                <HStack justifyContent="space-between">
                  <HStack>
                    <IconButton
                      icon={<FaThumbsUp />}
                      aria-label="Like"
                      variant="outline"
                      colorScheme={
                        blog.likesId.includes(localStorage.getItem("userId"))
                          ? "blue"
                          : "gray"
                      }
                      onClick={() => handleLike(blog._id)}
                    />
                    <Text>{blog.likesId.length}</Text>
                  </HStack>
                  <HStack>
                    <Text>{blog.commentsId.length}</Text>
                    <IconButton
                      icon={<FaComment />}
                      aria-label="Comments"
                      variant="outline"
                      onClick={() => fetchComments(blog._id)}
                    />
                  </HStack>
                </HStack>
              </Box>
              <Box mt={4}>
                <Collapse in={isCommentsOpen[blog._id]} animateOpacity>
                  {comments[blog._id] &&
                    comments[blog._id].map((comment) => (
                      <Box
                        key={comment._id}
                        borderWidth="1px"
                        borderRadius="lg"
                        p={4}
                        mt={2}
                      >
                        <Stack direction="row" align="center">
                          <Avatar name={comment.userId.username} />
                          <Text fontWeight="bold">
                            {comment.userId.username}
                          </Text>
                        </Stack>
                        <Text mt={2}>{comment.comment}</Text>
                      </Box>
                    ))}
                </Collapse>
              </Box>
              <Box mt={4} marginLeft={6}>
                <CommentForm
                  blogId={blog._id}
                  onCommentSubmit={handleCommentSubmit}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </VStack>
      <HStack mt={8} spacing={2} justifyContent="center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            colorScheme={currentPage === index + 1 ? "blue" : "gray"}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
      <BlogForm isOpen={isOpen} onClose={onClose} fetchData={fetchData} />
    </Container>
  );
}

export default Home;

