import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import categories from "../categories.json";

const EventModal = ({ selectedCategory, setSelectedReasonCode }) => {
  useEffect(() => {
    setSelectedReasonCode(categories[selectedCategory][0]);
  }, [selectedCategory]);

  return (
    <Box>
      <Text>Selected Category: {selectedCategory}</Text>
      <Text>Selected Reason Code: {categories[selectedCategory][0]}</Text>
    </Box>
  );
};
