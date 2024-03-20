import React, { useState, useEffect } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, List, ListItem, Select } from "@chakra-ui/react";

const EventModal = ({ isOpen, onClose, onEventSelect, categories }) => {
  const rootCausesMapping = {
    Electrical: ["Power Surge/Outage", "Electrical Overload", "Wiring Issues", "Component Failure"],
    Mechanical: ["Wear and Tear", "Lubrication Failure", "Misalignment of Shafts", "Overheating of Parts"],
    Instrument: ["Sensor Malfunction", "Calibration Drift", "Communication Failure", "Power Supply Failure"],
    Product: ["Design Flaws", "Specification Deviation", "Material Defect", "Assembly Error"],
    "(PLC) Control System": ["Software Bugs/Errors", "PLC Hardware Failure", "Communication Network Breakdown", "Input/Output Device Malfunction"],
    Operational: ["Operator Error", "Procedure Deviation", "Inadequate Training", "Supervision Lapse"],
    "Documentation Control Error": ["Incorrect Data Entry", "Outdated Procedures or Manuals", "Missing Records or Logs", "Noncompliance with Regulations"],
    "Foreign Object": ["Tool Left Inside Machinery", "Contamination", "Infiltration", "Debris Accumulation"],
    "Product Quality": ["Tolerance Deviation", "Surface Defects", "Material Inconsistency", "Functional Test Failure"],
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRootCause, setSelectedRootCause] = useState("");
  const [rootCauses, setRootCauses] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setRootCauses(rootCausesMapping[selectedCategory] || []);
    }
  }, [selectedCategory, rootCausesMapping]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = () => {
    const randomEvents = [
      { id: 1, from: "2023-04-01T10:00", to: "2023-04-01T11:30", category: "Electrical Power Surge/Outage", description: "Power outage in Area 1" },
      { id: 2, from: "2023-04-02T14:15", to: "2023-04-02T15:00", category: "Electrical Electrical Overload", description: "Overload in Asset 2" },
      { id: 3, from: "2023-04-03T09:30", to: "2023-04-03T10:15", category: "Electrical Power Surge/Outage", description: "Power surge in Area 3" },
    ];
    setEvents(randomEvents);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Load Downtime Events</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>From Date</FormLabel>
            <Input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Root Cause</FormLabel>
            <Select placeholder="Select root cause" value={selectedRootCause} onChange={(e) => setSelectedRootCause(e.target.value)} isDisabled={!selectedCategory}>
              {rootCauses.map((rootCause, index) => (
                <option key={index} value={rootCause}>
                  {rootCause}
                </option>
              ))}
            </Select>
          </FormControl>
          <List spacing={3}>
            {events.map((event) => (
              <ListItem key={event.id} onClick={() => setSelectedEvent(event)} cursor="pointer" bg={selectedEvent?.id === event.id ? "gray.100" : "white"} p={2} borderRadius="md">
                {event.description} ({new Date(event.from).toLocaleString()} - {new Date(event.to).toLocaleString()})
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onEventSelect(selectedEvent)} isDisabled={!selectedEvent}>
            Next
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
