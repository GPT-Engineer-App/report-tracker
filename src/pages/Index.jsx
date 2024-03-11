import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Text } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

// Helper function to calculate downtime duration in minutes
const calculateDowntimeDuration = (from, to) => {
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  return Math.floor((toTime - fromTime) / (1000 * 60));
};

const Index = () => {
  const [reports, setReports] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Function to handle report submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const downtimeDuration = calculateDowntimeDuration(from, to);
    const newReport = {
      from,
      to,
      downtimeDuration,
      id: Date.now(),
    };
    setReports([...reports, newReport]);
    setFrom("");
    setTo("");
  };

  // Function to delete a report
  const handleDelete = (reportId) => {
    setReports(reports.filter((report) => report.id !== reportId));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Heading mb={6}>Downtime Reports</Heading>
      <Box as="form" onSubmit={handleSubmit} mb={6}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="from">From</FormLabel>
          <Input id="from" type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
        </FormControl>

        <FormControl isRequired mb={6}>
          <FormLabel htmlFor="to">To</FormLabel>
          <Input id="to" type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
        </FormControl>

        <Button leftIcon={<FaPlus />} colorScheme="blue" type="submit" isDisabled={!from || !to || new Date(from) >= new Date(to)}>
          Add Report
        </Button>
      </Box>

      <List spacing={4}>
        {reports.map((report) => (
          <ListItem key={report.id} p={4} boxShadow="md" borderRadius="md" bg="white">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">From:</Text>
                <Text>{new Date(report.from).toLocaleString()}</Text>
                <Text fontWeight="bold">To:</Text>
                <Text>{new Date(report.to).toLocaleString()}</Text>
                <Text fontWeight="bold">Downtime Duration:</Text>
                <Text>{report.downtimeDuration} minutes</Text>
              </Box>
              <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => handleDelete(report.id)}>
                Delete
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;
