import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, List, ListItem, Text, Select, ButtonGroup, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import EventModal from "../components/EventModal";

// Helper function to calculate downtime duration in minutes
const calculateDowntimeDuration = (from, to) => {
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();
  return Math.floor((toTime - fromTime) / (1000 * 60));
};

const Index = () => {
  const [eventId, setEventId] = useState(null);
  const [image, setImage] = useState(null);
  const [reports, setReports] = useState([]);
  const [category, setCategory] = useState("");
  const [rootCause, setRootCause] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEventSelect = (event) => {
    setEventId(event.id);
    setFrom(event.from);
    setTo(event.to);
    setCategory(event.category);
    setDescription(event.description);
    setEventId(event.id);

    if (event.category === "Mechanical") {
      setRootCause("");
    } else if (event.category === "Electrical") {
      setRootCause("Power Surge/Outage");
    } else {
      setRootCause("");
    }

    closeModal();
  };

  // Function to handle report submission
  // Function to handle report submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const downtimeDuration = calculateDowntimeDuration(from, to);
    const newReport = {
      reportId: crypto.randomUUID(),
      eventId: eventId,
      area: e.target.area.value,
      asset: e.target.asset.value,
      from,
      to,
      category,
      rootCause,
      description,
      downtimeDuration,
      image,
      id: Date.now(),
    };
    setImage(null);
    setReports([...reports, newReport]);
    setCategory("");
    setDescription("");
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
      <Button onClick={openModal} mb={6}>
        Load Events
      </Button>
      <EventModal isOpen={isModalOpen} onClose={closeModal} onEventSelect={handleEventSelect} />
      <Box as="form" onSubmit={handleSubmit} mb={6}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="area">Area</FormLabel>
          <Select id="area" placeholder="Select area" mb={4}>
            <option value="Area1">Area1</option>
            <option value="Area2">Area2</option>
            <option value="Area3">Area3</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="asset">Asset</FormLabel>
          <Select id="asset" placeholder="Select asset" mb={4}>
            <option value="Asset1">Asset1</option>
            <option value="Asset2">Asset2</option>
            <option value="Asset3">Asset3</option>
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="from">From</FormLabel>
          <Input id="from" type="datetime-local" value={from} onChange={(e) => setFrom(e.target.value)} />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="to">To</FormLabel>
          <Input id="to" type="datetime-local" value={to} onChange={(e) => setTo(e.target.value)} />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="category">Category</FormLabel>
          <Select id="category" placeholder="Select category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Instrument">Instrument</option>
            <option value="Product">Product</option>
            <option value="(PLC) Control System">(PLC) Control System</option>
            <option value="Operational">Operational</option>
            <option value="Documentation Control Error">Documentation Control Error</option>
            <option value="Foreign Object">Foreign Object</option>
            <option value="Product Quality">Product Quality</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="rootCause">Root Cause</FormLabel>
          <Select id="rootCause" placeholder="Select root cause" value={rootCause} onChange={(e) => setRootCause(e.target.value)}>
            {category === "Mechanical" && (
              <>
                <option value="Wear and Tear">Wear and Tear</option>
                <option value="Lubrication Failure">Lubrication Failure</option>
                <option value="Misalignment of Shafts">Misalignment of Shafts</option>
                <option value="Overheating of Parts">Overheating of Parts</option>
              </>
            )}
            {category === "Electrical" && (
              <>
                <option value="Power Surge/Outage">Power Surge/Outage</option>
                <option value="Electrical Overload">Electrical Overload</option>
                <option value="Wiring Issues">Wiring Issues</option>
                <option value="Component Failure">Component Failure</option>
              </>
            )}
          </Select>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="image">Image Upload</FormLabel>
          <Input id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
        </FormControl>

        <Button leftIcon={<FaPlus />} colorScheme="blue" type="submit" isDisabled={!from || !to || !image || new Date(from) >= new Date(to)}>
          Add Report
        </Button>
      </Box>

      <List spacing={4}>
        {reports.map((report) => (
          <ListItem key={report.id} p={4} boxShadow="md" borderRadius="md" bg="white">
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold">Report ID:</Text>
                <Text fontWeight="bold">Report ID:</Text>
                <Text>{report.reportId}</Text>
                <Text fontWeight="bold">Event ID:</Text>
                <Text>{report.eventId}</Text>
                <Text fontWeight="bold">Event ID:</Text>
                <Text>{report.eventId}</Text>
                <Text fontWeight="bold">Area:</Text>
                <Text>{report.area}</Text>
                <Text fontWeight="bold">Asset:</Text>
                <Text>{report.asset}</Text>
                <Text fontWeight="bold">From:</Text>
                <Text>{new Date(report.from).toLocaleString()}</Text>
                <Text fontWeight="bold">Category:</Text>
                <Text>{report.category}</Text>
                <Text fontWeight="bold">Root Cause:</Text>
                <Text>{report.rootCause}</Text>
                <Text fontWeight="bold">Description:</Text>
                <Text>{report.description}</Text>
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
