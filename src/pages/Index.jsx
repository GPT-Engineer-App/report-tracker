import React from "react";
import { Text } from "@chakra-ui/react";

const Index = ({ report }) => {
  return (
    <>
      <Text fontWeight="bold">Reason Code:</Text>
      <Text>{report.reasonCode}</Text>
    </>
  );
};

export default Index;
