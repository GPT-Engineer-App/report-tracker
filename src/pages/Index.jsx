import React, { useState } from "react";
import { Container, Button } from "@chakra-ui/react";
import EventModal from "../components/EventModal";

const Index = () => {
  const [isEventModalOpen, setEventModalOpen] = useState(false);

  const categories = ["Electrical", "Mechanical", "Instrument", "Product", "(PLC) Control System", "Operational", "Documentation Control Error", "Foreign Object", "Product Quality"];

  return (
    <Container>
      <Button onClick={() => setEventModalOpen(true)}>Load Event</Button>
      <EventModal isOpen={isEventModalOpen} onClose={() => setEventModalOpen(false)} onEventSelect={(event) => console.log(event)} categories={categories} />
    </Container>
  );
};

export default Index;
