import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

function IndexPage() {
  return (
    <Box p={5}>
      <Text fontWeight="bold" mb={4}>
        Downtime Report Form
      </Text>
      <Button colorScheme="blue">Load Events</Button>
      {}
    </Box>
  );
}

export default IndexPage;
