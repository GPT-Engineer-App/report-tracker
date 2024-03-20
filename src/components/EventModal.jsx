import React, { useState } from "react";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, List, ListItem } from "@chakra-ui/react";

const EventModal = ({ isOpen, onClose, onEventSelect }) => {
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
            <FormLabel>To Date</FormLabel>
            <Input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </FormControl>
          <Button onClick={fetchEvents} mb={4}>
            Fetch Events
          </Button>
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
