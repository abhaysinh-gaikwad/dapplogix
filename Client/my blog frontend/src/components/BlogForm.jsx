import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

const BlogForm = ({ isOpen, onClose, fetchData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      // Send a POST request with formData to the backend endpoint
      const response = await axios.post("https://dapplogix.onrender.com/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Close the form and update the blog list after successful submission
      onClose();
      fetchData();

      // Clear the form fields after successful submission
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Blog</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired isInvalid={!!error}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter the content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Submit
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BlogForm;
