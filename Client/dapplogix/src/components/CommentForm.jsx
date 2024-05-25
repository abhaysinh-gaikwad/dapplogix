// src/components/CommentForm.jsx
import React, { useState } from "react";
import { Box, Button, Textarea, useDisclosure } from "@chakra-ui/react";

const CommentForm = ({ blogId, onCommentSubmit }) => {
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    try {
      await onCommentSubmit(blogId, comment);
      setComment("");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} variant="outline" colorScheme="blue">
        Add Comment
      </Button>

      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0,0,0,0.5)"
          zIndex="1000"
        >
          <Box
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            width="400px"
            textAlign="center"
          >
            <form onSubmit={handleSubmit}>
              <Textarea
                placeholder="Add your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" colorScheme="blue" mt={4}>
                Submit
              </Button>
              <Button onClick={onClose} variant="outline" colorScheme="red" mt={4}>
                Cancel
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CommentForm;
