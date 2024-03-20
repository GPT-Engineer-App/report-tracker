import { Box, Text } from "@chakra-ui/react";

function IndexPage({ report }) {
  return (
    <Box>
      <Text fontWeight="bold">Reason Code:</Text>
      <Text>{report.reasonCode}</Text>
    </Box>
  );
}

export default IndexPage;
